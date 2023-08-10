import React from "react";
import { Container } from "../../Container";
import { NothingToDisplay } from "../../general/NothingToDisplay";
import { UserDisplay } from "../../UserDisplay";
import styled from "styled-components";
import { Block } from "../../Block";
import { Colors } from "../../../GlobalStyle";
import { FlexDiv } from "../../divs/FlexDiv";
import { User } from "../../../domain/User";
import { MatchResult } from "../../../domain/Match";
import { toRobinGroupEntries } from "../../../domain/RoundRobin";
import { useRacetimeLeaderboard } from "../../../api/racetimeLeaderboardApi";
import { robinGroupsSetup } from "../../../Settings";
import { useUser } from "../../../api/userApi";

interface Props {
  allEntrants: User[];
  allResults: MatchResult[];
}

export const RobinGroups: React.FC<Props> = ({ allEntrants, allResults }) => {
  const { data: user } = useUser();
  const { data: racetimeLeaderboard } = useRacetimeLeaderboard();

  const title = "Phase 1";

  const groups = toRobinGroupEntries(
    robinGroupsSetup,
    allEntrants,
    allResults,
    racetimeLeaderboard
  );

  if (groups.length === 0) {
    return (
      <Container title={title}>
        <NothingToDisplay>
          <p>No groups to display (yet).</p>
        </NothingToDisplay>
      </Container>
    );
  }

  return (
    <Container title={title} contentGap={2}>
      <Groups>
        {groups.map((group) => {
          if (group.entries.length === 0) {
            return null;
          }

          return (
            <div key={group.groupName}>
              <EntryHeader>
                <GroupTitle>
                  <h3>{group.groupName}</h3>
                </GroupTitle>
                {/*<Number>Rounds</Number>*/}

                {/*<Number>*/}
                {/*  <strong>Points</strong>*/}
                {/*</Number>*/}
              </EntryHeader>

              {group.entries.map((entry, index) => {
                return (
                  <GroupEntry
                    key={`${entry.user.id}-${index}`}
                    $displayAsLoggedInUser={!!user && entry.user.id === user.id}
                  >
                    <RankAndUser>
                      <Rank>{index + 1}</Rank>
                      <UserDisplay size="big" user={entry.user} />
                    </RankAndUser>

                    {/*<Number>{entry.roundsPlayed}</Number>*/}

                    {/*<Number>*/}
                    {/*  <strong>{entry.points}</strong>*/}
                    {/*</Number>*/}
                  </GroupEntry>
                );
              })}
            </div>
          );
        })}
      </Groups>
    </Container>
  );
};

const Groups = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  row-gap: 2rem;
`;

const GroupEntry = styled(Block)<{
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

const GroupTitle = styled.div`
  width: 17.7rem;
`;

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
  min-width: 4rem;
`;

const EntryHeader = styled(Block)`
  justify-content: space-between;
  background-color: transparent;
  margin-top: 0;
  font-size: 0.9rem;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0.5rem;
`;

const HiddenRankAndUser = styled(RankAndUser)`
  visibility: hidden;
`;
