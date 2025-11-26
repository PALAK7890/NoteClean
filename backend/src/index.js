const express =require("express")
const dotenv =require("dotenv")
dotenv.config()
const {connectDB} =require("./database_md/db")

const app =express()
const cors = require("cors")

app.use(cors({origin: "http://localhost:5173"}))

app.use(express.json())

connectDB();
const authRoutes =require("./routes/authRoutes")
const notesRoutes =require("./routes/noteRoutes")

app.use("/api/auth",authRoutes)
app.use("/api/notes",notesRoutes)

app.get("/",(req,res) =>res.send("Backend Running...✨"))

const PORT = process.env.PORT || 8080
app.listen(PORT,() =>console.log(`Server running on port ${PORT}`))
