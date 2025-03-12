import express from "express"
import { fetchAllNews, fetchByNewsCategory, Preferences } from "../controllers/newsController.js";

const router = express.Router()


router.post("/preference/:id",Preferences)
router.get("/news/:category",fetchByNewsCategory)
router.get("/news",fetchAllNews)




export default router;