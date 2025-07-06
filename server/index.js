import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import route from "./routes/userRoute.js";
import cors from "cors";




const app=express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();


const PORT=process.env.PORT || 8000;
const MONGOURI=process.env.MONGO_URI || "mongodb://localhost:27017/React";

mongoose.connect(MONGOURI)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => console.log(error));

app.use("/api",route);

