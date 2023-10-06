import React, { useState } from "react";
import { useMatchResults } from "../../api/matchesApi";
import { getUniqueRounds, Match, MatchResult } from "../../domain/Match";
import { EntrantWithResult } from "../../domain/Entrant";
import { ResultRow } from "../../components/pages/results/ResultBlock";
import { Container } from "../../components/Container";
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
import { Tooltip } from "../../components/Tooltip";
import { Button } from "../../components/forms/Button";
import { Spinner } from "../../components/general/Spinner";

export const StatsPage: React.FC = () => {
  // saved in lowercase
  const [selectedRounds, setSelectedRounds] = useState<string[]>([]);

  const title = "Stats";
  const { data: user, isLoading: isLoadingUser } = useUser();
  const { data: matchResults, isLoading: isLoadingResults } = useMatchResults();
  const { data: racetimeLeaderboard, isLoading: isLoadingRacetime } = useRacetimeLeaderboard();

  if (!user || !isAdmin(user)) {
    return (
      <Container title={title}>
        <NothingToDisplay>This page is admin only.</NothingToDisplay>
      </Container>
    );
  }

  if (isLoadingResults || isLoadingRacetime || isLoadingUser) {
    return (
      <Container title={title}>
        <Spinner />
      </Container>
    );
  }

  if (!matchResults || !racetimeLeaderboard) {
    return <Container title={title} />;
  }

  const uniqueRounds = getUniqueRounds(matchResults);
  const results = matchResults.filter(
    (matchResult) => !!matchResult.round && selectedRounds.includes(matchResult.round.toLowerCase())
  );

  const {
    best,
    worst,
    bestLosing,
    bestDiff,
    worstDiff,
    closestMatch,
    average,
    median,
    playerTimes,
  } = getStats(results, racetimeLeaderboard);

  return (
    <Container title={title}>
      <RoundButtons>
        {uniqueRounds.map((round) => {
          const roundName = round.toLowerCase();
          return (
            <RoundButton
              name={round}
              isSelected={selectedRounds.includes(roundName)}
              onClick={() => {
                if (selectedRounds.includes(roundName)) {
                  setSelectedRounds((prev) => prev.filter((prevRound) => prevRound !== roundName));
                } else {
                  setSelectedRounds((prev) => [...prev, roundName]);
                }
              }}
            />
          );
        })}
      </RoundButtons>

      {results.length > 0 && (
        <>
          <Heading>Best result</Heading>
          {best && <ResultRow entrant={best.entrant} />}
          <RtggButton match={best?.match} />

          <Heading>Worst result</Heading>
          {worst && <ResultRow entrant={worst.entrant} />}
          <RtggButton match={worst?.match} />

          <Heading>Best losing result</Heading>
          {bestLosing && <ResultRow entrant={bestLosing.entrant} />}
          <RtggButton match={bestLosing?.match} />

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
              <Heading>Player medians / # results / # forfeits</Heading>
              {playerTimes
                .sort(
                  (a, b) =>
                    (a.median ?? tournamentSettings.FORFEIT_TIME) -
                    (b.median ?? tournamentSettings.FORFEIT_TIME)
                )
                .map((playerStats) => {
                  if (!playerStats.median) {
                    return null;
                  }
                  return (
                    <Row key={playerStats.player.id}>
                      <RowUserDisplay user={playerStats.player} />
                      <p>{secondsToHms(playerStats.median)}</p>
                      <p>{playerStats.times.length}</p>
                      <p>{playerStats.forfeits}</p>
                      <Tooltip
                        text={playerStats.times.map((time) => secondsToHms(time)).join(", ")}
                        heading={`${playerStats.player.name}'s times`}
                      />
                    </Row>
                  );
                })}
            </div>

            <div>
              <Heading>Player averages / # results / # forfeits</Heading>
              {playerTimes
                .sort(
                  (a, b) =>
                    (a.average ?? tournamentSettings.FORFEIT_TIME) -
                    (b.average ?? tournamentSettings.FORFEIT_TIME)
                )
                .map((playerStats) => {
                  if (!playerStats.average) {
                    return null;
                  }
                  return (
                    <Row key={playerStats.player.id}>
                      <RowUserDisplay user={playerStats.player} />
                      <p>{secondsToHms(playerStats.average)}</p>
                      <p>{playerStats.times.length}</p>
                      <Tooltip
                        text={playerStats.times.map((time) => secondsToHms(time)).join(", ")}
                        heading={`${playerStats.player.name}'s times`}
                      />
                    </Row>
                  );
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
  let bestLosingResult: { match: Match; entrant: EntrantWithResult } | undefined;
  let bestDiff: { match: Match; diff: Diff } | undefined;
  let worstDiff: { match: Match; diff: Diff } | undefined;
  let closestMatch: { match: MatchResult; diff: number } | undefined;

  const allFinishedTimes: number[] = [];
  const timesPerPlayer: Record<string, { player: User; times: number[]; forfeits: number }> = {};

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
        timesPerPlayer[entrant.user.id] = {
          player: entrant.user,
          times: [finishOrForfeitTime],
          forfeits: entrant.result.hasForfeited ? 1 : 0,
        };
      } else {
        timesPerPlayer[entrant.user.id].times.push(finishOrForfeitTime);
        if (entrant.result.hasForfeited) {
          timesPerPlayer[entrant.user.id].forfeits++;
        }
      }

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
      if (
        !bestLosingResult ||
        (entrant.result.resultStatus === "loss" &&
          entrant.result.finishTime < bestLosingResult.entrant.result.finishTime!)
      ) {
        bestLosingResult = { match: result, entrant: entrant };
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
    bestLosing: bestLosingResult,
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

const RoundButton: React.FC<{ name: string; isSelected: boolean; onClick: () => void }> = ({
  name,
  isSelected,
  onClick,
}) => {
  return (
    <RoundButtonStyled color={isSelected ? "mediumPrimary" : "darkGrey"} onClick={onClick}>
      {name}
    </RoundButtonStyled>
  );
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

const RowUserDisplay = styled(UserDisplay)`
  margin: 0.15rem 0;
`;

const RoundButtons = styled(FlexDiv)`
  margin-top: 0.8rem;
  gap: 1rem;
`;

const RoundButtonStyled = styled(Button)`
  flex-grow: 0;
`;
