import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    planId: String,
    credits: Number,
    amount: Number,
    currency: String,
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const paymentModel = mongoose.models.transaction || mongoose.model("transaction", paymentSchema);

export default paymentModel;