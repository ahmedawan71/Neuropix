import 'dotenv/config'
import Stripe from "stripe";
import paymentModel from "../models/paymentModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const createCheckoutSession = async (req, res) => {
    try {
        const { planId, price, credits } = req.body;
        const userId = req.userId; // From auth middleware

        if (!userId) {
            return res.status(401).json({ error: "Not authorized" });
        }

        if (!planId || !price || !credits) {
            return res.status(400).json({ error: "Missing required fields: planId, price, credits" });
        }

        const numericPrice = Number(price);
        const numericCredits = Number(credits);

        if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
            return res.status(400).json({ error: "Invalid price" });
        }

        if (!Number.isFinite(numericCredits) || numericCredits <= 0) {
            return res.status(400).json({ error: "Invalid credits" });
        }

        // Convert price to cents for Stripe
        const unitAmount = Math.round(numericPrice * 100);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            line_items: [{
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: `${planId} Plan - ${numericCredits} Credits`,
                        description: `${numericCredits} credits for AI image generation`,
                    },
                    unit_amount: unitAmount,
                },
                quantity: 1,
            }],
            success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/success?planId=${planId}&credits=${numericCredits}`,
            cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/cancel`,
        })
        
        const createdPayment = await paymentModel.create({
            userId: userId,
            sessionId: session.id,
            planId: planId,
            credits: numericCredits,
            amount: session.amount_total,
            currency: session.currency,
            status: session.payment_status, 
        });
        
        res.json({ url: session.url })
    
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};