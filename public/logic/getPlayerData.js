export const getPlayerData = async () => {
  const url = `${BASE_URL}/api/players`;
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
