const Bid = require("../models/Bid");

exports.placeBid = async (req, res) => {
    try {
        const { jobId, proposal, amount } = req.body;
        const bid = new Bid({ jobId, freelancerId: req.user.userId, proposal, amount });
        await bid.save();
        res.status(201).json(bid);
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.getBidsByJob = async (req, res) => {
    try {
        const bids = await Bid.find({ jobId: req.params.jobId }).populate("freelancerId", "name skills rating");
        res.json(bids);
    } catch (error) {
        res.status(500).json({ error });
    }
};
