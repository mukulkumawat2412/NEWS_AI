import React, { useState } from 'react'
import {motion} from "motion/react"
import {Mail,Lock,Eye,EyeOff} from 'lucide-react'
import { Button } from '@mantine/core'


function Login() {

    const [openEye,setOpenEye] = useState(false)

    const handleEyeClick = ()=>{
        setOpenEye(!openEye)
    }


  return (

    <div className='bg-gray-100 h-screen flex justify-center items-center'>

    <motion.div initial={{opacity:0, scale:.9}} animate={{opacity:1, scale:1}} transition={{duration:.5}}  className='w-96 bg-white rounded-xl p-4 shadow-md'>
    <h1 className='text-center text-2xl font-bold mb-4'>Welcome Back</h1>

    <form className='space-y-6 w-full'>
    <div className='flex gap-2'>
        <Mail className='text-gray-400'/>
        <input type='email' placeholder='Enter Email' className='w-full focus:outline-none border-b border-gray-200'/>
    </div>



    <div className='flex gap-2 relative '>
        <Lock className='text-gray-400'/>
        <div onClick={handleEyeClick} className=' absolute right-2'>
        {openEye? <Eye/>:<EyeOff/>}
        </div>
       
        <input type={openEye? "text":"password"} placeholder='Enter Password' className='focus:outline-none border-b border-gray-200'/>
    </div>

    <Button className='w-full'>Login</Button>


  
    </form>

    </motion.div>
      
    </div>
  )
}

export default Login
