require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

// ROUTES
const users = require("./routes/users");
const auth = require("./routes/auth");
const list = require("./routes/list");

const db = process.env.DB;
const app = express();
const port = process.env.PORT || 8082;

const connect = async () => {
        await mongoose.connect(db).then(() => {
            console.log(`Connected to ${process.env.DB_NAME}`);
        }).catch (e => {
            console.error("Error connecting to db: ", e.message);
        });
}

connect();

app.use(cors());
app.use(bodyParser.json());
app.use("", users);
app.use("", auth);
app.use("", list);

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})