const { User } = require("../models/user");
const { Company } = require("../models/company");
const express = require("express");
const router = express.Router();

router.post("/list=zip", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    const result = await Company.find({ zip: user.zip });
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(400).send("No companies in your zip");
    }
})

router.post("/list=city", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    const result = await Company.find({ city: user.city });
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(400).send("No companies in your city");
    }
})

router.post("/list=state", async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    const result = await Company.find({ state: user.state });
    if (result) {
        res.status(200).send(result);
    } else {
        res.status(400).send("No companies in your state");
    }
})

module.exports = router;