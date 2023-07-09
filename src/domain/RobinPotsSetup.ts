import { Entrant } from "./Entrant";
import { User } from "./User";

export type RobinPotsSetup = RobinPotSetup[];

interface RobinPotSetup {
  numberOfPots: number,
}

export type RobinPots = Entrant[][];


export const parseToRobinPots = (
  setup: RobinPotSetup,
  allEntrants: User[]
): RobinPots => {

  const entrants = allEntrants.map(user => ({ user }));


  // abcd efgh ijkl mnop
  // abcd efgh ijkl mno
  // abcd efgh ijk lmn
  // abcd efg hij klm

  // aehk
  // bfil
  // cgjm
  // d

  return chunkArray(entrants, setup.numberOfPots);

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