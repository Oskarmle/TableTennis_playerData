export function RatingNow(startRatingAllPlayers) {
    const ratingChangeListItems = document.querySelectorAll("#ratingChangeList .statList");
    const template = document.getElementById("statTemplate").content;
    const ratingNowList = document.getElementById("RatingNowList");
  
    // Prepare an array to hold the current ratings with player names
    const currentRatings = [];
  
    // Gather and calculate the current rating for each player
    ratingChangeListItems.forEach(item => {
      const playerName = item.querySelector(".playerName").textContent;
      const ratingChange = parseInt(item.querySelector(".playerStat").textContent, 10);
  
      // Find the corresponding player in startRatingAllPlayers
      const playerData = startRatingAllPlayers.find(player => player.id === playerName);
  
      if (playerData) {
        // Calculate the new rating
        const currentRating = playerData.startRating + ratingChange;
  
        // Store the player's name and current rating in the array
        currentRatings.push({ id: playerName, currentRating });
      }
    });
  
    // Sort the currentRatings array from highest to lowest rating
    currentRatings.sort((a, b) => b.currentRating - a.currentRating);
  
    // Clear the "Rating Now" list to avoid duplication
    ratingNowList.innerHTML = "";
  
    // Populate the sorted list in the "Rating Now" section
    currentRatings.forEach((player, index) => {
      // Clone the template and populate it
      const statClone = document.importNode(template, true);
      statClone.querySelector(".playerName").textContent = player.id;
      statClone.querySelector(".playerStat").textContent = player.currentRating;
  
      if (index === 0) {
        statClone.querySelector(".statList").classList.add("first-place");
      } else if (index === 1) {
        statClone.querySelector(".statList").classList.add("second-place");
      } else if (index === 2) {
        statClone.querySelector(".statList").classList.add("third-place");
      }
      
      // Append the populated clone to the RatingNowList
      ratingNowList.appendChild(statClone);
    });
  }