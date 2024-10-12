export let startRatingCount = (startRatingAllPlayers) => {
    // Template clone
    const ratingStartList = document.getElementById("RatingStartSeasonList");
    let statTemplate = document.getElementById("statTemplate");
  
    startRatingAllPlayers.forEach((player) => {
      // console.log(player.id, player.startRating);
      let statClone = statTemplate.content.cloneNode(true);
  
      statClone.querySelector(".playerName").textContent = player.id;
      statClone.querySelector(".playerStat").textContent = player.startRating;
  
      ratingStartList.appendChild(statClone);
    });
  };