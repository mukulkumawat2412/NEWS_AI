import {React,useState }from 'react'
import { Link } from 'react-router-dom'
import { motion } from "motion/react"
import {Button} from "@mantine/core"
import { X,Menu } from 'lucide-react'
import { useSelector } from 'react-redux'
import ProfileDropdown from './ProfileDropdown'
import LiveSearch from './LiveSearch'




function Navbar() {

   
    const [isOpen,setisOpen] = useState(false)

    const {authenticated} =  useSelector((state=>state.auth))
    const handleClick = ()=>{
        setisOpen(!isOpen)
    }



    return (

        <nav className='h-16 p-2 sticky top-0 bg-white backdrop-blue-md opacity-70 z-50'>

            <div className='flex items-center justify-between mx-6'>

                <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className='text-2xl font-semibold'>NEWSAI</motion.h1>



                <div className="w-1/3">
                    <LiveSearch/>
                </div>






                <ul className='flex gap-4 hidden md:flex'>
                    {["Home", "Categories", "Channels", "About"].map((item) => (
                        <motion.li className='hover:text-gray-700' whileHover={{scale:1.1}} transition={{type:"spring",stiffness:100}} key={item}><Link to={`/${item.toLowerCase()}`}>{item}</Link></motion.li>
                    ))}
                </ul>

                <div className='flex space-x-4 items-center justify-center'>

                    {authenticated && 
                    <div className="flex">

                <Link to={"/login"} className='hidden md:block'><Button variant='white'>Login</Button></Link>
                 <Link to={"/register"} className='hidden md:block'><Button variant='white'>Register</Button></Link>   

                        </div>}



                        {authenticated && <ProfileDropdown/>}




                    <button onClick={handleClick}>{isOpen? <X/>:<Menu/>}</button>
                </div>


            </div>

            {isOpen && <div>
                <ul className='md:hidden flex flex-col gap-4'>
                    {["Home", "Categories", "Channels", "About"].map((item) => (
                        <motion.li className='hover:text-gray-700' whileHover={{scale:1.1}} transition={{type:"spring",stiffness:100}} key={item}><Link to={`/${item.toLowerCase()}`}>{item}</Link></motion.li>
                    ))}
                </ul>
            </div>}



        </nav>


    )
}

export default Navbar

