import express from 'express'
import { isAuthenticated, isInvesterAuthenticated } from '../middlewares/auth.js'
import { acceptConnection, getMyProfile, getContract, getAllInvester, register, requestConnection } from '../controllers/invester.js'

const router = express.Router()

router.post("/register", register)
router.get("/getprofile",isInvesterAuthenticated,getMyProfile)
//router.post("/requestverification", isInvesterAuthenticated, requestVerification )
router.post("/requestconnection", isInvesterAuthenticated, requestConnection)
router.get("/viewContract", isInvesterAuthenticated,getContract)

router.get("/getallinvestors", isInvesterAuthenticated, getAllInvester  )

//router.post("/createcontract",isInvesterAuthenticated,createContract)
router.post("/acceptconnection", isInvesterAuthenticated, acceptConnection)

//router.route("/forgotpassword").post(forgotPassword).put(resetPassword)

export default router;