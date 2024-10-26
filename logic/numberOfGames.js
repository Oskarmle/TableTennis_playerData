const gamesCounts = [];

export let countNumberOfGamesPlayed = (
  allPlayerData,
  playerNames,
  playerID
) => {
  let getplayerNameById = (playerId) => {
    return playerNames[playerId] || playerId;
  };

  // count number of games played
  playerID.forEach((value) => {
    gamesCounts[value] = 0;
  });

  allPlayerData.forEach((player) => {
    if (gamesCounts.hasOwnProperty(player.id)) {
      gamesCounts[player.id]++;
    }
  });

  // Template clone
  const numberOfGamesList = document.getElementById("numberOfGamesList");
  let statTemplate = document.getElementById("statTemplate");

  // Sort players based on game counts in descending order
  const sortedPlayers = playerID.sort(
    (a, b) => gamesCounts[b] - gamesCounts[a]
  );

  //Loop that goes through the whole gameCountarray
  sortedPlayers.forEach((playerId, index) => {
    let statClone = statTemplate.content.cloneNode(true);

    // Import names from playerlist
    let fullName = getplayerNameById(playerId);

    statClone.querySelector(".playerName").textContent = fullName;
    statClone.querySelector(".playerStat").textContent = gamesCounts[playerId];
    
    // giving 1st, 2nd and 3rd a class
    if (index === 0) {
      statClone.querySelector(".statList").classList.add("first-place");
    } else if (index === 1) {
      statClone.querySelector(".statList").classList.add("second-place");
    } else if (index === 2) {
      statClone.querySelector(".statList").classList.add("third-place");
    }

    numberOfGamesList.appendChild(statClone);
  });
};
