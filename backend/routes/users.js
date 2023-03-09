const { User } = require("../models/user");
const { Company } = require("../models/company");
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
        street: req.body.street,
        unit: req.body.unit,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save().then(user => {
        res.status(200).send(user);
    }).catch(err => {
        console.error("Error saving user: ", err);
        res.status(400).send("Error saving user: " + err);
    });
})

router.post("/adddummy", async (req, res) => {
    let company = await Company.findOne({ username: req.body.username });
    // if (user) {
    //     return res.status(400).send("User already exists");
    // }
    company = new Company({
        username: req.body.username,
        companyName: req.body.companyName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        category: req.body.category,
        street: req.body.street,
        unit: req.body.unit,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country,
    });
    const salt = await bcrypt.genSalt(10);
    company.password = await bcrypt.hash(company.password, salt);
    await company.save().then(company => {
        res.status(200).send(company);
    }).catch(err => {
        console.error("Error saving company: ", err);
        res.status(400).send("Error saving company: " + err);
    });
})

module.exports = router;