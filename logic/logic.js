import { getPlayerData } from "./getPlayerData.js";

window.addEventListener("load", async () => {
  const allPlayerData = await getPlayerData();

  if (allPlayerData.length === 0) {
    console.log("no players available");
    return;
  }

  console.log(allPlayerData);

  // Current Rating
  //   allPlayerData.forEach((object) => {
  //   });
  

  // Count total games per player
  let gameCount = allPlayerData.reduce((accumulator,  player) => {
    if (accumulator[player.id]) {
        accumulator[player.id] += 1;
    } else {
        accumulator[player.id] = 1;
    }
    return accumulator
  }, [])
  console.log(gameCount);
});

