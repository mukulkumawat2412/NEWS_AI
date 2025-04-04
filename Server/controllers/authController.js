import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import admin from "firebase-admin"



export const Register = async (req, res) => {

    try {

        const { name, email, password } = req.body

        const isAlreadyExist = await User.findOne({ email })
        console.log(isAlreadyExist)

        if (isAlreadyExist) {
            return res.status(404).json({
                message: "User already Register, Please login"
            })
        }


        const hashedPassword = await bcrypt.hash(password, 12)


        const newUser = await User.create({ name, email, password: hashedPassword })

        return res.status(201).json({ message: "User Successfully register", data: newUser })



    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }

}




export const verify = async(req,res)=>{

    console.log(req.user)

    if(!req.user){

    }
    

    res.status(200).json({
        authenticated:true,
        id:req.user.id,
        name:req.user.name,
        email:req.user.email
    })


}

















export const login = async(req,res) => {
    try {
        const {email,password} = req.body

   const user =   await  User.findOne({email})

   if(!user){
    res.status(400).json({
        message:"user is not registered"
    })
   }

  const isMatchPassword =  await bcrypt.compare(password,user.password)

  if(!isMatchPassword){
    res.status(401).json({message:"Password does not match, Please correct Password"})
  }


    const token = jwt.sign({id:user._id,name:user.name,email:user.email},process.env.JWT_SECRET ||"Hello_this_is_string",{expiresIn:"1d"})

    res.cookie('token',token,{
        httpOnly:true,
        maxAge:15*24*60,
        sameSite:'none',
        secure:true
        

    })

    res.status(200).json({
        preferences:user.preferences,
        message:"Login successful"
    })




    } catch (error) {
        
    }


}



export const googleLogin = async (req, res) => {
    try {
        const { IdToken } = req.body;

        if (!IdToken) {
            return res.status(400).json({ error: "IdToken is required" });
        }

        const decodedToken = await admin.auth().verifyIdToken(IdToken);
        console.log(decodedToken);

        let user = await User.findOne({ email: decodedToken.email });

        if (!user) {
            user = new User({
                name: decodedToken.name,
                email: decodedToken.email,
            });
            await user.save();
        }

        const token = jwt.sign(
            { id: user._id, name: user.name, email: user.email },
            process.env.JWT_SECRET || "Hello_this_is_string",
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({
            authenticated: true,
            id: user._id,
            email: user.email,
            name: user.name,
            preferences: user.preferences || {},
            message: "Login successful",
        });

    } catch (error) {
        console.error("Google Login Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};





