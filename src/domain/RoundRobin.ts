import { User } from "./User";
import { RacetimeLeaderboard, RacetimeLeaderboardEntry } from "./RacetimeLeaderboard";
import { chunkArrayByNumber } from "../lib/arrayHelpers";
import { LeaderboardEntry, RESULT_POINTS, toLeaderboardEntries } from "./Leaderboard";
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
  groupId: string;
  entrants: {
    playerId: string;
  }[];
}

export type RobinGroups = RobinGroup[];

interface RobinGroup {
  groupName: string;
  entries: RobinGroupEntry[];
}

export interface RobinGroupEntry extends LeaderboardEntry {
  groupRank: number;
}

export const toRobinGroupEntries = (
  groupsSetup: RobinGroupsSetup,
  allEntrantsUsers: User[],
  allResults: MatchResult[],
  racetimeLeaderboard: RacetimeLeaderboard | undefined
): RobinGroups => {
  const leaderboardEntries = toLeaderboardEntries(
    allEntrantsUsers,
    allResults,
    racetimeLeaderboard
  );
  return groupsSetup.map((setup) => {
    const groupEntries = setup.entrants
      .map((entrant) => {
        const matchingEntry = leaderboardEntries.find((entry) =>
          entry.user.name.toLowerCase().startsWith(entrant.playerId.toLowerCase())
        );
        if (!matchingEntry || entrant.playerId === "") {
          console.error(
            `Could not create robin groups, could not find matching entry for id ${entrant.playerId}`
          );
          return undefined;
        }
        return matchingEntry;
      })
      .filter((entry): entry is LeaderboardEntry => !!entry);
    return {
      groupName: setup.groupName,
      entries: addGroupRanks(groupEntries),
    };
  });
};

const addGroupRanks = (entries: LeaderboardEntry[]): RobinGroupEntry[] => {
  let allEntries: LeaderboardEntry[] = [];
  const sortedEntries = entries.sort((a, b) => b.points - a.points);
  const groupsByPoints = groupEntries(sortedEntries);

  for (const pointGroup of groupsByPoints) {
    if (pointGroup.length > 1) {
      allEntries = allEntries.concat(breakTie(pointGroup));
    } else {
      allEntries = allEntries.concat(pointGroup);
    }
  }
  return allEntries.map((entry, index) => ({ ...entry, groupRank: index + 1 }));
};

export const breakTie = (tiedEntries: LeaderboardEntry[]): LeaderboardEntry[] => {
  const tieResult: { entry: LeaderboardEntry; tiePoints: number }[] = [];

  for (const entry of tiedEntries) {
    let tiePoints = 0;
    const otherEntries = tiedEntries.filter((e) => entry.user.id !== e.user.id);
    for (const otherEntry of otherEntries) {
      const headToHeadResult = entry.opponentResults.find(
        (res) => res.opponent.id === otherEntry.user.id
      );
      if (headToHeadResult) {
        tiePoints += RESULT_POINTS[headToHeadResult.result];
      }
    }
    tieResult.push({ entry: entry, tiePoints: tiePoints });
  }

  const sortedTieResults = tieResult.sort((a, b) => {
    if (a.tiePoints === b.tiePoints) {
      if (a.entry.median === b.entry.median) {
        return (
          (b.entry.racetimeStats?.leaderboardScore ?? 0) -
          (a.entry.racetimeStats?.leaderboardScore ?? 0)
        );
      }
      return (a.entry?.median ?? 0) - (b.entry.median ?? 0);
    }
    return b.tiePoints - a.tiePoints;
  });
  return sortedTieResults.map((tieResult) => tieResult.entry);
};

function groupEntries(entries: LeaderboardEntry[]): LeaderboardEntry[][] {
  const allPoints: number[] = [];
  const grouped = entries.reduce((acc: Record<number, LeaderboardEntry[]>, entry) => {
    const points = entry.points;
    if (acc[points]) {
      acc[points].push(entry);
    } else {
      allPoints.push(points);
      acc[points] = [entry];
    }
    return acc;
  }, {});

  const sortedGroups: LeaderboardEntry[][] = [];
  const sortedKeys = allPoints.sort((a, b) => b - a);
  for (const key of sortedKeys) {
    sortedGroups.push(grouped[key]);
  }
  return sortedGroups;
}
