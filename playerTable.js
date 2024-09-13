const playerTable = document.getElementById("playerTable");

let count = 1; // Assuming you want to start with the first player.

// Access the pointScore1 <td> element
const pointScore1 = document.getElementById("pointScore1");

// Delay the execution of the following code by 2 seconds (2000 milliseconds)
setTimeout(() => {
    if (pointScore1) { // Check if the element exists
        // Get the text content of the <td> element
        const pointScoreValue = pointScore1.textContent.trim(); // Use textContent to get the cell's content

        // Check if the content includes a minus sign
        if (pointScoreValue.includes("-")) {
            console.log("The number includes a minus");
        } else {
            console.log("The number is a positive one");
        }
    } else {
        console.log("pointScore1 element not found");
    }
}, 2000); // Delay in milliseconds