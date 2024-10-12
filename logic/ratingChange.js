// Template clone
const ratingChangeList = document.getElementById("ratingChangeList");
let statTemplate = document.getElementById("statTemplate");

let totalPoints = 0;
const playerPoints = {};

export let changeInRatingAllPlayers = (allPlayerData, playerNames) => {
  let getplayerNameById = (playerId) => {
    return playerNames[playerId] || playerId;
  };
  allPlayerData.forEach((player) => {

    // create 2 variables with playerID and amount of pionts +/- from each game
    const playerId = player.id;
    const pointsChange = parseInt(player.points[2]);

    if (!playerPoints[playerId]) {
      playerPoints[playerId] = 0;
    }

    playerPoints[playerId] += pointsChange;

    totalPoints += pointsChange;
  });
  const sortedRatingChange = Object.entries(playerPoints).sort(
    (a, b) => b[1] - a[1]
  );

//   console.log(sortedRatingChange);
  

  sortedRatingChange.forEach(([playerId, points]) => {
    let statClone = statTemplate.content.cloneNode(true);

    // Import names from playerlist
    let fullName = getplayerNameById(playerId);

    statClone.querySelector(".playerName").textContent = fullName;
    statClone.querySelector(".playerStat").textContent = points;

    ratingChangeList.appendChild(statClone);
  });
};