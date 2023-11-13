import React from "react";
import { Container } from "../components/Container";
import { Spinner } from "../components/general/Spinner";
import { useAllEntrants } from "../api/entrantsApi";
import { useMatchResults } from "../api/matchesApi";
import { NothingToDisplay } from "../components/general/NothingToDisplay";
import { leaderboardSettings, tournamentSettings } from "../Settings";
import { RobinGroups } from "../components/pages/leaderboard/RobinGroups";
import { Challonge } from "../components/pages/leaderboard/Challonge";
import { Winner } from "../components/pages/leaderboard/Winner";

export const LeaderboardPage: React.FC = () => {
  const { data: allEntrants, isLoading: isLoadingEntrants } = useAllEntrants();
  const { data: matchResults, isLoading: isLoadingMatches } = useMatchResults();
  // const bracketSetupData = websiteSettings.USE_MOCK_DATA ? mockBracketSetup : bracketSetup;

  const pageTitle = "Leaderboard";

  if (isLoadingEntrants || isLoadingMatches) {
    return (
      <Container title={pageTitle}>
        <Spinner />
      </Container>
    );
  }

  if (!allEntrants || !matchResults) {
    return (
      <Container title={pageTitle}>
        <NothingToDisplay>An error occurred while loading the data.</NothingToDisplay>
      </Container>
    );
  }

  const relevantMatchResults = matchResults.filter((result) =>
    leaderboardSettings.RELEVANT_ROUNDS.some(
      (relevantRound) => result.round?.toLocaleLowerCase() === relevantRound.toLowerCase()
    )
  );
  // const bracketRounds = parseToBracketRounds(bracketSetupData, allEntrants, matchResults);

  const winner = allEntrants.find(
    (entrant) => entrant.id === tournamentSettings.TOURNAMENT_WINNER_ID
  );

  return (
    <>
      {winner && <Winner winner={winner} />}
      <Challonge />
      <RobinGroups allEntrants={allEntrants} allResults={relevantMatchResults} />
      {/*<RobinPots allEntrants={allEntrants} />*/}

      {/*{bracketRounds.length > 0 && <Bracket bracketRounds={bracketRounds} />}*/}
      {/*<Leaderboard allEntrants={allEntrants} allResults={relevantMatchResults} />*/}
    </>
  );
};
