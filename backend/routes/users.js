const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    // if (user) {
    //     return res.status(400).send("User already exists");
    // }
    user = new User({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save().then(user => {
        res.send(user);
    }).catch(err => {
        console.error("Error saving user: ", err);
        res.status(400).send("Error saving user: " + err);
    });
})

module.exports = router;