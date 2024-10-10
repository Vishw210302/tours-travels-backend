const Stripe = require('stripe');
require('dotenv').config()
const stripe = Stripe(process.env.STRIPE_KEY);

exports.createPaymentIntent = async (req, res) => {

    const { amount, currency, description } = req.body;

    try {

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            description,
        });

        res.status(200).json({
            paymentIntent,
        });
    } catch (error) {
        console.error('Error creating PaymentIntent:', error);
        res.status(500).json({ error: error.message });
    }
}

exports.veryFyPayment = async (req, res) => {
    const { order_id, payment_id, signature } = req.body;

    const secret = process.env.key_secret;

    const hmac = crypto.createHmac("sha256", secret)

    hmac.update(order_id + "|" + payment_id);

    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === signature) {
        return res.status(200).json({
            success: true,
            message: "Payment verified",
        });
    } else {
        return res.status(400).json({
            success: false,
            message: "Payment not verified"
        })
    }
}