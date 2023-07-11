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
import { RobinPotPlayerEntry, splitToRobinPots } from "../../../domain/RobinPots";
import { robinPotsSetup } from "../../../Settings";
import { WideScreenOnly } from "../../divs/WideScreenOnly";

interface Props {
  allEntrants: User[];
}

export const RobinPots: React.FC<Props> = ({ allEntrants }) => {
  const { data: racetimeLeaderboard } = useRacetimeLeaderboard();

  const title = "Phase 1";

  const sortedPotEntries: RobinPotPlayerEntry[] = useMemo(() => {
    if (allEntrants && racetimeLeaderboard) {
      const entries = allEntrants.map((user, index) => {
        const racetimeLeaderboardEntry = racetimeLeaderboard[user.id];
        return {
          user,
          racetimeStats: racetimeLeaderboardEntry,
          rank: index + 1,
        };
      });
      const sortedEntries = entries.sort(
        (a, b) =>
          (b.racetimeStats?.leaderboardScore ?? 0) - (a.racetimeStats?.leaderboardScore ?? 0)
      );
      return sortedEntries.map((entry, index) => ({
        ...entry,
        rank: index + 1,
      }));
    }
    return [];
  }, [allEntrants, racetimeLeaderboard]);

  const robinPots = splitToRobinPots(robinPotsSetup, sortedPotEntries);

  if (sortedPotEntries.length === 0) {
    return (
      <Container title={title}>
        <NothingToDisplay>
          <p>No entrants to display (yet).</p>
        </NothingToDisplay>
      </Container>
    );
  }

  return (
    <Container title={title} contentGap={2}>
      {robinPots.map((robinPot, index) => {
        return (
          <div key={index}>
            <PotTitle>{`Pot ${index + 1}`}</PotTitle>
            {robinPot.map((entry) => {
              return (
                <RobinPotEntry
                  key={index}
                  $displayAsLoggedInUser={false} //todo
                >
                  <RankAndUser>
                    <Rank>{entry.rank}</Rank>
                    <UserDisplay size="big" user={entry.user} />
                  </RankAndUser>

                  <WideScreenOnly>
                    <Number>{entry.racetimeStats?.leaderboardScore}</Number>
                  </WideScreenOnly>
                </RobinPotEntry>
              );
            })}
          </div>
        );
      })}
    </Container>
  );
};

const RobinPotEntry = styled(Block)<{
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

const PotTitle = styled.h3``;

const RankAndUser = styled(FlexDiv)`
  justify-content: flex-start;
`;

const Rank = styled.p`
  text-align: center;
  min-width: 2rem;
  margin-right: 1.5rem;
`;

const Number = styled.p`
  text-align: center;
  min-width: 6rem;
`;
