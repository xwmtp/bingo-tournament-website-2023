import { Container } from "../components/Container";
import React from "react";
import styled from "styled-components";
import { Margins } from "../GlobalStyle";
import { PreviousYears } from "../components/pages/about/PreviousYears";
import { ExternalLink } from "../components/general/ExternalLink";
import { tournamentSettings } from "../Settings";
import { InternalLink } from "../components/general/InternalLink";
import { BiCalendar, BiSave } from "react-icons/bi";

export const AboutPage: React.FC = () => {
  return (
    <AboutPageDiv>
      <Container title={"Bingo Tournament 2023"} width={"70%"}>
        <AboutContent>
          <p> Welcome to the 2023 Ocarina of Time Bingo Tournament!</p>
          <br />

          <h3>General info</h3>
          <List>
            <ListItem>
              The tournament will start on <strong>Monday, August 13th.</strong>
            </ListItem>
            <ListItem>
              Sign up will close on <strong>Friday, August 11th, at 11:59pm UTC.</strong>
            </ListItem>
            <ListItem>
              This is a regular{" "}
              <ExternalLink url="https://ootbingo.github.io/bingo/latest-version.html">
                Bingo
              </ExternalLink>{" "}
              tournament, played on the latest version (currently <strong>v10.2</strong>). Note that
              the version <em>may</em> be updated between rounds, but never while a round is in
              progress.
            </ListItem>
            <ListItem>
              The tournament consists of two phases: a round-robin phase followed by a
              double-elimination bracket phase.
            </ListItem>
            <ListItem>
              Having a <ExternalLink url="https://racetime.gg/${}">Racetime.gg</ExternalLink>{" "}
              account with <em>at least one</em> race in the OoT Bingo category is required to join
              the tournament. You may sign up before you completed one race, but should finish one
              before the tournament starts (join ESNB/SNB for example!).
            </ListItem>
          </List>

          <h3>Rules</h3>
          <List>
            <ListItem>
              All races must be played on{" "}
              <ExternalLink url={`https://racetime.gg/${tournamentSettings.RACETIME_CATEGORY}`}>
                Racetime.gg
              </ExternalLink>{" "}
              and announced in the Discord when about to start.
            </ListItem>
            <ListItem>
              <strong>ESNB</strong> and <strong>SNB</strong> may not be used for any match in the
              tournament. All races have to be played in a different room from <strong>ESNB</strong>{" "}
              or <strong>SNB</strong>.
            </ListItem>
            <ListItem>
              It is not allowed to help entrants with their bingo during tournament races.
            </ListItem>
            <ListItem>
              Entrants may not watch the restream of their match while they are racing.
            </ListItem>
            <ListItem>All races must be livestreamed.</ListItem>
          </List>

          <h3>Scheduling & recording</h3>
          <List>
            <ListItem>
              After you've been assigned an opponent, you will find your match on your{" "}
              <InternalLink to="/profile/matches">profile page</InternalLink>. You can schedule your
              race by pressing the <CalendarIcon /> 'pick time' button. Only one match entrant has
              to do so. Only schedule after you agreed on a time with your opponent.
            </ListItem>
            <ListItem>
              After the Racetime race has been <strong>recorded</strong>, you can save the results
              of your match to the website. Copy the Racetime race url, go to your{" "}
              <InternalLink to="/profile/matches">profile page</InternalLink>, and click the
              <SaveIcon /> button.
            </ListItem>
            <ListItem>
              If, for any reason, you are unable to to play your match, please contact a Tournament
              Organizer.
            </ListItem>
          </List>

          <h3>Phase 1: Round-robin</h3>
          <List>
            <ListItem>
              This phase will last <strong>3</strong> weeks.
            </ListItem>
            <ListItem>
              Each round starts on <strong>Monday, 4pm UTC</strong>.
            </ListItem>
            <ListItem>
              Just before the tournament starts, all entrants will be divided over{" "}
              <strong>4 pots</strong>. The first pot contains the entrants with the highest seed,
              the second contains the second highest, and so on.
            </ListItem>
            <ListItem>
              An entrant's seed is equal to their{" "}
              <ExternalLink url="https://xwmtp.github.io/bingo-leaderboard">
                Bingo leaderboard
              </ExternalLink>{" "}
              score at the time that pots are decided.
            </ListItem>
            <ListItem>
              A draw stream will then decide the groups of phase 1. For each group, a random entrant
              is drawn from each pot. This results into groups of 4 entrants, and possibly a few
              groups of 3.
            </ListItem>
            <ListItem>
              During this phase, each entrant will play all the other entrants in their group once.
              They will play one match per week, and will be told beforehand which opponent of their
              group they have for the week. It's not allowed to already play matches that are
              planned for later weeks, without explicit permission of a Tournament Organizer.
            </ListItem>
            <ListItem>
              All races have to be finished before the end of the round. If a race is not done in
              time, the decision about the result of the match and further action regarding both
              players is left to the tournament organizers and will be treated case by case.
            </ListItem>
            <ListItem>
              A win is awarded <strong>3</strong> points. In the unlikely case of a draw (to the
              second), both players are awarded <strong>1</strong> point. A loss or forfeit is worth{" "}
              <strong>0</strong> points.
            </ListItem>
            <ListItem>
              A forfeit is counted as a <strong>4:00:00</strong> time for the tournament median.
            </ListItem>
            <ListItem>
              At the end of this phase, the top two players of each group advance to the next phase.
              Ties are broken by looking at the results of the matches between the tied players. For
              example, if player A and B are tied, and in their match B won from A, then B advances
              to the next round. If this method still results in a tie, the tournament median time
              is considered.
            </ListItem>
          </List>

          <h3>Phase 2: Bracket</h3>
          <List>
            <ListItem>
              The second phase is a <strong>double-elimination</strong> bracket.
            </ListItem>
            <ListItem>
              Entrants have one week to play their match. If you don't manage to play in time, you
              will be out of the bracket.
            </ListItem>
            <ListItem>In the event of a draw, the match has to be played again.</ListItem>{" "}
            <ListItem>
              Each match consists of one race, except for the grand finals, which is played in three
              races.
            </ListItem>
          </List>
        </AboutContent>
      </Container>
      <PreviousYearsContainer title={"Previous years"} width={"30%"}>
        <PreviousYears />
      </PreviousYearsContainer>
    </AboutPageDiv>
  );
};

const AboutPageDiv = styled.div`
  width: 100%;
  display: flex;
  max-width: 90vw;
  flex-direction: row;
  justify-content: center;
`;

const PreviousYearsContainer = styled(Container)`
  margin-left: ${Margins.container}rem;
`;

const AboutContent = styled.div`
  line-height: 1.3rem;
`;

const List = styled.ul`
  padding: 1rem 1.5rem;
`;

const ListItem = styled.li`
  padding: 0.15rem 0;
`;

const SaveIcon = styled(BiSave)`
  margin-left: 0.4rem;
  margin-right: 0.2rem;
  transform: scale(1.3);
`;

const CalendarIcon = styled(BiCalendar)`
  margin-left: 0.3rem;
  margin-right: 0.2rem;
  transform: scale(1.2);
`;
