import { User } from "./User";
import { RacetimeLeaderboard, RacetimeLeaderboardEntry } from "./RacetimeLeaderboard";
import { chunkArrayByNumber } from "../lib/arrayHelpers";
import { LeaderboardEntry, toLeaderboardEntries } from "./Leaderboard";
import { MatchResult } from "./Match";

export interface RobinPotSetup {
  numberOfPots: number;
}

export interface RobinPotPlayerEntry {
  user: User;
  racetimeStats?: RacetimeLeaderboardEntry;
  rank: number;
}

export const splitToRobinPots = <T>(setup: RobinPotSetup, items: T[]): T[][] => {
  return chunkArrayByNumber(items, setup.numberOfPots);
};

export type RobinGroupsSetup = RobinGroupSetup[];

interface RobinGroupSetup {
  groupName: string;
  entrants: {
    playerId: string;
  }[];
}

export type RobinGroups = RobinGroup[];

interface RobinGroup {
  groupName: string;
  entries: LeaderboardEntry[];
}

export const toRobinGroupEntries = (
  groupsSetup: RobinGroupsSetup,
  allEntrantsUsers: User[],
  allResults: MatchResult[],
  racetimeLeaderboard: RacetimeLeaderboard | undefined
): RobinGroups => {
  const entries = toLeaderboardEntries(allEntrantsUsers, allResults, racetimeLeaderboard);
  console.log(entries);
  return groupsSetup.map((setup) => {
    return {
      groupName: setup.groupName,
      entries: setup.entrants.map((entrant) => {
        const matchingEntry = entries.find((entry) => entry.user.id === entrant.playerId);
        if (!matchingEntry) {
          throw Error(
            `Could not create robin groups, could not find matching entry for id ${entrant.playerId}`
          );
        }
        return matchingEntry;
      }),
    };
  });
};
