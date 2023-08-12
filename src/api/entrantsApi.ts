import { mapToUser } from "../domain/User";
import { getApi } from "./api";
import { useQuery } from "react-query";
import { websiteSettings } from "../Settings";
import { Role, User } from "@xwmtp/bingo-tournament";

const getAllEntrants = async (): Promise<User[]> => {
  try {
    const entrantDtos = await getApi().getEntrants();
    return entrantDtos.map(mapToUser);
  } catch (error) {
    if (websiteSettings.USE_MOCK_DATA) {
      return entrants2023.map(mapToUser);
    }
    throw error;
  }
};

export const useAllEntrants = () => {
  return useQuery<User[], Error>("allEntrants", getAllEntrants);
};

const entrants2023: User[] = [
  {
    id: "jQbq4dBp7yWvlrG0",
    name: "Link11",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/Link-1.png",
    twitchChannel: "https://www.twitch.tv/link__11",
  },
  {
    id: "5rNGD3DKVaB9blOy",
    name: "FantaTanked",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/jimmyW.png",
    twitchChannel: "https://www.twitch.tv/fantatanked",
  },
  {
    id: "Va0eMongz6Wl9pyJ",
    name: "2DollarGargoyle",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/poe_triforce_better.png",
    twitchChannel: "https://www.twitch.tv/2dollargargoyle",
  },
  {
    id: "R8QGZrB2k03Ngk4V",
    name: "Challensois_",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/Malon_copy.png",
    twitchChannel: "https://www.twitch.tv/challensois_",
  },
  {
    id: "Ek8wpok9KVB5KQyV",
    name: "Countdown",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/steiner_HD.png",
    twitchChannel: "https://www.twitch.tv/countdown69",
  },
  {
    id: "wezlNoA4443mq6db",
    name: "PaintSkate8",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/drawing_of_me.jpg",
    twitchChannel: "https://www.twitch.tv/paintskate8",
  },
  {
    id: "VXY0eABdn7oLKPnz",
    name: "MatttInTheHat",
    roles: [Role.Entrant],
    twitchChannel: "https://www.twitch.tv/matttinthehat",
  },
  {
    id: "7lYZa5B5eZB2Vwv9",
    name: "MutantAura",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/5454518169c837a73da4f74202a5960a.webp",
    twitchChannel: "https://www.twitch.tv/mutantaura",
  },
  {
    id: "aGklxjWzQvoLPdye",
    name: "noface099",
    roles: [Role.Admin, Role.Entrant],
    avatar: "https://racetime.gg/media/face_saulte_56.png",
    twitchChannel: "https://www.twitch.tv/noface099",
  },
  {
    id: "DMLq1oZ98e3OeQG8",
    name: "Eggmeister",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/egg2_2.png",
    twitchChannel: "https://www.twitch.tv/eggmeister321",
  },
  {
    id: "dm1LPWj2DOWEnVx6",
    name: "Darker",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/UjEwSk6G_400x400.jpg",
    twitchChannel: "https://www.twitch.tv/darkerandroid",
  },
  {
    id: "Ek8wpok9GkB5KQyV",
    name: "neefe",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/ivysquare.png",
    twitchChannel: "https://www.twitch.tv/neefe",
  },
  {
    id: "kzM65aWXgxo1y8q0",
    name: "Runnerguy2489",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/Runnerguy.png",
    twitchChannel: "https://www.twitch.tv/runnerguy2489",
  },
  {
    id: "rZyM4orRvRoqDJX0",
    name: "jenslang",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/e0aaf3c8688abd0e58bed9d9f63de4ad.png",
    twitchChannel: "https://www.twitch.tv/jenslang",
  },
  {
    id: "52QE8oNlGXBlywqX",
    name: "Grego",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/purplepixel_DXDp79m.png",
    twitchChannel: "https://www.twitch.tv/07151129",
  },
  {
    id: "d17DexWEkR3ak64R",
    name: "gsk8",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/teteaucarr%C3%A93112.png",
    twitchChannel: "https://www.twitch.tv/gsk8",
  },
  {
    id: "Qbq4dBpJnrovlrG0",
    name: "skepticole",
    roles: [Role.Entrant],
    twitchChannel: "https://www.twitch.tv/skepticole",
  },
  {
    id: "Aa5veoGybABMVr6Z",
    name: "triforce3250",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/ZeldaRacetimeThumbnail.jpg",
    twitchChannel: "https://www.twitch.tv/triforce3250",
  },
  {
    id: "dm1LPWjZLLWEnVx6",
    name: "Cabbage72",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/20220726_155822.jpg",
    twitchChannel: "https://www.twitch.tv/cabbage72",
  },
  {
    id: "LxldAMBlnboaOP57",
    name: "LiterallyLake",
    roles: [Role.Entrant],
    twitchChannel: "https://www.twitch.tv/literallylake",
  },
  {
    id: "kzM65aWX6b31y8q0",
    name: "Nalle",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/gator2gif.gif",
    twitchChannel: "https://www.twitch.tv/nallesounds",
  },
  {
    id: "vrZyM4orbEoqDJX0",
    name: "Fenyan",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/Ava.png",
    twitchChannel: "https://www.twitch.tv/fenyan",
  },
  {
    id: "Ek8wpok9mGB5KQyV",
    name: "ClydePowers",
    roles: [Role.Entrant],
    twitchChannel: "https://www.twitch.tv/theclydepowers",
  },
  {
    id: "LNY0OkW1OP3KalP1",
    name: "CoffeePot",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/coff.png",
    twitchChannel: "https://www.twitch.tv/coffeepot",
  },
  {
    id: "yMewn83V613405Jv",
    name: "TKC",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/qYgfSWJ__400x400.jpg",
    twitchChannel: "https://www.twitch.tv/tkc014",
  },
  {
    id: "ZVa0eMonnbol9pyJ",
    name: "adef",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/adef.png",
    twitchChannel: "https://www.twitch.tv/adef",
  },
  {
    id: "VXY0eABd6boLKPnz",
    name: "shaggy",
    roles: [Role.Entrant],
    twitchChannel: "https://www.twitch.tv/shaggy3311",
  },
  {
    id: "NX5783JddGWqlL0a",
    name: "moosecrap",
    roles: [Role.Entrant],
    twitchChannel: "https://www.twitch.tv/moosecrap",
  },
  {
    id: "R8QGZrB2q0WNgk4V",
    name: "Cloudike",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/profil_twitch_cloudike_250.png",
    twitchChannel: "https://www.twitch.tv/cloudike",
  },
  {
    id: "wNZ1KRBOV8W4qAyj",
    name: "tob3000",
    roles: [Role.Entrant],
    twitchChannel: "https://www.twitch.tv/tob3000",
  },
  {
    id: "JXzVwZWqElW5k8eb",
    name: "the__consultant",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/Excel_Face_257.jpg",
    twitchChannel: "https://www.twitch.tv/the__consultant",
  },
  {
    id: "xldAMBl4A4BaOP57",
    name: "Gombill",
    roles: [Role.Entrant],
    twitchChannel: "https://www.twitch.tv/gombill",
  },
  {
    id: "OR6ym83myb3Pd1Xr",
    name: "Titou",
    roles: [Role.Entrant],
    avatar:
      "https://racetime.gg/media/2023-07-31_11_13_05-Window-removebg-preview-removebg-preview.png",
    twitchChannel: "https://www.twitch.tv/p_titou",
  },
  {
    id: "OR6ym83mvqoPd1Xr",
    name: "LadyLambdadeltasDandruff",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/images_m4K3UXM.jpg",
    twitchChannel: "https://www.twitch.tv/clairelynnd",
  },
  {
    id: "MqzQPW4Nam31L2R5",
    name: "JEANBERNARDGAMING",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/183a2529ffa914fa17101f376abfe5ef.png",
    twitchChannel: "https://www.twitch.tv/jeanbernardgaming",
  },
  {
    id: "OR6ym83mnjoPd1Xr",
    name: "Amateseru",
    roles: [Role.Entrant],
    twitchChannel: "https://www.twitch.tv/amateseru",
  },
  {
    id: "NqO2YoLDL8o9QEya",
    name: "Jake Wright",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/flat750x075f-pad750x1000f8f8f8.png",
    twitchChannel: "https://www.twitch.tv/jakewrlght",
  },
  {
    id: "jQbq4dBpey3vlrG0",
    name: "MooseOoT",
    roles: [Role.Entrant],
    twitchChannel: "https://www.twitch.tv/5819539783680",
  },
  {
    id: "VXY0eABddNBLKPnz",
    name: "shiroaeli",
    roles: [Role.Admin, Role.Entrant],
    avatar: "https://racetime.gg/media/shiro_susan.png",
    twitchChannel: "https://www.twitch.tv/shiroaeli",
  },
  {
    id: "yMewn83V89W405Jv",
    name: "PsyMarth",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/logo_100px.png",
    twitchChannel: "https://www.twitch.tv/psymarth",
  },
  {
    id: "ZbpNAaBvn5BJkg04",
    name: "Exodus",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/bottleblack.png",
    twitchChannel: "https://www.twitch.tv/exodus122",
  },
  {
    id: "wdm1LPWjAoEnVx6k",
    name: "dotzo",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/dotzo_-_black_aO9qZEm.png",
    twitchChannel: "https://www.twitch.tv/dotzo",
  },
  {
    id: "vrZyM4orqE3qDJX0",
    name: "Woli",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/5e9d035f8ad1c385bf6db77cb5761628.jpg",
    twitchChannel: "https://www.twitch.tv/wolisecondary",
  },
  {
    id: "dm1LPWjAkjoEnVx6",
    name: "khufufoofoo",
    roles: [Role.Entrant],
    twitchChannel: "https://www.twitch.tv/khufufoofoo",
  },
  {
    id: "Gzr7pBM7dyokqgyE",
    name: "Amber24",
    roles: [Role.Entrant],
    twitchChannel: "https://www.twitch.tv/amber24",
  },
  {
    id: "XGzr7pBMyqBkqgyE",
    name: "TomPouce",
    roles: [Role.Entrant],
    avatar: "https://racetime.gg/media/yeeeeeh.jpg",
    twitchChannel: "https://www.twitch.tv/originaltompouce",
  },
];
