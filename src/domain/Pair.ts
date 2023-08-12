import { User } from "./User";

export type Pair = PairUser[];

export interface PairUser {
  user: User;
  pairPoints?: number; // incl virtual point
  pairTourneyPoints?: number; // excl virtual point
  pairSeed?: number;
  groupName?: string;
}

export interface PairUserDto {
  id: string;
  points?: number;
  tourney_points?: number;
  seed?: number;
  groupName?: string;
}

export const mapToPairs = (pairDtos: PairUserDto[][], allEntrants: User[]): Pair[] => {
  return pairDtos
    .map((pairDto) =>
      pairDto
        .map((pairUserDto) => mapToPair(pairUserDto, allEntrants))
        .filter((entrant): entrant is PairUser => !!entrant)
        .sort((a, b) => {
          if (a.pairPoints !== b.pairPoints) {
            return b.pairPoints ?? 0 - (a.pairPoints ?? 0);
          }
          return b.pairSeed ?? 0 - (a.pairSeed ?? 0);
        })
    )
    .filter((pair) => pair.length > 0)
    .sort((a, b) => {
      if (a[0].pairPoints !== b[0].pairPoints) {
        return a[0].pairPoints ?? 0 - (b[0].pairPoints ?? 0);
      }
      if (a.length !== b.length) {
        return b.length - a.length;
      }
      return a[0].pairSeed ?? 0 - (b[0].pairSeed ?? 0);
    });
};

const mapToPair = (pairUserDto: PairUserDto, allEntrants: User[]): PairUser | undefined => {
  const matchingUser = allEntrants.find((entrant) =>
    entrant.name.toLowerCase().startsWith(pairUserDto.id.toLowerCase())
  );
  if (!matchingUser) {
    return undefined;
  }
  return {
    user: matchingUser,
    pairPoints: pairUserDto.points,
    pairTourneyPoints: pairUserDto.tourney_points,
    pairSeed: pairUserDto.seed,
    groupName: pairUserDto.groupName,
  };
};
