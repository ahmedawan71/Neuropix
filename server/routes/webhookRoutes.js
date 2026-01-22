import express from "express";
import bodyParser from "body-parser";
import { handleStripeWebhook } from "../controllers/webhookController.js";

const router = express.Router();

router.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  handleStripeWebhook
);

export default router;
