const Job = require("../models/Job");

exports.createJob = async (req, res) => {
	try {
		const { title, description, budget, category, skillsRequired } = req.body;
		const job = new Job({ clientId: req.user.userId, title, description, budget, category, skillsRequired });
		await job.save();
		res.status(201).json(job);
	} catch (error) {
		res.status(500).json({ error });
	}
};

exports.getJobs = async (req, res) => {
	try {
		// add filter by category, date, skills required, no. of bids, status

		const jobs = await Job.find();
		res.json(jobs);
	} catch (error) {
		res.status(500).json({ error });
	}
};

exports.getJobById = async (req, res) => {
	try {
		const job = await Job.findById(req.params.id);
		if (!job) return res.status(404).json({ error: "Job not found" });
		res.json(job);
	} catch (error) {
		res.status(500).json({ error });
	}
};

exports.updateJob = async (req, res) => {
	try {
		const { jobId } = req.params;
		const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, { new: true });
		if (!updatedJob) return res.status(404).json({ message: "Job not found!" });
		res.json(updatedJob);
	} catch (error) {
		res.status(500).json({ error });
	}
};

// Delete a job (Only the creator can delete)
exports.deleteJob = async (req, res) => {
	try {
		const job = await Job.findById(req.params.id);
		if (!job) return res.status(404).json({ error: "Job not found!" });

		if (job.clientId.toString() !== req.user.userId) {
			return res.status(403).json({ error: "Unauthorized" });
		}

		await job.deleteOne();
		res.json({ message: "Job deleted successfully" });
	} catch (error) {
		res.status(500).json({ error });
	}
};
