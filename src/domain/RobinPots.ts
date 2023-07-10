import { User } from "./User";
import { RacetimeLeaderboard, RacetimeLeaderboardEntry } from "./RacetimeLeaderboard";

interface RobinPotSetup {
  numberOfPots: number;
}

export interface RobinPotPlayerEntry {
  user: User;
  racetimeStats?: RacetimeLeaderboardEntry;
}

export const parseToRobinPots = <T>(setup: RobinPotSetup, items: T[]): T[][] => {
  // abcd efgh ijkl mnop
  // abcd efgh ijkl mno
  // abcd efgh ijk lmn
  // abcd efg hij klm

  // aehk
  // bfil
  // cgjm
  // d

  return chunkArray(items, setup.numberOfPots);
};

function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  let index = 0;

  while (index < array.length) {
    const chunk = array.slice(index, index + size);
    chunks.push(chunk);
    index += size;
  }

  return chunks;
}

export const mapToRobinPotPlayerEntry = (
  user: User,
  racetimeLeaderboard: RacetimeLeaderboard
): RobinPotPlayerEntry => {
  const racetimeLeaderboardEntry = racetimeLeaderboard[user.id];
  return {
    user,
    racetimeStats: racetimeLeaderboardEntry,
  };
};
