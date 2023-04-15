import express from 'express'
import { isAuthenticated, isStudentAuthenticated } from '../middlewares/auth.js'
import { acceptContract, getAllStudents, getStudentContract, getFunds, getGoal, getMyProfile, register, acceptConnection } from '../controllers/student.js'

const router = express.Router()

router.post("/register", register)

router.get("/getprofile",isStudentAuthenticated,getMyProfile)
router.get("/getallstudents",getAllStudents)

router.get("/getstudentcontracts",isStudentAuthenticated,getStudentContract)
router.post("/acceptcontract",isStudentAuthenticated,acceptContract)
router.get("/getgoals",isStudentAuthenticated,getGoal)
router.post("/getFunds",isStudentAuthenticated,getFunds)
router.post("/acceptconnection", isStudentAuthenticated, acceptConnection)

router.post("withdrawfunds",isStudentAuthenticated, )

export default router;