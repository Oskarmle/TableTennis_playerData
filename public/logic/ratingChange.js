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
  

  sortedRatingChange.forEach(([playerId, points], index) => {
    let statClone = statTemplate.content.cloneNode(true);

    // Import names from playerlist
    let fullName = getplayerNameById(playerId);

    statClone.querySelector(".playerName").textContent = fullName;
    statClone.querySelector(".playerStat").textContent = points;

    // giving 1st, 2nd and 3rd a class
    if (index === 0) {
      statClone.querySelector(".statList").classList.add("first-place");
    } else if (index === 1) {
      statClone.querySelector(".statList").classList.add("second-place");
    } else if (index === 2) {
      statClone.querySelector(".statList").classList.add("third-place");
    }

    ratingChangeList.appendChild(statClone);
  });
};