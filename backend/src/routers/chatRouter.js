import { Router } from "express"
import { verifyJWTMiddleware } from "../middlewares/authMiddlewares.js"
import { createPrivateChatController, createGroupChatController, getUserChatsController } from "../controllers/chatControllers.js"

const router = Router()

router.post("/private", verifyJWTMiddleware, createPrivateChatController)
router.post("/group", verifyJWTMiddleware, createGroupChatController)
router.get("/", verifyJWTMiddleware, getUserChatsController)

export default router