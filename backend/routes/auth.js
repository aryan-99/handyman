const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(400).send("Incorrect username/password");
    }

    try {
        const pwd = await bcrypt.compare(req.body.password, user.password);
        if (!pwd) {
            return res.status(400).send("Incorrect username/password");
        }
        res.send(pwd);
    } catch (err) {
        return res.status(400).send("Incorrect username/password");
    }
})

module.exports = router;