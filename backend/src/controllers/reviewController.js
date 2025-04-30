const Review = require("../models/Review");

exports.createReview = async (req, res) => {
	try {
		const { jobId, rating, comment } = req.body;
		const review = await Review.create({ jobId, userId: req.user.userId, rating, comment });
		res.json(review);
	} catch (error) {
		res.status(500).json({ error });
	}
};

exports.getReviews = async (req, res) => {
	try {
		const { jobId } = req.params;
		const reviews = await Review.find({ jobId }).sort({ createdAt: -1 }); // desc
		res.json(reviews);
	} catch (error) {
		res.status(500).json({ error });
	}
};
