export const getPlayerData = async () => {
  const url = `${process.env.VITE_API_BASE_URL}/api/players`;
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
