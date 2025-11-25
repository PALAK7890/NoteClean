const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const { connectDB } = require("./database_md/db");
const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/noteRoutes");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.get("/", (req, res) => res.send("Backend Running...✨"));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
