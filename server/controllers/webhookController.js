import Stripe from "stripe";
import paymentModel from "../models/paymentModel.js";
import userModel from "../models/userModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    try {
      // Idempotency: only move to paid once
      const payment = await paymentModel.findOneAndUpdate(
        { sessionId: session.id, status: { $ne: "paid" } },
        { status: "paid" },
        { new: true }
      );

      if (!payment) {
        return res.json({ received: true });
      }

      const creditsToAdd = Number(payment.credits);
      if (!payment.userId) {
        return res.json({ received: true });
      }

      if (!Number.isFinite(creditsToAdd) || creditsToAdd <= 0) {
        return res.json({ received: true });
      }

      const updatedUser = await userModel.findByIdAndUpdate(
        payment.userId,
        { $inc: { creditBalance: creditsToAdd } },
        { new: true }
      );

      if (updatedUser) {
        console.log(`Credits added to user: ${creditsToAdd}`);
      }

      console.log("Payment marked as PAID:", session.id);
    } catch (dbError) {
      console.error("Database update error:", dbError.message);
    }
  }

  res.json({ received: true });
};
