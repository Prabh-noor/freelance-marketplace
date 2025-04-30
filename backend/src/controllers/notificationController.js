const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {
	try {
		const notifications = await Notification.find({ userId: req.user.userId }).sort({ createdAt: -1 });
		res.json(notifications);
	} catch (error) {
		res.status(500).json({ error });
	}
};

exports.markAsRead = async (req, res) => {
	try {
		const { id } = req.params;
		await Notification.findByIdAndUpdate(id, { read: true });
		res.json({ message: "Notification marked as read" });
	} catch (error) {
		res.status(500).json({ error });
	}
};
