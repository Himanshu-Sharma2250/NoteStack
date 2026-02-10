import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import router from "./routes/auth.route.js";
import connect_db from "./utils/db.js";
import noteRouter from "./routes/note.route.js";

dotenv.config({path: './.env'});

const app = express()
const port = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.FRONTEND_BASE_URL,
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods:['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

connect_db();

app.use("/api/v1/auth", router);
app.use("/api/v1/note", noteRouter);

app.get('/', (req, res) => {
  res.send('Hello World again2!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
