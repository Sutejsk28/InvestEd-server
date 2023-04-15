import express from 'express'
import {createContract} from '../controllers/contract.js'

const router = express.Router()

router.post("/create", createContract);

export default router