// Fetch and display the player data
fetch("../player_data.json")  // Adjust path as needed to point to the correct location
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

    // Filter the data to find all records for the current player ID
    const playerDataEntries = data.filter(player => player.id === currentPlayerId);
    
    if (playerDataEntries.length > 0) {
      // Loop through each record for the player and create a table row for each entry
      playerDataEntries.forEach((playerData) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td id="date">${playerData.date}</td>
          <td id="tournament">${playerData.tournament}</td>
          <td id="playerName">${playerData.player.name}</td>
          <td id="playerpoints">${playerData.points[0]}</td>
          <td id="opponentPoints">${playerData.points[1]}</td>
          <td id="pointScore">${playerData.points[2]}</td>
        `;
        tableBody.appendChild(row);
      });
    } else {
      console.error("No data found for the current player.");
    }
  })
  .catch((error) => console.error("Error fetching player data:", error));
