import { Router } from "express"
import { createMessageController, getChatMessagesController } from "../controllers/messageControllers.js"
import { verifyJWTMiddleware } from "../middlewares/authMiddlewares.js"

const router = Router()

router.post("/", verifyJWTMiddleware, createMessageController)
router.get("/", verifyJWTMiddleware, getChatMessagesController)

export default router