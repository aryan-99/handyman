const { User } = require("../models/user");
const { Company } = require("../models/company");
const { Review } = require("../models/review");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    // let user = await User.findOne({ username: req.body.username });
    // if (user) {
    //     return res.status(400).send("User already exists");
    // }
    let user = new User({
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

router.post("/getcompanyprofile", async (req, res) => {
    const company = await Company.findOne({ username: req.body.companyUsername });
    const reviews = await Review.find({ company: company.id }).sort({ updatedAt: 1 });
    const users = reviews.map(async (review) => {
        return (await User.findById(review.user));
    });
    const data = {
        company: company,
        reviews: reviews,
        users: users,
    }
    if (company) {
        res.status(200).send(data);
    } else {
        res.status(400).send("Error: Company not found");
    }
})

router.post("/addreview", async (req, res) => {
    const company = await Company.findOne({ username: req.body.companyUsername });
    const user = await User.findOne({ username: req.body.username });
    let review = new Review({
        title: req.body.title,
        description: req.body.desc,
        rating: Number(req.body.rating),
        user: user.id,
        company: company.id,
    })
    await review.save().then(review => {
        res.status(200).send(review);
    }).catch(err => {
        console.error(err);
        res.status(400).send(err);
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
        about: req.body.about,
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