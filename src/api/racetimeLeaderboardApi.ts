import { useQuery } from "react-query";
import {
  mapToRacetimeLeaderboard,
  RacetimeLeaderboard,
  RacetimeLeaderboardDto,
} from "../domain/RacetimeLeaderboard";
import { websiteSettings } from "../Settings";
import { mockRacetimeLeaderboard } from "../domain/mocks/MockRacetimeLeaderboard.ts";

export const getRacetimeLeaderboard = async (): Promise<RacetimeLeaderboard> => {
  // todo move this right before the error
  if (websiteSettings.USE_MOCK_DATA) {
    return mockRacetimeLeaderboard;
  }
  const response = await fetch("https://bingoleaderboard.scaramangado.de/api/leaderboard");
  if (response.status === 200) {
    const racetimeLeaderboardDto: RacetimeLeaderboardDto = await response.json();
    return mapToRacetimeLeaderboard(racetimeLeaderboardDto);
  }

  throw Error("Could not fetch racetime bingo leaderboard players");
};

export const useRacetimeLeaderboard = () => {
  return useQuery<RacetimeLeaderboard, Error>("racetimeLeaderboard", getRacetimeLeaderboard, {
    staleTime: 1000 * 60 * 60,
  });
};
