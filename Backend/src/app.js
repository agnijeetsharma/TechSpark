// app.js or server.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import matchRouter from "./routes/match.routes.js"

const app = express();

app.use(express.json());
app.use(express.json({ limit: "19kb" }));
app.use(express.urlencoded({ extended: true, limit: "18kb" }));
app.use(express.static("public"));                     
app.use(cookieParser());                    
// Middleware setup
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",  
    credentials: true,
}));

// Routes
app.use("/api/v1/users", userRouter);  
app.use("/api/v1/users/match",matchRouter)      

export { app };
