import express from 'express'
import { getAllData } from '../controllers/admin.js'
import { isAdmin, isAuthenticated } from '../middlewares/auth.js'

const router = express.Router()

// router.get("/getallinvestors", isAuthenticated,isAdmin, getAllInvesters)
// router.get("/getallstudents",isAuthenticated, isAdmin,getAllStudents)

// router.put("/blockuser",isAuthenticated,isAdmin,blockUser)
// router.put("/verifyuser",isAuthenticated,isAdmin,verifyUsers)

router.get("/getalldata", isAuthenticated, isAdmin, getAllData)

export default router