export let playersArray = [];

// Load the array from localStorage if it exists
function loadPlayersArray() {
  const storedPlayers = localStorage.getItem('playersArray');
  if (storedPlayers) {
    playersArray = JSON.parse(storedPlayers);
    console.log('Loaded players array from localStorage:', playersArray);
  } else {
    console.log('No players array found in localStorage.');
  }
}

// Call the function to load the array when needed
loadPlayersArray();
