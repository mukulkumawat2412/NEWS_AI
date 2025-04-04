import jwt from "jsonwebtoken"



 const verifyToken = (req,res,next)=>{
     console.log(req)
    
    const token = req.cookies.token
   //   console.log(req.cookies.token)

    if(!token){
       return res.status(401).json({authenticated:false, message:"No token found"})
       
    }


    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    //console.log(decoded)

    req.user = decoded

    console.log(req.user)

   //  const req = {
   //    user:{
   //       _id:"ad3fk29j929jdf92232",
   //       name:"mukul"
   //    }
   //  }
    


    next()

   



   

}



export default verifyToken