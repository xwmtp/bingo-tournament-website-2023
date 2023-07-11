import { User } from "./User";
import { RacetimeLeaderboard, RacetimeLeaderboardEntry } from "./RacetimeLeaderboard";
import { chunkArrayByNumber } from "../lib/arrayHelpers";

interface RobinPotSetup {
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

export const mapToRobinPotPlayerEntry = (
  user: User,
  racetimeLeaderboard: RacetimeLeaderboard,
  index: number
): RobinPotPlayerEntry => {
  const racetimeLeaderboardEntry = racetimeLeaderboard[user.id];
  return {
    user,
    racetimeStats: racetimeLeaderboardEntry,
    rank: index + 1,
  };
};
