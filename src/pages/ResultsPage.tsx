import { Container } from "../components/Container";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Colors } from "../GlobalStyle";
import { TabSelector } from "../components/TabSelector";
import { MatchResults } from "../components/pages/results/MatchResults";
import { useMatchResults } from "../api/matchesApi";
import { NothingToDisplay } from "../components/general/NothingToDisplay";
import { getUniqueRounds } from "../domain/Match";

export const ResultsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | undefined>(undefined);

  const { data: matchResults, isSuccess, isError } = useMatchResults();

  const title = "Results";

  const uniqueRounds = useMemo(
    () => (matchResults ? getUniqueRounds(matchResults) : []),
    [matchResults]
  );

  useEffect(() => {
    if (matchResults) {
      if (!activeTab || !uniqueRounds.includes(activeTab)) {
        setActiveTab(uniqueRounds[uniqueRounds.length - 1]);
      }
    }
  }, [activeTab, matchResults, uniqueRounds]);

  if (isError) {
    return (
      <Container title={title}>
        <NothingToDisplay>Something went wrong while loading the results.</NothingToDisplay>
      </Container>
    );
  }

  if (!isSuccess) {
    return <Container title={title} />;
  }

  const tabMatches = matchResults.filter((result) => result.round === activeTab);
  const showTabSelector = activeTab && uniqueRounds.length > 1;

  return (
    <Container title={title}>
      {showTabSelector && (
        <TabSelectorStyled
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabOptions={uniqueRounds}
          fontSize={"1rem"}
        />
      )}
      <MatchResults results={tabMatches} highlightUserResult={true} />
    </Container>
  );
};

const TabSelectorStyled = styled(TabSelector)`
  background-color: ${Colors.darkGrey};
  margin-bottom: 1.2rem;
`;
