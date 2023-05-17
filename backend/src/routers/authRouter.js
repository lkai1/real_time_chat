import { Router } from "express"
import { registerController, loginController, verifyLoginController } from "../controllers/authControllers.js"

const router = Router()

router.post("/register", registerController)
router.post("/login", loginController)
router.get("/verify_login", verifyLoginController)

export default router