import { Router } from "express"
import { getUserInfoFromJWT } from "../controllers/user.js"
import { verifyJWT } from "../controllers/auth.js"

const router = Router()

router.get("/user_info", verifyJWT, getUserInfoFromJWT)

export default router