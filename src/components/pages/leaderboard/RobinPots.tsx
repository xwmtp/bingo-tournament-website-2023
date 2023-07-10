import React, { useMemo } from "react";
import { useRacetimeLeaderboard } from "../../../api/racetimeLeaderboardApi";
import { Container } from "../../Container";
import { NothingToDisplay } from "../../general/NothingToDisplay";
import { UserDisplay } from "../../UserDisplay";
import styled from "styled-components";
import { Block } from "../../Block";
import { Colors } from "../../../GlobalStyle";
import { FlexDiv } from "../../divs/FlexDiv";
import { User } from "../../../domain/User";
import { mapToRobinPotPlayerEntry, parseToRobinPots } from "../../../domain/RobinPots";
import { robinPotsSetup } from "../../../Settings";

interface Props {
  allEntrants: User[];
}

export const RobinPots: React.FC<Props> = ({ allEntrants }) => {
  const { data: racetimeLeaderboard } = useRacetimeLeaderboard();

  console.log("lb", racetimeLeaderboard);

  const title = "Leaderboard";

  const sortedEntries = useMemo(() => {
    if (allEntrants && racetimeLeaderboard) {
      const entries = allEntrants.map((user) =>
        mapToRobinPotPlayerEntry(user, racetimeLeaderboard)
      );
      return entries.sort(
        (a, b) =>
          (a.racetimeStats?.leaderboardScore ?? 0) - (b.racetimeStats?.leaderboardScore ?? 0)
      );
    }
    return [];
  }, [allEntrants, racetimeLeaderboard]);

  const robinPots = parseToRobinPots(robinPotsSetup, sortedEntries);

  if (sortedEntries.length === 0) {
    return (
      <Container title={title}>
        <NothingToDisplay>
          <p>No entrants to display (yet).</p>
        </NothingToDisplay>
      </Container>
    );
  }

  return (
    <Container title={title}>
      {robinPots.map((robinPot, index) => {
        return (
          <>
            <h2>{`Pot ${index + 1}`}</h2>
            {robinPot.map((entry) => {
              return (
                <LeaderboardEntryBlock
                  key={index}
                  $displayAsLoggedInUser={false} //todo
                >
                  <RankAndUser>
                    <Rank>{index + 1}</Rank>
                    <UserDisplay size="big" user={entry.user} />
                  </RankAndUser>
                </LeaderboardEntryBlock>
              );
            })}
          </>
        );
      })}
    </Container>
  );
};

const LeaderboardEntryBlock = styled(Block)<{
  $displayAsLoggedInUser: boolean;
}>`
  justify-content: space-between;
  background-color: ${({ $displayAsLoggedInUser }) =>
    $displayAsLoggedInUser ? Colors.brightGrey : Colors.lightGrey};
  font-size: 1.1rem;
  margin-top: 0.5rem;
  padding-top: 0.35rem;
  padding-bottom: 0.35rem;
`;

const RankAndUser = styled(FlexDiv)`
  justify-content: flex-start;
`;

const Rank = styled.p`
  text-align: center;
  min-width: 2rem;
  margin-right: 1.5rem;
`;
