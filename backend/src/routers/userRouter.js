import { Router } from "express"
import { getUserInfoFromJWTController } from "../controllers/userControllers.js"
import { verifyJWTMiddleware } from "../middlewares/authMiddlewares.js"

const router = Router()

router.get("/user_info", verifyJWTMiddleware, getUserInfoFromJWTController)

export default router