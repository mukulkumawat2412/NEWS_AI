import React, { useState } from 'react'
import { motion } from "motion/react"
import { ChevronUp ,CircleCheckBig} from 'lucide-react'
import { Button } from '@mantine/core'
import "./preferences.css"
import {Slide} from "react-awesome-reveal"
import { useSelector,useDispatch } from 'react-redux'
import { setPreferences } from '../redux/slices/newsSlice.jsx'
import { useNavigate } from 'react-router-dom'

function Preferences() {

    

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [selectedCategory,setSelectedCategory] =  useState([])

    const categories = ["Technology", "Sports", "Health", "Entertainment", "Business", "Politics"]





    const toggleCategory = (category)=>{
  
        setSelectedCategory(selectedCategory.includes(category)?selectedCategory.filter((c)=>c!==category):[...selectedCategory,category] )


    }


    const SavePreference = ()=>{
        dispatch(setPreferences({preferences:selectedCategory}))
        navigate("/")
    }



    return (
        <Slide>

       

        <div className='h-screen flex flex-col justify-center items-center '>

            <div>

                <h1 className='text-2xl font-semibold text-gray-800'>Select Interests</h1>

            </div>


            <div className='card p-6 grid mt-6 grid-cols-2 sm:grid-cols-3 gap-4'>


                {categories.map((category) => (
                    <motion.div onClick={()=>toggleCategory(category)} className={` flex justify-center items-center gap-4 cursor-pointer shadow-md rounded-xl text-center px-5 py-2 ${selectedCategory.includes(category)? "bg-blue-500 text-white":"bg-white text-black"}`} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <span>{selectedCategory.includes(category) && <CircleCheckBig />}</span>
                        {category} 
                    </motion.div>

                ))}
                <Button onClick={SavePreference}>Save Preferences</Button>

            </div>


        </div>
        </Slide>
    )
}

export default Preferences
