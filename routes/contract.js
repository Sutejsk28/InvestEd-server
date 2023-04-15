import express from 'express'
import {createContract, payContract} from '../controllers/contract.js'

const router = express.Router()

router.post("/create", createContract);
router.post("/paid", payContract)

export default router