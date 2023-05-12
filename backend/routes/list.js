// const { User } = require("../models/user");
const { Company } = require("../models/company");
const { Thread } = require("../models/thread");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

// router.post("/list=zip", async (req, res) => {
//     const user = await User.findOne({ username: req.body.username });
//     const result = await Company.find({ zip: user.zip });
//     if (result) {
//         res.status(200).send(result);
//     } else {
//         res.status(400).send("No companies in your zip");
//     }
// })

// router.post("/list=city", async (req, res) => {
//     const user = await User.findOne({ username: req.body.username });
//     const result = await Company.find({ city: user.city });
//     if (result) {
//         res.status(200).send(result);
//     } else {
//         res.status(400).send("No companies in your city");
//     }
// })

// router.post("/list=state", async (req, res) => {
//     const user = await User.findOne({ username: req.body.username });
//     const result = await Company.find({ state: user.state });
//     if (result) {
//         res.status(200).send(result);
//     } else {
//         res.status(400).send("No companies in your state");
//     }
// })

router.post("/list", async (req, res) => {
    var result;
    if (req.body.location === "zip") {
        if (req.body.category === "all") {
            result = await Company.find({ zip: Number(req.body.locDetails) });
        } else {
            result = await Company.find({ zip: Number(req.body.locDetails), category: req.body.category });
        }
    } else if (req.body.location === "city") {
        if (req.body.category === "all") {
            result = await Company.find({ city: req.body.locDetails });
        } else {
            result = await Company.find({ city: req.body.locDetails, category: req.body.category });
        }
    } else if (req.body.location === "state") {
        if (req.body.category === "all") {
            result = await Company.find({ state: req.body.locDetails });
        } else {
            result = await Company.find({ state: req.body.locDetails, category: req.body.category });
        }
    }
    if (result.length) {
        res.status(200).send(result);
    } else {
        res.status(200).send([]);
    }
})

router.post("/getcompanies", async (req, res) => {
    const companies = await Company.find({});
    const results = companies.map((company) => {
        return company.companyName;
    })
    if (results.length) {
        res.status(200).send(results);
    } else {
        res.status(200).send([]);
    }
})

router.post("/gethandyman", async (req, res) => {
    const company  = await Company.find({ username: req.body.search });
    var data = {}
    if (company.length) {
        data = {
            handyman: company,
            error: "false"
        }
    } else {
        data = {
            error: req.body.search
        }
    }
    res.status(200).send(data);
})

router.post("/inbox", async (req, res) => {
    var threads;
    var names = [];
    if (req.body.username) {
        const user = await User.findOne({ username: req.body.username });
        threads = await Thread.find({ user: user.id });
    }
    if (req.body.company) {
        const company = await Company.findOne({ username: req.body.company });
        threads = await Thread.find({ company: company.id });
    }
    if (threads.length) {
        res.status(200).send(threads);
    } else {
        res.status(200).send();
    }
})

module.exports = router;