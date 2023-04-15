import express from 'express'
import { blockUser, getInvesters, getStudents, verifyUsers } from '../controllers/admin.js'
import { isAdmin, isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

router.get("/getinvestors",isAuthenticated,getInvesters)
router.get("/getstudents",isAuthenticated,getStudents)

router.put("/blockuser",isAuthenticated,isAdmin,blockUser)
router.put("/verifyuser",isAuthenticated,isAdmin,verifyUsers)

export default router