// Fetch and display the player data
fetch("../player_data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    // Get the player ID from the HTML page's hidden element
    const playerIdElement = document.getElementById("player-id");
    const currentPlayerId = playerIdElement.getAttribute("data-player-id"); // Get the data-player-id

    const tableBody = document
      .getElementById("playerTable")
      .querySelector("tbody");

    const playerDataEntries = data.filter(
      (player) => player.id === currentPlayerId
    );

    if (playerDataEntries.length > 0) {
      // Loop through the data from the json file, Checking for ID's
      let count = 1;
      playerDataEntries.forEach((playerData) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td id="date${count}-${currentPlayerId}">${playerData.date}</td>
          <td id="tournament${count}-${currentPlayerId}">${playerData.tournament}</td>
          <td id="playerName${count}-${currentPlayerId}">${playerData.player.name}</td>
          <td id="playerPoints${count}-${currentPlayerId}">${playerData.points[0]}</td>
          <td id="opponentPoints${count}-${currentPlayerId}">${playerData.points[1]}</td>
          <td id="pointScore${count}-${currentPlayerId}">${playerData.points[2]}</td>
        `;
        tableBody.appendChild(row);

        const pointScoreElement = document.getElementById(
          `pointScore${count}-${currentPlayerId}`
        );
        if (pointScoreElement) {
          const pointScoreValue = pointScoreElement.textContent.trim();
          // Check if Pointscore has a minus
          if (pointScoreValue.includes("-")) {
            // console.log(`Row ${count}: The number includes a minus`);
            pointScoreElement.style.background = "#a00000";
            pointScoreElement.style.color = "white";
            lostGames.push("lost");
          } else {
            // console.log(`Row ${count}: The number is a positive one`);
            pointScoreElement.style.background = "#008e00";
            pointScoreElement.style.color = "white";
            wonGames.push("won");
          }
        }

        // Set start rating for player
        const playerStartingPointFTable = document.getElementById(
          `playerPoints1-${currentPlayerId}`
        ).innerHTML;
        document.getElementById("ratingStartSeason").innerHTML =
          playerStartingPointFTable;

        console.log(playerStartingPointFTable);

        const pointScoreElementHTML = document.getElementById(
          `pointScore${count}-${currentPlayerId}`
        ).innerHTML;

        // console.log(pointScoreElementHTML);

        count++;
      });
    } else {
      console.error("haven't played any games yet");
    }
  })
  .catch((error) => console.error("Error fetching player data", error));

setTimeout(() => {
  addRating();
  ratingChange();
  Games();

  // wonLost();
}, 20);

const playerIdElement = document.getElementById("player-id");
const currentPlayerId = playerIdElement.getAttribute("data-player-id");
function addRating() {
  // Get the initial rating from "ratingStartSeason" and convert it to a number
  let totalScore = parseFloat(
    document.getElementById("ratingStartSeason").textContent.trim()
  );
  if (isNaN(totalScore)) totalScore = 1000; // Ensure totalScore is a number

  // Calculate total pointScore
  const rows = document.querySelectorAll(`#playerTable tbody tr`);
  rows.forEach((row) => {
    const pointScoreCell = row.querySelector(
      `[id^="pointScore"][id*="${currentPlayerId}"]`
    );
    if (pointScoreCell) {
      const pointScoreValue = parseFloat(pointScoreCell.textContent.trim());
      if (!isNaN(pointScoreValue)) {
        totalScore += pointScoreValue; // Add point score to total
      }
    }
  });

  // Display total score in the "ratingNow" element
  console.log(`Total Point Score: ${totalScore}`);
  document.getElementById("ratingNow").innerText = totalScore.toFixed(); // Rounding to 2 decimals if needed
}

function ratingChange() {
  // Set the initial number to 0
  let totalScore = 0;

  // Calculate total pointScore
  const rows = document.querySelectorAll(`#playerTable tbody tr`);
  rows.forEach((row) => {
    const pointScoreCell = row.querySelector(
      `[id^="pointScore"][id*="${currentPlayerId}"]`
    );
    if (pointScoreCell) {
      const pointScoreValue = parseFloat(pointScoreCell.textContent.trim());
      if (!isNaN(pointScoreValue)) {
        totalScore += pointScoreValue; // Add point score to total
      }
    }
  });
  // Display total score in the "ratingNow" element
  console.log(`Change in rating is: ${totalScore}`);
  document.getElementById("ratingChange").innerText = totalScore;
}
// arrays that store lost/won games, pushed from the foreach function
let wonGames = [];
let lostGames = [];

function Games() {
  let games = document.querySelectorAll("#playerTable tbody tr");
  let numberOfWonGames = wonGames.length;
  let numberOfLostGames = lostGames.length;
  console.log(`Has lost ${numberOfLostGames} games`);
  console.log(`Has won ${numberOfWonGames} games`);

  let countGames = games.length;

  // Calculate the percentage of games won
  let percentageWon = (100 * numberOfWonGames) / countGames;

  console.log(countGames);
  document.getElementById("numberOfGames").innerText = countGames;
  document.getElementById("gamesWon").innerText = numberOfWonGames;
  document.getElementById("gamesLost").innerText = numberOfLostGames;
  document.getElementById("percentageWon").innerText = percentageWon.toFixed(1);
}
