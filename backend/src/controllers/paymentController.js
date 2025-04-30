const processPayment = async (req, res) => {
    try {
        const { amount, method } = req.body;
        // Payment processing here (e.g., Razorpay, Stripe)
        

        res.json({ success: true, message: "Payment successful" });
    } catch (error) {
        res.status(500).json({ message: "Payment failed" });
    }
};

module.exports = { processPayment };
