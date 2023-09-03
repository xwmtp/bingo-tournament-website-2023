import React, { useState } from "react";
import { useMatchResults } from "../../api/matchesApi";
import { Match, MatchResult } from "../../domain/Match";
import { EntrantWithResult } from "../../domain/Entrant";
import { ResultRow } from "../../components/pages/results/ResultBlock";
import { Container } from "../../components/Container";
import { Input } from "../../components/forms/Input";
import { useRacetimeLeaderboard } from "../../api/racetimeLeaderboardApi";
import { RacetimeLeaderboard, RacetimeLeaderboardEntry } from "../../domain/RacetimeLeaderboard";
import { Duration } from "luxon";
import styled from "styled-components";
import { useUser } from "../../api/userApi";
import { NothingToDisplay } from "../../components/general/NothingToDisplay";
import { isAdmin, User } from "../../domain/User";
import { RacetimeButton } from "../../components/forms/buttons/RacetimeButton";
import { tournamentSettings } from "../../Settings";
import { calculateAverage, calculateMedian, secondsToHms } from "../../lib/timeHelpers";
import { UserDisplay } from "../../components/UserDisplay";
import { FlexDiv } from "../../components/divs/FlexDiv";

export const StatsPage: React.FC = () => {
  const [round, setRound] = useState<string>("");

  const title = "Stats";
  const { data: user } = useUser();
  const { data: matchResults } = useMatchResults();
  const { data: racetimeLeaderboard } = useRacetimeLeaderboard();

  if (!user || !isAdmin(user)) {
    return (
      <Container title={title}>
        <NothingToDisplay>This page is admin only.</NothingToDisplay>
      </Container>
    );
  }

  if (!matchResults || !racetimeLeaderboard) {
    return <Container title={title} />;
  }

  const results = round
    ? matchResults.filter((matchResult) => matchResult.round === round)
    : matchResults;

  const { best, worst, bestDiff, worstDiff, closestMatch, average, median, playerTimes } = getStats(
    results,
    racetimeLeaderboard
  );

  return (
    <Container title={title}>
      <Input
        type="text"
        maxLength={30}
        value={round}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setRound(event.target.value)}
        placeholder={"Round x"}
      />

      {results.length > 0 && (
        <>
          <Heading>Best result</Heading>
          {best && <ResultRow entrant={best.entrant} />}
          <RtggButton match={best?.match} />

          <Heading>Worst result</Heading>
          {worst && <ResultRow entrant={worst.entrant} />}
          <RtggButton match={worst?.match} />

          <Heading>Best diff</Heading>
          {bestDiff && (
            <>
              <ResultRow entrant={bestDiff.diff.entrant} />
              {`Current bingo leaderboard time: ${secondsToHms(
                bestDiff.diff.lbEntry.leaderboardTime
              )}`}
              <p>{`Finish time ${Math.abs(
                Math.round(bestDiff.diff.percentage * 1000) / 10
              )}% faster than lb time`}</p>
              <RtggButton match={bestDiff?.match} />
            </>
          )}

          <Heading>Worst diff</Heading>
          {worstDiff && (
            <>
              <ResultRow entrant={worstDiff.diff.entrant} />
              {`Current bingo leaderboard time: ${Duration.fromMillis(
                worstDiff.diff.lbEntry.leaderboardTime * 1000
              ).toFormat("h:mm:ss")}`}
              <p>{`Finish time ${
                Math.round(worstDiff.diff.percentage * 1000) / 10
              }% slower than lb time`}</p>
              <RtggButton match={worstDiff?.match} />
            </>
          )}

          <Heading>Closest match diff</Heading>
          {!!closestMatch && closestMatch.match.entrants.length >= 2 && (
            <>
              <ResultRow entrant={closestMatch.match.entrants[0]} />
              <ResultRow entrant={closestMatch.match.entrants[1]} />

              {`Difference: ${secondsToHms(closestMatch.diff)}`}
              <RtggButton match={closestMatch.match} />
            </>
          )}

          <Heading>Average</Heading>
          {secondsToHms(average)}

          <Heading>Median</Heading>
          {secondsToHms(median)}

          <Row>
            <div>
              <Heading>Player medians</Heading>
              {playerTimes
                .sort(
                  (a, b) =>
                    (a.median ?? tournamentSettings.FORFEIT_TIME) -
                    (b.median ?? tournamentSettings.FORFEIT_TIME)
                )
                .map((playerStats) => {
                  if (playerStats.median) {
                    return (
                      <Row>
                        <UserDisplay user={playerStats.player} />
                        <p>{secondsToHms(playerStats.median)}</p>
                      </Row>
                    );
                  }
                })}
            </div>

            <div>
              <Heading>Player averages</Heading>
              {playerTimes
                .sort(
                  (a, b) =>
                    (a.average ?? tournamentSettings.FORFEIT_TIME) -
                    (b.average ?? tournamentSettings.FORFEIT_TIME)
                )
                .map((playerStats) => {
                  if (playerStats.average) {
                    return (
                      <Row>
                        <UserDisplay user={playerStats.player} />
                        <p>{secondsToHms(playerStats.average)}</p>
                      </Row>
                    );
                  }
                })}
            </div>
          </Row>
        </>
      )}
    </Container>
  );
};

const getStats = (results: MatchResult[], racetimeLeaderboard: RacetimeLeaderboard) => {
  type Diff = { entrant: EntrantWithResult; lbEntry: RacetimeLeaderboardEntry; percentage: number };
  let bestResult: { match: Match; entrant: EntrantWithResult } | undefined;
  let worstResult: { match: Match; entrant: EntrantWithResult } | undefined;
  let bestDiff: { match: Match; diff: Diff } | undefined;
  let worstDiff: { match: Match; diff: Diff } | undefined;
  let closestMatch: { match: MatchResult; diff: number } | undefined;

  const allFinishedTimes: number[] = [];
  const timesPerPlayer: Record<string, { player: User; times: number[] }> = {};

  for (const result of results) {
    const times = result.entrants
      .map((entrant) => entrant.result.finishTime)
      .filter((time): time is number => !!time);
    if (times.length === 2) {
      const matchDiff = Math.abs(times[0] - times[1]);
      if (!closestMatch || matchDiff < closestMatch.diff) {
        closestMatch = { match: result, diff: matchDiff };
      }
    }

    for (const entrant of result.entrants) {
      const finishOrForfeitTime = entrant.result.finishTime ?? tournamentSettings.FORFEIT_TIME;
      if (!(entrant.user.id in timesPerPlayer)) {
        timesPerPlayer[entrant.user.id] = { player: entrant.user, times: [finishOrForfeitTime] };
      }
      timesPerPlayer[entrant.user.id].times.push(finishOrForfeitTime);

      if (!entrant.result.hasForfeited) {
        allFinishedTimes.push(entrant.result.finishTime!!);
      }
      if (!entrant.result.finishTime) {
        continue;
      }

      if (!bestResult || entrant.result.finishTime! < bestResult.entrant.result.finishTime!) {
        bestResult = { match: result, entrant: entrant };
      }
      if (!worstResult || entrant.result.finishTime! > worstResult.entrant.result.finishTime!) {
        worstResult = { match: result, entrant: entrant };
      }

      const matchingLbEntry: RacetimeLeaderboardEntry | undefined =
        racetimeLeaderboard[entrant.user.id];
      const percentage =
        (entrant.result.finishTime - (matchingLbEntry?.leaderboardTime ?? NaN)) /
        (matchingLbEntry?.leaderboardTime ?? NaN);

      if (percentage && (!bestDiff || percentage < bestDiff.diff.percentage)) {
        bestDiff = {
          match: result,
          diff: { entrant: entrant, lbEntry: matchingLbEntry, percentage: percentage },
        };
      }
      if (percentage && (!worstDiff || percentage > worstDiff.diff.percentage)) {
        worstDiff = {
          match: result,
          diff: { entrant: entrant, lbEntry: matchingLbEntry, percentage: percentage },
        };
      }
    }
  }

  const average = calculateAverage(allFinishedTimes) ?? NaN;
  const median = calculateMedian(allFinishedTimes) ?? NaN;

  const playerTimes = Object.values(timesPerPlayer).map((playerAndTimes) => {
    return {
      ...playerAndTimes,
      average: calculateAverage(playerAndTimes.times),
      median: calculateMedian(playerAndTimes.times),
    };
  });

  return {
    best: bestResult,
    worst: worstResult,
    bestDiff,
    worstDiff,
    closestMatch,
    average,
    median,
    playerTimes,
  };
};

const RtggButton: React.FC<{ match?: Match }> = ({ match }) => {
  return match ? <RacetimeButtonStyled url={`https://racetime.gg/${match.racetimeId}`} /> : null;
};

const Heading = styled.h3`
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
`;

const RacetimeButtonStyled = styled(RacetimeButton)`
  max-width: 2rem;
`;

const Row = styled(FlexDiv)`
  flex-direction: row;
  justify-content: flex-start;
  gap: 2rem;
`;
