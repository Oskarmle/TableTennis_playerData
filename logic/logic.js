// Import functions
import { getPlayerData } from "./getPlayerData.js";
import { countNumberOfGamesPlayed } from "./numberOfGames.js";

window.addEventListener("load", async () => {
  const allPlayerData = await getPlayerData();

  if (allPlayerData.length === 0) {
    console.log("no players available");
    return;
  }
  console.log(allPlayerData);

  // Function that counts number of games
  countNumberOfGamesPlayed(allPlayerData, playerNames, playerID)


});

// ID name register
const playerNames = {
    "PE": "Pernille Eskebo",
    "BH": "Birk Herman",
    "CN": "Carsten Nielsen",
    "DS": "Daniel Strauss",
    "FB": "Flemming Baarts",
    "HP": "Hossein Pakdast",
    "HW": "Heidi Weihrauch",
    "JOJ": "John O. Jensen",
    "JR": "Jesper Rasmussem",
    "KS": "Karsten Skals",
    "MB": "Mogens Bentzen",
    "MR": "Morten Ravn",
    "NK": "Nicolai Kistrup",
    "NZ": "Nikolaj Zingenberg",
    "OMLE": "Oskar Eriksen",
    "SM": "Subhayu Mukherjee",
    "SN": "Stig Nørgaard",
    "TD": "Torri Danekilde",
    "TL": "Torben Lang",
  }

// Array with all player id's
const playerID = ["PE", "BH", "CN", "DS", "FB", "HP", "HW", "JOJ", "JR", "KS", "MB", "MR", "NK", "NZ", "OMLE", "SM", "SN", "TD", "TL"]

