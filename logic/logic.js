// Import functions
import { getPlayerData } from "./getPlayerData.js";

// Import class
// import { PlayerStat } from "../players/PlayerStat.js";

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

let getplayerNameById = (playerId) => {
  return playerNames[playerId] || playerId;
}

// Template clone
const numberOfGames = document.getElementById("numberOfGamesList");
let statTemplate = document.getElementById("statTemplate");

window.addEventListener("load", async () => {
  const allPlayerData = await getPlayerData();

  if (allPlayerData.length === 0) {
    console.log("no players available");
    return;
  }
  // Logs the whole playerData array
  // console.log(allPlayerData);

  // Total games function
  totalGames(allPlayerData);
});

// Count total games per player
let totalGames = (allPlayerData) => {
  let gameCount = allPlayerData.reduce((accumulator, player) => {
    if (accumulator[player.id]) {
      accumulator[player.id] += 1;
    } else {
      accumulator[player.id] = 1;
    }
    return accumulator;
  }, {});
  
  // Convert from object to array with objects and sort from largest to smallest count value
  let gameCountA = Object.entries(gameCount);
  let gameCountArray = gameCountA.map(([playerId, count]) => {
    return { id: playerId, count: count };
  });
  gameCountArray.sort((a, b) => b.count - a.count)
  // console.log(gameCountArray);
  
  
  //Loop that goes through the whole gameCountarray
  gameCountArray.forEach((player, index) => {
    let statClone = statTemplate.content.cloneNode(true);

    // Import names from playerlist
    let fullName = getplayerNameById(player.id)

    statClone.querySelector(".playerName").textContent = fullName;
    statClone.querySelector(".playerStat").textContent = player.count;

    if (index === 0) {
      statClone.querySelector(".statList").classList.add("first-player")
    } else if (index === 1) {
      statClone.querySelector(".statList").classList.add("second-player")
    } else if (index === 2) {
      statClone.querySelector(".statList").classList.add("third-player")
    }

    numberOfGames.appendChild(statClone);
  });
};
