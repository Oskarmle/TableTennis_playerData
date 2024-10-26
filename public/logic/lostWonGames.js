const countResults = {};

// Template clone
const gamesWonList = document.getElementById("gamesWonList");
const gamesLostList = document.getElementById("gamesLostList");
const percentageWonList = document.getElementById("percentageWonList");
let statTemplate = document.getElementById("statTemplate");

export let GamesAllPlayers = (allPlayerData, playerNames) => {
  let getplayerNameById = (playerId) => {
    return playerNames[playerId] || playerId;
  };

  allPlayerData.forEach((player) => {
    // create 2 variables with playerID and amount of pionts +/- from each game
    const playerId = player.id;
    const pointsChange = player.points[2];

    if (!countResults[playerId]) {
      countResults[playerId] = {
        lostGames: 0,
        wonGames: 0,
        totalGames: 0,
      };
    }

    countResults[playerId].totalGames++;

    // Check if pointChange contains a "-"
    if (pointsChange.includes("-")) {
      countResults[playerId].lostGames++; // Increate lostGames by one if "-" is included
    } else {
      countResults[playerId].wonGames++; // Increate wonGames by one if "-" is not included
    }
  });

  // Create an array for results
  const resultsArray = Object.keys(countResults).map((id) => {
    const { wonGames, lostGames, totalGames } = countResults[id];
    const winPercentage = totalGames > 0 ? (wonGames / totalGames) * 100 : 0; // Calculate win percentage
    return {
      playerId: id,
      wonGames,
      lostGames,
      totalGames,
      winPercentage,
    };
  });

  resultsArray.sort((a, b) => b.wonGames - a.wonGames);
  const sortedLostGames = resultsArray.slice().sort((b, a) => b.lostGames - a.lostGames);
  const sortedWinPercentage = resultsArray.slice().sort((a, b) => b.winPercentage - a.winPercentage);

  // Loop over the wonGamesArray
  resultsArray.forEach(({ playerId, wonGames}, index) => {
    // Create a clone for won games
    let wonStatClone = statTemplate.content.cloneNode(true);

    // Import names from playerlist
    let fullName = getplayerNameById(playerId);

    // Update won games list
    wonStatClone.querySelector(".playerName").textContent = fullName;
    wonStatClone.querySelector(".playerStat").textContent = wonGames;

    if (index === 0) {
      wonStatClone.querySelector(".statList").classList.add("first-place");
    } else if (index === 1) {
      wonStatClone.querySelector(".statList").classList.add("second-place");
    } else if (index === 2) {
      wonStatClone.querySelector(".statList").classList.add("third-place");
    }

    gamesWonList.appendChild(wonStatClone);
  });

  sortedLostGames.forEach(({ playerId, lostGames }, index) => {
    let lostStatClone = statTemplate.content.cloneNode(true);

    // Import names from playerlist
    let fullName = getplayerNameById(playerId);

    // Update lost games list
    lostStatClone.querySelector(".playerName").textContent = fullName;
    lostStatClone.querySelector(".playerStat").textContent = lostGames;

    if (index === 0) {
      lostStatClone.querySelector(".statList").classList.add("first-place");
    } else if (index === 1) {
      lostStatClone.querySelector(".statList").classList.add("second-place");
    } else if (index === 2) {
      lostStatClone.querySelector(".statList").classList.add("third-place");
    }

    gamesLostList.appendChild(lostStatClone);
  });

  // Loop over the sorted winPercentageArray
  sortedWinPercentage.forEach(({ playerId, winPercentage }, index) => {
    let percentageStatClone = statTemplate.content.cloneNode(true);

    // Import names from playerlist
    let fullName = getplayerNameById(playerId);

    // Update win percentage list
    percentageStatClone.querySelector(".playerName").textContent = fullName;
    percentageStatClone.querySelector(".playerStat").textContent = winPercentage.toFixed(2);

    if (index === 0) {
      percentageStatClone.querySelector(".statList").classList.add("first-place");
    } else if (index === 1) {
      percentageStatClone.querySelector(".statList").classList.add("second-place");
    } else if (index === 2) {
      percentageStatClone.querySelector(".statList").classList.add("third-place");
    }

    percentageWonList.appendChild(percentageStatClone);
  });
};
