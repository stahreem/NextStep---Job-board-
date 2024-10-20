import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config({})
const app = express();

// middleware 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOptions = {
    origin: "http://localhost:4000",
    credentials:true
}
app.use(cors(corsOptions))

import connectDB from "./database/connectDB.js"

const PORT = process.env.PORT || 7000;
app.listen(PORT ,() => {
    connectDB()
    console.log(`Server is running on port ${PORT}`);
    
} )