import express from 'express'
import { predictFraud } from '../controllers/fraudprediction.js';

const router = express.Router()

router.post("/predict", predictFraud);

export default router