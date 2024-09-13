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
          } else {
            // console.log(`Row ${count}: The number is a positive one`);
            pointScoreElement.style.background = "#008e00";
            pointScoreElement.style.color = "white";
          }
        }

        // Set start rating for player
        const playerStartingPointFTable = document.getElementById(
          `playerPoints1-${currentPlayerId}`
        ).innerHTML;
        document.getElementById("ratingStartSeason").innerHTML =
          playerStartingPointFTable;

        // console.log(playerStartingPointFTable);

        const pointScoreElementHTML = document.getElementById(
          `pointScore${count}-${currentPlayerId}`
        ).innerHTML;

        console.log(pointScoreElementHTML);

        count++;
      });
    } else {
      console.error("haven't played any games yet");
    }
  })
  .catch((error) => console.error("Error fetching player data", error));

  setTimeout(() => {
    function addRating() {
      const playerIdElement = document.getElementById("player-id");
      const currentPlayerId = playerIdElement.getAttribute("data-player-id");
      let totalScore = 0;
  
      // Calculate total pointScore
      const rows = document.querySelectorAll(`#playerTable tbody tr`);
      rows.forEach((row) => {
        const pointScoreCell = row.querySelector(`[id^="pointScore"][id*="${currentPlayerId}"]`);
        if (pointScoreCell) {
          const pointScoreValue = parseFloat(pointScoreCell.textContent.trim());
          if (!isNaN(pointScoreValue)) {
            totalScore += pointScoreValue; // Add point score to total
          }
        }
      });
  
      // Display total score (you can adjust where and how you display this)
      console.log(`Total Point Score: ${totalScore}`);
      document.getElementById("ratingNow").innerText = totalScore;
    }
    addRating();
  }, 1000);