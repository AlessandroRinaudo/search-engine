import bodyParser from "body-parser";
import express from "express";

import connectDB from "../config/database";
import user from "./routes/api/user";
import index from "./routes/api/index";
import book from "./routes/api/book";
import search from "./routes/api/search";
import cors from 'cors';
import admin from "./routes/api/admin";

const app = express();

// Connect to MongoDB
connectDB().then(() => {
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.get("/", (_req, res) => {
    res.send("API Running");
});

app.use("/api/user", user);
app.use("/api/index", index);
app.use("/api/book", book);
app.use("/api/search", search);
app.use("/api/admin", admin)

const port = app.get("port");
const server = app.listen(port, () =>
    console.log(`Server started on port ${port}`)
);

export default server;
