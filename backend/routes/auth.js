const { User } = require("../models/user");
const { Company } = require("../models/company");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        const token = jwt.sign(
            {
                username: user.username,
                email: user.email,
            },
            "handyman-randomize",
            {
                expiresIn: "24h",
            }
        )
        res.status(200).send({
            username: user.username,
            token: token,
        });
    } catch (err) {
        return res.status(400).send("Incorrect username/password");
    }
})

router.post("/handyman-login", async (req, res) => {
    let company = await Company.findOne({ username: req.body.username });
    if (!company) {
        return res.status(400).send("Incorrect username/password");
    }

    try {
        const pwd = await bcrypt.compare(req.body.password, company.password);
        if (!pwd) {
            return res.status(400).send("Incorrect username/password");
        }
        const token = jwt.sign(
            {
                username: company.username,
                email: company.email,
            },
            "handyman-randomize",
            {
                expiresIn: "24h",
            }
        )
        res.status(200).send({
            company: company.username,
            token: token,
        });
    } catch (err) {
        return res.status(400).send("Incorrect username/password");
    }
})

module.exports = router;