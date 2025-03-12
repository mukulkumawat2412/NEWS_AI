import express from "express"
import { newsSummarize } from "../controllers/aiController.js"
const router = express.Router()


router.post("/summarize",newsSummarize)




export default router
