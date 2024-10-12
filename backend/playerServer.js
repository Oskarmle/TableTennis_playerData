const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const port = 3003;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Retrieve .env file values
const username = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASS;

//Set up a connection to MongoDB
const uri = `mongodb+srv://${username}:${password}@tabletennis0.u10qa.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let playerDB;

async function connectToDB() {
  try {
    await client.connect();
    playerDB = client.db("tabletennis").collection("players");
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

// Connect to the database once when the server starts
connectToDB();

// CRUD function that handles the GET request
app.get("/players", async (req, res) => {
  try {
    const PlayerData = await getAllPlayerData();
    // console.log("Player data:", PlayerData);

    res.status(200).json(PlayerData);
  } catch (error) {
    console.error("Error fetching players", error);
    if (!res.headersSent) {
      res.status(500).json({ message: "Failed to fetch players" });
    }
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// GET function
const getAllPlayerData = async () => {
  try {
    const playerData = await playerDB.find({}).toArray(); // Fetch data from 'players' collection
    return playerData;
  } catch (error) {
    console.error("Error fetching player data:", error);
    throw error;
  // } finally {
  //   await client.close();
  }
};
