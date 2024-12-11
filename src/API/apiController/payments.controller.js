const Stripe = require('stripe');
require('dotenv').config()
const stripe = Stripe(process.env.STRIPE_KEY);
const crypto = require('crypto');

exports.createPaymentIntent = async (req, res) => {
    try {
        const { amount, currency, description } = req.body;

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

exports.getPaymentDetails = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Payment ID is required' });
        }

        const paymentIntent = await stripe.paymentIntents.retrieve(id);
        res.json(paymentIntent);
    } catch (error) {
        console.error('Error retrieving payment intent:', error);
        res.status(500).json({ error: 'Failed to retrieve payment intent' });
    }
}

exports.verifyPayment = async (req, res) => {
    try {
        const { order_id, payment_id, signature } = req.body;

        if (!order_id || !payment_id || !signature) {
            return res.status(400).json({ error: 'Order ID, payment ID, and signature are required' });
        }

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
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ error: error.message });
    }
}