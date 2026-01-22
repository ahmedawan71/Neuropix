import express from 'express'
import { createCheckoutSession } from '../controllers/paymentController.js'
import userAuth from '../middleware/auth.js'

const paymentRouter = express.Router()

paymentRouter.post('/checkout', userAuth, createCheckoutSession)

export default paymentRouter;
