// Import functions
import { getPlayerData } from "./getPlayerData.js";
import { countNumberOfGamesPlayed } from "./numberOfGames.js";
import { startRatingCount } from "./starRating.js";
import { changeInRatingAllPlayers } from "./ratingChange.js";
import { GamesAllPlayers } from "./lostWonGames.js";

window.addEventListener("load", async () => {
  const allPlayerData = await getPlayerData();

  if (allPlayerData.length === 0) {
    console.log("no players available");
    return;
  }
  // console.log(allPlayerData);

  // Function that counts number of games for each player
  countNumberOfGamesPlayed(allPlayerData, playerNames, playerID);

  // Function that displayes start rating for each player
  startRatingCount(startRatingAllPlayers);

  // Function that duisplays the change in rating for each player
  changeInRatingAllPlayers(allPlayerData, playerNames);

  // Function that displays the amount of won and lost games, as well as showing the percentage won for each player
  GamesAllPlayers(allPlayerData, playerNames);
});

// ID name register
const playerNames = {
  PE: "Pernille Eskebo",
  BH: "Birk Herman",
  CN: "Carsten Nielsen",
  DS: "Daniel Strauss",
  FB: "Flemming Baarts",
  HP: "Hossein Pakdast",
  HW: "Heidi Weihrauch",
  JOJ: "John O. Jensen",
  JR: "Jesper Rasmussem",
  KS: "Karsten Skals",
  MB: "Mogens Bentzen",
  MR: "Morten Ravn",
  NK: "Nicolai Kistrup",
  NZ: "Nikolaj Zingenberg",
  OMLE: "Oskar Eriksen",
  SM: "Subhayu Mukherjee",
  SN: "Stig Nørgaard",
  TD: "Torri Danekilde",
  TL: "Torben Lang",
};

// Array with all player id's
const playerID = [
  "PE",
  "BH",
  "CN",
  "DS",
  "FB",
  "HP",
  "HW",
  "JOJ",
  "JR",
  "KS",
  "MB",
  "MR",
  "NK",
  "NZ",
  "OMLE",
  "SM",
  "SN",
  "TD",
  "TL",
];

// all start ratings for all players
const startRatingAllPlayers = [
  { id: "Nicolai Kistrup", startRating: 1774 },
  { id: "Subhayu Mukherjee", startRating: 1664 },
  { id: "Heidi Weihrauch", startRating: 1654 },
  { id: "Oskar Eriksen", startRating: 1632 },
  { id: "Torben Lang", startRating: 1590 },
  { id: "Nikolah Wieczorek", startRating: 1474 },
  { id: "Carsten Nielsen", startRating: 1473 },
  { id: "Mogens Bentzen", startRating: 1465 },
  { id: "Nikolaj Zingenberg", startRating: 1404 },
  { id: "Daniel Strauss", startRating: 1398 },
  { id: "Morten Ravn", startRating: 1320 },
  { id: "Flemming Baarts", startRating: 1302 },
  { id: "Jesper Rasmussen", startRating: 1272 },
  { id: "Torri Danekilde", startRating: 1246 },
  { id: "John O. Jensen", startRating: 1132 },
  { id: "Stig Nørgaard", startRating: 1076 },
  { id: "Hossein Pakdast", startRating: 1033 },
  { id: "Karsten Skals", startRating: 1003 },
  { id: "Birk Herman", startRating: 1000 },
  { id: "Pernille Eskebo", startRating: 998 },
];
