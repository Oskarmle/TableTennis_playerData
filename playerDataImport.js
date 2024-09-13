// Fetch and display the player data
fetch("player_data.json")
  .then((response) => response.json())
  .then((data) => {
    const tableBody = document
      .getElementById("playerTable")
      .querySelector("tbody");
    data.forEach((player) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                        <td>${player.date}</td>
                        <td>${player.tournament}</td>
                        <td>${player.player.name}</td>
                        <td><a href="${player.player.link}">${player.player.link}</a></td>
                        <td>${player.points[0]}</td>
                        <td>${player.points[1]}</td>
                        <td>${player.points[2]}</td>
                    `;
      tableBody.appendChild(row);
    });
  })
  .catch((error) => console.error("Error fetching player data:", error));
