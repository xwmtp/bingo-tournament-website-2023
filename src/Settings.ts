import { BracketSetup } from "./domain/BracketSetup";
import { RobinGroupsSetup, RobinPotSetup } from "./domain/RoundRobin";

export const tournamentSettings = {
  RACETIME_CATEGORY: "oot",
  FORFEIT_TIME: 4 * 3600,
  CAN_WITHDRAW: false,
  CAN_SIGNUP: false,
  WIN_POINTS: 3,
  TIE_POINTS: 1,
  LOSE_POINTS: 0,
  TOURNAMENT_WINNER_ID: "wNZ1KRBOV8W4qAyj",
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
  RELEVANT_ROUNDS: ["Round 1", "Round 2", "Round 3"],
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

export const robinGroupsSetup: RobinGroupsSetup = [
  {
    groupName: "Group Armos",
    groupId: "A",
    entrants: [
      { playerId: "R8QGZrB2q0WNgk4V" },
      { playerId: "wezlNoA4443mq6db" },
      { playerId: "R8QGZrB2k03Ngk4V" },
      { playerId: "ZbpNAaBvn5BJkg04" },
    ],
  },
  {
    groupName: "Group Boomerang",
    groupId: "B",
    entrants: [
      { playerId: "dm1LPWj2DOWEnVx6" },
      { playerId: "NX5783JddGWqlL0a" },
      { playerId: "DMLq1oZ98e3OeQG8" },
      { playerId: "5rNGD3DKVaB9blOy" },
    ],
  },
  {
    groupName: "Group Cojiro",
    groupId: "C",
    entrants: [
      { playerId: "VXY0eABd6boLKPnz" },
      { playerId: "yMewn83V89W405Jv" },
      { playerId: "Ek8wpok9GkB5KQyV" },
      { playerId: "Va0eMongz6Wl9pyJ" },
    ],
  },
  {
    groupName: "Group Darunia",
    groupId: "D",
    entrants: [
      { playerId: "MqzQPW4Nam31L2R5" },
      { playerId: "JXzVwZWqElW5k8eb" },
      { playerId: "7lYZa5B5eZB2Vwv9" },
      { playerId: "Aa5veoGybABMVr6Z" },
    ],
  },
  {
    groupName: "Group Epona",
    groupId: "E",
    entrants: [
      { playerId: "OR6ym83mvqoPd1Xr" },
      { playerId: "xldAMBl4A4BaOP57" },
      { playerId: "LxldAMBlnboaOP57" },
      { playerId: "jQbq4dBp7yWvlrG0" },
    ],
  },
  {
    groupName: "Group Fish",
    groupId: "F",
    entrants: [
      { playerId: "Ek8wpok9mGB5KQyV" },
      { playerId: "Qbq4dBpJnrovlrG0" },
      { playerId: "dm1LPWjZLLWEnVx6" },
      { playerId: "rZyM4orRvRoqDJX0" },
    ],
  },
  {
    groupName: "Group Gauntlets",
    groupId: "G",
    entrants: [
      { playerId: "dm1LPWjAkjoEnVx6" },
      { playerId: "XGzr7pBMyqBkqgyE" },
      { playerId: "vrZyM4orqE3qDJX0" },
      { playerId: "OR6ym83myb3Pd1Xr" },
    ],
  },
  {
    groupName: "Group Hookshot",
    groupId: "H",
    entrants: [
      { playerId: "VXY0eABddNBLKPnz" },
      { playerId: "wdm1LPWjAoEnVx6k" },
      { playerId: "LNY0OkW1OP3KalP1" },
      { playerId: "yMewn83V613405Jv" },
    ],
  },
  {
    groupName: "Group Ingo",
    groupId: "I",
    entrants: [
      { playerId: "aGklxjWzQvoLPdye" },
      { playerId: "d17DexWEkR3ak64R" },
      { playerId: "kzM65aWXgxo1y8q0" },
      { playerId: "OR6ym83mnjoPd1Xr" },
    ],
  },
  {
    groupName: "Group Jabu",
    groupId: "J",
    entrants: [
      { playerId: "Gzr7pBM7dyokqgyE" },
      { playerId: "Ek8wpok9KVB5KQyV" },
      { playerId: "52QE8oNlGXBlywqX" },
      { playerId: "jQbq4dBpey3vlrG0" },
    ],
  },
  {
    groupName: "Group Keaton",
    groupId: "K",
    entrants: [
      { playerId: "NqO2YoLDL8o9QEya" },
      { playerId: "VXY0eABdn7oLKPnz" },
      { playerId: "wNZ1KRBOV8W4qAyj" },
    ],
  },
  {
    groupName: "Group Lizalfos",
    groupId: "L",
    entrants: [
      { playerId: "ZVa0eMonnbol9pyJ" },
      { playerId: "vrZyM4orbEoqDJX0" },
      { playerId: "kzM65aWX6b31y8q0" },
    ],
  },
];
