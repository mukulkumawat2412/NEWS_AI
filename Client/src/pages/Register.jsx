import { motion } from 'framer-motion';
import { Button } from '@mantine/core';
import { Mail, Lock, User} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useDispatch,useSelector } from 'react-redux';

import { Loader } from '@mantine/core';
import { Register } from '../redux/slices/authSlice';
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"


const passwordSchema = z.string().min(8,"password should be atleast 8 characters long").superRefine((value,ctx)=>{
  if(!/[A-Z]/.test((value))){
    ctx.addIssue({
    code:z.ZodIssueCode.custom,
    message:`Must required atleast one uppercase`,
    })
  }


  if(!/[a-z]/.test((value))){
    ctx.addIssue({
    code:z.ZodIssueCode.custom,
    message:`Must required atleast one lowercase`,
    })
  }





  if(!/[0-9]/.test((value))){
    ctx.addIssue({
    code:z.ZodIssueCode.custom,
    message:`Must required atleast one uppercase`,
    })
  }












})


const RegisterSchema = z.object({
  name:z.string().min(1,{message:"name should contain at least 1 character"}),
  email:z.string().min(1,{message:"this filed has to be filled"}).email("this is not a valid email"),
  password:passwordSchema,
  confirmPassword:z.string()
}).refine((data)=>data.password === data.confirmPassword,{
  message:"password do not match",
  path:[
    "confirmPassword"
  ]
})






const Signup = () => {

    const dispatch = useDispatch()

    const {loading} = useSelector((state)=>state.auth)

    const {register,handleSubmit,formState:{errors}} = useForm({
      resolver:zodResolver(RegisterSchema)
    })



    const onSubmit =(data)=>{
        console.log(data)
        dispatch(Register(data))

    }

 


 
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <motion.div
        className="w-full max-w-md p-8 bg-white shadow-xl rounded-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Create an Account
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} >
          <div className="relative flex items-center pb-2 border-b border-gray-300">
            <User className="text-gray-400 mr-2" size={20} />
            <input type="text" {...register('name')} name="name" placeholder="Full Name" className="w-full bg-transparent focus:outline-none border-none"/></div>
        
          {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
          <div className="relative flex items-center pb-2 border-b border-gray-300">
            <Mail className="text-gray-400 mr-2" size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
                {...register('email')}
              className="w-full bg-transparent focus:outline-none border-none"
            />
          </div>
          {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
       

          <div className="relative flex items-center pb-2 border-b border-gray-300">
            <Lock className="text-gray-400 mr-2" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
             {...register('password')}
            />
          </div>
          {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
        
          <div className="relative flex items-center pb-2 border-b border-gray-300">
            <Lock className="text-gray-400 mr-2" size={20} />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
            {...register('confirmPassword')}
            />
          </div>
        
          {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
          <Button
            type="submit"
            fullWidth
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
           {loading ? <Loader color='white' size={16}/>:"Signup"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 font-medium">
            Sign In
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
