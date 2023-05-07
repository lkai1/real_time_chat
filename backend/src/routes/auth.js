import { Router } from "express"
import { register, login, verifyLogin } from "../controllers/auth.js"

const router = Router()

router.post("/register", register)
router.post("/login", login)
router.get("/verify_login", verifyLogin)

export default router