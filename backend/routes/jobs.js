const { User } = require("../models/user");
const { Company } = require("../models/company");
const { Job } = require("../models/job");
const { Thread } = require("../models/thread");
const { Message } = require("../models/message");
const { Bid } = require("../models/bid");
const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
    });
const upload = multer({ storage: storage });

// list all jobs for logged in user
router.post("/jobs", async (req, res) => {
    var jobs, bids;
    if (req.body.username) {
        const user = await User.findOne({ username: req.body.username });
        jobs = await Job.find({ user: user.id });
        const data = {
            jobs: jobs
        }
        if (jobs) {
            res.status(200).send(data);
        }
        return;
    }
    if (req.body.company) {
        const company = await Company.findOne({ username: req.body.company });
        jobs = await Job.find({ company: company.id });
        bids = await Bid.find({ company: company.id });
    }
    const data = {
        jobs: jobs,
        bids: bids,
    }
    if (jobs.length || bids.length) {
        res.status(200).send(data);
    } else {
        res.status(200).send();
    }
})

// get specific job
router.post("/getjob", async (req, res) => {
    const job = await Job.findById(req.body.jobid);
    const user = await User.findById(job.user);
    var data, bid, bids;
    if (req.body.company) {
        const company = await Company.findOne({ username: req.body.company });
        bid = await Bid.findOne({ company: company.id, job: job.id });
    }
    if (req.body.username) {
        bids = await Bid.find({ job: job.id });
    }
    data = {
        job: job,
        user: user,
        bid: bid,
        bids: bids,
    }
    res.status(200).send(data);
})

// delete job
router.post("/deletejob", async (req, res) => {
    try {
        const thread = await Thread.findOne({ job: req.body.jobid });
        await Bid.deleteMany({ job: req.body.jobid });
        await Message.deleteMany({ thread: thread.id });
        await Thread.findByIdAndDelete(thread.id);
        await Job.findByIdAndDelete(req.body.jobid);
        res.status(200).send();
    } catch (error) {
        res.status(400).send(error);
    }
})

// create job
router.post("/createjob", upload.array("files", 5), async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    var media;

    if (req.body.files) {   // FIXME
        media = req.body.files.map((file) => {
            return {data: Buffer.from(file.buffer, "base64"), contentType: file.mimetype};
        })
    }

    var handymen = [];
    if (req.body.handymen.length) {
        for (var i=0; i < req.body.handymen.length; i++) {
            const company = await Company.findOne({ username: req.body.handymen[i].username });
            handymen.push(company.id);
        }
    }

    let job = new Job({
        title: req.body.title,
        description: req.body.desc,
        category: req.body.category,
        userMedia: media,
        user: user.id,
        marketplace: Boolean(req.body.bid),
        private: handymen,
    });

    await job.save().then(job => {
    }).catch(error => {
        res.status(400).send(error);
    })

    for (var i=0; i < handymen.length; i++) {
        let thread = new Thread({
            title: req.body.title,
            user: user.id,
            company: handymen[i],
            username: user.username,
            companyName: req.body.handymen[i].companyName,
            job: job.id,
            jobName: job.title,
        });
        await thread.save().then(thread => {
        }).catch(error => {
            res.status(400).send(error);
        })
    }

    res.status(200).send(job);
})

// retrieve job messages
router.post("/jobmessages", async (req, res) => {
    const thread = await Thread.findOne({ job: req.body.jobid });
    const job = await Job.findById(req.body.jobid)
    const user = await User.findById(job.user);
    const company = await Company.findOne({ username: req.body.company });
    try {
        messages = await Message.find({ thread: thread.id }).sort({ timestamp: 1 });
    } catch (e) {
        let thread = new Thread({
            title: job.title,
            user: job.user,
            username: user.username,
            company: company.id,
            companyName: company.companyName,
            job: job.id,
            jobName: job.title,
        });
        await thread.save().then(thread => {
        }).catch(error => {
            res.status(400).send(error);
        })
        messages = await Message.find({ thread: thread.id }).sort({ timestamp: 1 });
    }
    const newthread = await Thread.findOne({ job: req.body.jobid });
    const data = {
        messages: messages,
        jobname: newthread.jobName,
        job: job,
    }
    try {
        res.status(200).send(data);
    } catch (error) {
        res.status(400).send(error);
    }
})

// add message
router.post("/addjobmessage", async (req, res) => {
    const company = await Company.findOne({ username: req.body.company });
    const thread = await Thread.findOne({ job: req.body.jobid, company: company.id });
    const sender = req.body.username ? req.body.username : req.body.company;
    let msg = new Message({
        content: {
            text: req.body.newMsg,
        },
        thread: thread.id,
        sender: sender,
    })
    await msg.save().then(msg => {
        res.status(200).send(msg);
    }).catch(error => {
        res.status(400).send(error);
    })
    return;
})

// add bid
router.post("/addbid", async (req, res) => {
    const company = await Company.findOne({ username: req.body.company });
    const job = await Job.findById(req.body.jobid);
    let bid = new Bid({
        company: company.id,
        companyUser: company.username,
        companyName: company.companyName,
        job: req.body.jobid,
        jobName: job.title,
        quote: req.body.price,
        description: req.body.desc,
    });
    await bid.save().then(bid => {
        res.status(200).send(bid);
    }).catch(error => {
        res.status(400).send(error);
    })
    return;
})

// accept bid
router.post("/acceptbid", async (req, res) => {
    const bid = await Bid.findById(req.body.acceptbid);
    bid.accepted = true;
    await bid.save();
    const job = await Job.findById(bid.job);
    job.marketplace = false;
    job.companyName = bid.companyName;
    job.company = bid.company;
    job.companyUser = bid.companyUser;
    job.quote = bid.quote;
    job.bidDesc = bid.description;
    job.bids = [];
    job.accepted = true;
    await Bid.deleteMany({ job: job.id });
    await job.save().then(job => {
        res.status(200).send(bid);
    }).catch(error => {
        res.status(400).send(error);
    });
})

// delete bid
router.post("/deletebid", async (req, res) => {
    const bid = await Bid.findByIdAndDelete(req.body.bid._id);
    res.status(200).send(bid);
})

// get marketplace
router.post("/marketplace", async (req, res) => {
    const company = await Company.findOne({ username: req.body.company });
    const jobs = await Job.find({ marketplace: true, accepted: false, category: company.category });
    const data = {
        jobs: jobs,
    }
    res.status(200).send(data);
})

module.exports = router;