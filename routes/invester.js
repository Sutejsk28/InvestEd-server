import express from 'express'
import { isAuthenticated, isInvesterAuthenticated } from '../middlewares/auth.js'
import { getMyProfile, requestVerification, sendConnection, getContract, getAllInvester, createContract, invest } from '../controllers/invester.js'

const router = express.Router()

router.get("/getprofile",isInvesterAuthenticated,getMyProfile)
router.post("/requestverification", isInvesterAuthenticated, requestVerification )
router.post("/sendconnection", isInvesterAuthenticated, sendConnection)
router.get("/viewContract", isInvesterAuthenticated,getContract)

router.get("/getallinvestors", isInvesterAuthenticated, getAllInvester  )

router.post("/createcontract",isInvesterAuthenticated,createContract)
router.post("/invest",isInvesterAuthenticated,invest)

//router.route("/forgotpassword").post(forgotPassword).put(resetPassword)

export default router;