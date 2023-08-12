import { BracketSetup } from "./domain/BracketSetup";
import { RobinGroupsSetup, RobinPotSetup } from "./domain/RoundRobin";
import { PairUserDto } from "./domain/Pair";

export const tournamentSettings = {
  RACETIME_CATEGORY: "oot",
  FORFEIT_TIME: 4 * 3600,
  CAN_WITHDRAW: false,
  CAN_SIGNUP: false,
  WIN_POINTS: 3,
  TIE_POINTS: 1,
  LOSE_POINTS: 0,
} as const;

export const websiteSettings = {
  DEFAULT_AVATAR:
    "https://github.com/xwmtp/bingo2022/blob/assets/images/avatars/neutralAvatar.png?raw=true",
  LOGIN_URL: process.env.REACT_APP_LOGIN_URL,
  LOGOUT_URL: process.env.REACT_APP_LOGOUT_URL,
  BACKEND_URL: process.env.REACT_APP_BACKEND_URL,
  USE_MOCK_DATA: process.env.REACT_APP_USE_MOCK_DATA_FALLBACK === "true",
  MAX_TAB_SELECTOR_ITEMS: 4,
} as const;

export const leaderboardSettings = {
  // list of round names, or undefined if all rounds are relevant for the leaderboard
  RELEVANT_ROUNDS: ["Round 1", "Round 2", "Round 3", "Round 4"],
};

// Add Bracket to LeaderboardPage, only if roundNames is non-empty
export const bracketSetup: BracketSetup = {
  roundNames: ["Eights", "Quarters", "Semis", "Finals"],
  firstRoundMatchUps: [
    { player1Id: "XGzr7pBMny3kqgyE", player2Id: "jb8GPMWwDLB1nEk0" },
    { player1Id: "kzM65aWX6b31y8q0", player2Id: "OR6ym83myb3Pd1Xr" },
    { player1Id: "ZbpNAaBvn5BJkg04", player2Id: "vrZyM4orbEoqDJX0" },
    { player1Id: "LxldAMBlnboaOP57", player2Id: "wNZ1KRBOV8W4qAyj" },
    { player1Id: "5rNGD3DKVaB9blOy", player2Id: "R8QGZrB2k03Ngk4V" },
    { player1Id: "Va0eMongz6Wl9pyJ", player2Id: "JXzVwZWqElW5k8eb" },
    { player1Id: "rZyM4orRvRoqDJX0", player2Id: "kzM65aWXgxo1y8q0" },
    { player1Id: "jQbq4dBp7yWvlrG0", player2Id: "LxldAMBlYV3aOP57" },
  ],
};

export const robinPotsSetup: RobinPotSetup = {
  numberOfPots: 4,
};

// pot 4, pot 3, pot 2, pot 1
export const robinGroupsSetup: RobinGroupsSetup = [
  {
    groupName: "Group Armos",
    groupId: "A",
    entrants: [
      { playerId: "Cloudik" },
      { playerId: "paintsk" },
      { playerId: "challen" },
      { playerId: "exodus" },
    ],
  },
  {
    groupName: "Group Boomerang",
    groupId: "B",
    entrants: [
      { playerId: "dark" },
      { playerId: "moosecrap" },
      { playerId: "eggme" },
      { playerId: "fanta" },
    ],
  },
  {
    groupName: "Group Cojiro",
    groupId: "C",
    entrants: [
      { playerId: "shaggy" },
      { playerId: "psymarth" },
      { playerId: "neefe" },
      { playerId: "2dol" },
    ],
  },
  {
    groupName: "Group Darunia",
    groupId: "D",
    entrants: [
      { playerId: "jean" },
      { playerId: "the__consul" },
      { playerId: "mutant" },
      { playerId: "trifo" },
    ],
  },
  {
    groupName: "Group Epona",
    groupId: "E",
    entrants: [
      { playerId: "lady" },
      { playerId: "gombill" },
      { playerId: "liter" },
      { playerId: "link" },
    ],
  },
  {
    groupName: "Group Fish",
    groupId: "F",
    entrants: [
      { playerId: "clydep" },
      { playerId: "skept" },
      { playerId: "cabb" },
      { playerId: "jenslang" },
    ],
  },
  {
    groupName: "Group Gauntlets",
    groupId: "G",
    entrants: [
      { playerId: "khu" },
      { playerId: "tomp" },
      { playerId: "woli" },
      { playerId: "tit" },
    ],
  },
  {
    groupName: "Group Hookshot",
    groupId: "H",
    entrants: [
      { playerId: "shiro" },
      { playerId: "dotzo" },
      { playerId: "coffee" },
      { playerId: "tkc" },
    ],
  },
  {
    groupName: "Group Ingo",
    groupId: "I",
    entrants: [
      { playerId: "noface" },
      { playerId: "gsk8" },
      { playerId: "runner" },
      { playerId: "ama" },
    ],
  },
  {
    groupName: "Group Jabu",
    groupId: "J",
    entrants: [
      { playerId: "amber" },
      { playerId: "countd" },
      { playerId: "grego" },
      { playerId: "mooseoot" },
    ],
  },
  {
    groupName: "Group Keaton",
    groupId: "K",
    entrants: [{ playerId: "jake" }, { playerId: "mattt" }, { playerId: "tob3" }],
  },
  {
    groupName: "Group Lizalfos",
    groupId: "L",
    entrants: [{ playerId: "adef" }, { playerId: "fenyan" }, { playerId: "nalle" }],
  },
];

export const getGroupRawPairs = () => {
  const pairs: PairUserDto[][] = [];

  for (const setup of robinGroupsSetup) {
    if (setup.entrants.length === 4) {
      // type 3
      if (["A", "B", "C", "D"].includes(setup.groupId)) {
        pairs.push([
          { id: setup.entrants[3].playerId, groupName: setup.groupId.toString() },
          { id: setup.entrants[0].playerId, groupName: setup.groupId.toString() },
        ]);
        pairs.push([
          { id: setup.entrants[2].playerId, groupName: setup.groupId.toString() },
          { id: setup.entrants[1].playerId, groupName: setup.groupId.toString() },
        ]);
        // type 2
      } else if (["E", "F", "G", "H"].includes(setup.groupId)) {
        pairs.push([
          { id: setup.entrants[3].playerId, groupName: setup.groupId.toString() },
          { id: setup.entrants[1].playerId, groupName: setup.groupId.toString() },
        ]);
        pairs.push([
          { id: setup.entrants[2].playerId, groupName: setup.groupId.toString() },
          { id: setup.entrants[0].playerId, groupName: setup.groupId.toString() },
        ]);
        // type 1
      } else {
        pairs.push([
          { id: setup.entrants[3].playerId, groupName: setup.groupId.toString() },
          { id: setup.entrants[2].playerId, groupName: setup.groupId.toString() },
        ]);
        pairs.push([
          { id: setup.entrants[1].playerId, groupName: setup.groupId.toString() },
          { id: setup.entrants[0].playerId, groupName: setup.groupId.toString() },
        ]);
      }
    }
    if (setup.entrants.length === 3) {
      // type 3
      if (["A", "B", "C", "D"].includes(setup.groupId)) {
        pairs.push([
          { id: setup.entrants[1].playerId, groupName: setup.groupId.toString() },
          { id: setup.entrants[0].playerId, groupName: setup.groupId.toString() },
        ]);
        // type 2
      } else if (["E", "F", "G", "H"].includes(setup.groupId)) {
        pairs.push([
          { id: setup.entrants[2].playerId, groupName: setup.groupId.toString() },
          { id: setup.entrants[0].playerId, groupName: setup.groupId.toString() },
        ]);
        // type 1
      } else {
        pairs.push([
          { id: setup.entrants[2].playerId, groupName: setup.groupId.toString() },
          { id: setup.entrants[1].playerId, groupName: setup.groupId.toString() },
        ]);
      }
    }
  }
  return pairs;
};
