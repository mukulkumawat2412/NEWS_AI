
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyAvGV5uz79iUsXULjQOyBYIko-ofxXWcds",
  authDomain: "https://news-ai-rju1.vercel.app",
  projectId: "news-ai-18294",
  storageBucket: "news-ai-18294.firebasestorage.app",
  messagingSenderId: "1038207878485",
  appId: "1:1038207878485:web:953066c33ef37ac8fb5bdc",
  measurementId: "G-FYR51E2QK0"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export const googleAuthProvider = new GoogleAuthProvider()
