import express from 'express'
import { login, logout } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router()

router.post("/login",login)
router.get("/logout", isAuthenticated, logout )

export default router;