const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
app.use(express.json());
app.use(cors());

// Retrieve .env file values
const username = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASS;

// Set up a connection to MongoDB
const uri = `mongodb+srv://${username}:${password}@tabletennis0.u10qa.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let playerDB;

// Connect to the database only when a request comes in
async function connectToDB() {
  if (!playerDB) {
    try {
      await client.connect();
      playerDB = client.db("tabletennis").collection("players");
      console.log("Connected to MongoDB Atlas");
    } catch (error) {
      console.error("Error connecting to MongoDB", error);
      throw error;
    }
  }
}

// API route for players
app.get("/players", async (req, res) => {
  try {
    await connectToDB();
    const playerData = await playerDB.find({}).toArray();
    res.status(200).json(playerData);
  } catch (error) {
    console.error("Error fetching players", error);
    res.status(500).json({ message: "Failed to fetch players" });
  }
});

// Use the PORT environment variable or fallback to 3000 for local development
const PORT = process.env.PORT || 3004;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the handler
module.exports = app;
