import React from "react";
import { Container } from "../../Container";
import { Button } from "../../forms/Button";
import styled from "styled-components";

export const Challonge: React.FC = () => {
  return (
    <Container title="Phase 2" size="small">
      <Text>Top 24 Double Elimination Bracket</Text>
      <LinkButton href="https://challonge.com/bingo2023" size="big" color="mediumPrimary">
        Go to Challonge
      </LinkButton>
    </Container>
  );
};

const Text = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0.7rem;
`;

const LinkButton = styled(Button)`
  width: 12rem;
  margin-right: 1rem;
`;
