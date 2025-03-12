import express from "express"
import { googleLogin, login ,Register,verify} from "../controllers/authController.js"
import verifyToken from "../middleware/verifyToken.js"
const router = express.Router()




router.post("/signup",Register)
router.post("/login",login)
router.get("/verify", verifyToken, verify)
router.post("/google",googleLogin)





export default router;