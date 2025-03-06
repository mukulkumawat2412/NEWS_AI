import {React,useState }from 'react'
import { Link } from 'react-router-dom'
import { motion } from "motion/react"
import {Button} from "@mantine/core"
import { X,Menu } from 'lucide-react'




function Navbar() {

    // const isOpen = false

    const [isOpen,setisOpen] = useState(false)


    const handleClick = ()=>{
        setisOpen(!isOpen)
    }



    return (

        <nav className='h-16 p-2 sticky top-0 bg-white backdrop-blue-md opacity-70 z-50'>

            <div className='flex items-center justify-between mx-6'>

                <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className='text-2xl font-semibold'>NEWSAI</motion.h1>



                <ul className='flex gap-4 hidden md:flex'>
                    {["Home", "Categories", "Channels", "About","Blog"].map((item) => (
                        <motion.li className='hover:text-gray-700' whileHover={{scale:1.1}} transition={{type:"spring",stiffness:100}} key={item}><Link to={`/${item.toLowerCase()}`}>{item}</Link></motion.li>
                    ))}
                </ul>

                <div className='flex space-x-4 items-center justify-center'>
                <Link to={"/login"} className='hidden md:block'><Button variant='white'>Login</Button></Link>
                 <Link to={"/register"} className='hidden md:block'><Button variant='white'>Register</Button></Link>   

                    <button onClick={handleClick}>{isOpen? <X/>:<Menu/>}</button>
                </div>


            </div>



        </nav>


    )
}

export default Navbar

