export const getPlayerData = async () => {
  const url = "http://127.0.0.1:3003/players";
  try {
    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`reponse status: ${response.status}`);
    }
    const playerData = await response.json();
    return playerData;
  } catch (error) {
    console.error(error);
  }
};
