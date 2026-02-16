import express from "express"
const webRouter = express.Router();
import handleStripeWebhook  from "../Controller/WebhookController.js";

webRouter.post("/webhook", express.raw({type: 'application/json'}), handleStripeWebhook);

export default webRouter;