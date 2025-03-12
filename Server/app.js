import express from "express";
import dotenv from "dotenv";
import dbConnect from "../Server/config/db.js";
import UserRoute from "./Routes/userRoute.js";
import NewsRoute from "./Routes/newsRoute.js";
import AiRoute from "./Routes/aiRoute.js";
import ReadingHistoryRoute from "./Routes/readingHIstoryRoute.js"
import BookmarksRoute from "./Routes/bookmarksRoute.js"
import cors from "cors";
import cookieParser from "cookie-parser";
import axios from "axios";
import News from "./models/News.js";
import cron from "node-cron";
import admin from "firebase-admin";
import fs from "fs";



const serviceAccount = JSON.parse(
  fs.readFileSync("./Key/news-ai-18294-firebase-adminsdk-fbsvc-425971e2f7.json", "utf8")
);

const app = express();

dotenv.config();
dbConnect();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const countries = ["us", "uk", "fr", "in", "it"];
const categories = ["health", "science", "sports", "entertainment", "politics", "business"];

const fetcthNewsAndStore = async () => {
  for (let country of countries) {
    for (let category of categories) {
      const { data } = await axios.get(
        `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=${process.env.NEWS_API_KEY}`
      );

      console.log(data);

      if (data.articles && data.articles.length > 0) {
        const exist = await News.findOne({ title: data.articles.title });

        if (!exist) {
          const newsData = await News.create(data.articles);
          console.log(newsData);
        } else {
          console.log(`Already exists ${data.articles.title}`);
        }
      }
    }
  }
};



cron.schedule("*/15 * * * *", fetcthNewsAndStore);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

app.use("/auth", UserRoute);
app.use("/api", NewsRoute);
app.use("/api", AiRoute);
app.use("/api",ReadingHistoryRoute)
app.use("/api",BookmarksRoute)


app.listen(process.env.PORT, () => {
  console.log(`server is running on port :-${process.env.PORT}`);
});