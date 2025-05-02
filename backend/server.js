const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();


const app = express();
app.use(cors( )); //{ origin: 'http://localhost:3000' }
// app.use(cors({ origin: 'https://rest-countries-apifrontend.vercel.app' }));
app.use(bodyParser.json());


// MongoDB Connection
const MONGO_DB_URL = process.env.MONGO_DB_URL;
mongoose
  .connect(MONGO_DB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const favoriteRoutes = require("./routes/favoriteRoutes");
app.use("/api/favorites", favoriteRoutes);
