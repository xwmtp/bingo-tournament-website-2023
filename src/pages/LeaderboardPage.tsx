import React from "react";
import { Leaderboard } from "../components/pages/leaderboard/Leaderboard";
import { Container } from "../components/Container";
import { Spinner } from "../components/general/Spinner";
import { useAllEntrants } from "../api/entrantsApi";
import { useMatchResults } from "../api/matchesApi";
import { NothingToDisplay } from "../components/general/NothingToDisplay";
import { bracketSetup, leaderboardSettings, robinPotsSetup, websiteSettings } from "../Settings";
import { mockBracketSetup } from "../domain/mocks/MockData";
import { RobinPots } from "../components/pages/leaderboard/RobinPots";
import { parseToRobinPots } from "../domain/RobinPotsSetup";

export const LeaderboardPage: React.FC = () => {
  const { data: allEntrants, isLoading: isLoadingEntrants } = useAllEntrants();
  const { data: matchResults, isLoading: isLoadingMatches } = useMatchResults();
  const bracketSetupData = websiteSettings.USE_MOCK_DATA ? mockBracketSetup : bracketSetup;

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
  const robinPots = parseToRobinPots(robinPotsSetup, allEntrants);

  return (
    <>
      <RobinPots pots={robinPots} />
      {/*{bracketRounds.length > 0 && <Bracket bracketRounds={bracketRounds} />}*/}
      <Leaderboard allEntrants={allEntrants} allResults={relevantMatchResults} />
    </>
  );
};
