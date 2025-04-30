const Message = require("../models/Message");

// Send a message
exports.sendMessage = async (req, res) => {
	try {
		const { receiverId, jobId, message } = req.body;
		const newMessage = new Message({ senderId: req.user.userId, receiverId, jobId, message });
		await newMessage.save();
		res.status(201).json(newMessage);
	} catch (error) {
		res.status(500).json({ error });
	}
};

// Get messages between two users
exports.getMessages = async (req, res) => {
	try {
		const messages = await Message.find({
			$or: [
				{ senderId: req.user.userId, receiverId: req.params.userId },
				{ senderId: req.params.userId, receiverId: req.user.userId }
			]
		}).sort({ createdAt: 1 });
		res.json(messages);
	} catch (error) {
		res.status(500).json({ error });
	}
};
