export let startRatingCount = (startRatingAllPlayers) => {
    // Template clone
    const ratingStartList = document.getElementById("RatingStartSeasonList");
    let statTemplate = document.getElementById("statTemplate");
  
    startRatingAllPlayers.forEach((player, index) => {
      // console.log(player.id, player.startRating);
      let statClone = statTemplate.content.cloneNode(true);
  
      statClone.querySelector(".playerName").textContent = player.id;
      statClone.querySelector(".playerStat").textContent = player.startRating;
  
    // giving 1st, 2nd and 3rd a class
    if (index === 0) {
      statClone.querySelector(".statList").classList.add("first-place");
    } else if (index === 1) {
      statClone.querySelector(".statList").classList.add("second-place");
    } else if (index === 2) {
      statClone.querySelector(".statList").classList.add("third-place");
    }

      ratingStartList.appendChild(statClone);
    });
  };