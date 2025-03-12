import React, { useEffect, useState } from 'react'
import {motion} from "motion/react"
import {Mail,Lock,Eye,EyeOff} from 'lucide-react'
import { Button, Loader } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useDispatch, useSelector} from "react-redux"
import { login } from '../redux/slices/authSlice.jsx'
import GoogleIcon from '../Comp/GoogleIcon.jsx'
import { signInWithGoogle } from '../redux/slices/authSlice.jsx'




const loginSchema = z.object({
  email:z.string().min(1,{message:"This field has to be filled"}).email("This is not a valid email"),
  password:z.string().min(1,{message:"Password is required"})
})









function Login() {


    const [openEye,setOpenEye] = useState(false)

    const {register,handleSubmit,formState:{errors}} = useForm({
      resolver:zodResolver(loginSchema)
    })
 
    
   
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {authenticated,preferences,loading} = useSelector((state)=>state.auth) 
    console.log(authenticated)
    console.log(preferences)



    const handleEyeClick = ()=>{
        setOpenEye(!openEye)
    }


    const onSubmit = (data)=>{
      dispatch(login(data))


     

    }




    useEffect(()=>{
      if(authenticated && preferences.length > 0){

        navigate("/")

      }else if(authenticated && preferences.length <= 0){
        navigate("/preferences")
      }

    },[authenticated,preferences,navigate])


  



  return (

    <div className='bg-gray-100 h-screen flex justify-center items-center'>

    <motion.div initial={{opacity:0, scale:.9}} animate={{opacity:1, scale:1}} transition={{duration:.5}}  className='w-96 bg-white rounded-xl p-4 shadow-md'>
    <h1 className='text-center text-2xl font-bold mb-4'>Welcome Back</h1>

    <form className='space-y-6 w-full' onSubmit={handleSubmit(onSubmit)}>
    <div className='flex gap-2 border-b border-gray-200 items-center'>
        <Mail className='text-gray-400' size={20}/>
        <input type='email' {...register('email')} placeholder='Enter Email' className='w-full focus:outline-none border-b border-gray-200'/>

      
    </div>
    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}



    <div className='flex gap-2 relative border-b border-gray-200 items-center'>
        <Lock className='text-gray-400' size={20}/>
        <div onClick={handleEyeClick} className=' absolute right-2'>
        {openEye? <Eye/>:<EyeOff/>}
        </div>
       
        <input type={openEye? "text":"password"} {...register('password')} placeholder='Enter Password' className='focus:outline-none border-b border-gray-200'/>
        


    </div>

    <Button type='submit' fullWidth className='w-full'>{loading? <Loader size={16} color='white'/>:"Login"}</Button>

    <Button onClick={()=>dispatch(signInWithGoogle())} fullWidth variant='outline' leftSection={<GoogleIcon/>}>Login with Google</Button>

    <p className='text-center text-gray-800'>Don't have account?<Link className='text-sky-500' to={"/register"}>Signup</Link></p>


  
    </form>

    </motion.div>
      
    </div>
  )
}

export default Login
