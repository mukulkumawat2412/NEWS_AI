import { Loader, TextInput } from '@mantine/core'
import axios from 'axios'
import { Search } from 'lucide-react'
import React, { useEffect, useState,useRef } from 'react'
import { motion } from 'framer-motion'


function LiveSearch() {

    const [query,setQuery] = useState("")
    const [result,setResult] = useState([])

    const [loading,setLoading] = useState(false)
    const [dropdown,setDropdown] = useState(false)

    const searchRef = useRef()
    console.log(searchRef)

    console.log(query)



    useEffect(() => {
        const handleOutSideClick = (event) => {
          console.log(searchRef.current);
          console.log(!searchRef.current.contains(event.target));
    
          if (searchRef.current && !searchRef.current.contains(event.target)) {
            setDropdown(false);
          }
        };
    
        window.addEventListener('click', handleOutSideClick);
        return () => window.removeEventListener('click', handleOutSideClick);
      }, []);
















    useEffect(()=>{

        if(query.length < 1){
            setResult([])
            setDropdown(false)
            return
        }





        const fetchData =  async()=>{
            setLoading(true)
            setDropdown(true)
            try {
                const res =  await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=ce768252cadf41288180b08569a9f12d`)


                setResult(res.data.articles)
                
                console.log(res.data)
                setLoading(false)
            } 
            
            catch (error) {
                console.log(error) 
                setLoading(false)  
             
            }
        }

       const timeout = setTimeout( fetchData(),1000)
       return ()=> clearTimeout(timeout)

    
    },[query])


    console.log(result)


  return (
    <motion.div initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} transition={{duration:.5}} className='relative rounded-md' ref={searchRef}>
    <TextInput onChange={(e)=>{setQuery(e.target.value)}} radius={10} placeholder='Search' leftSection={<Search size={16}/>}></TextInput>
      

    {dropdown && <div className='absolute p-2 max-h-[300px] overflow-y-scroll mt-2 bg-white w-full shadow rounded-sm'>

{loading ?<div className='flex justify-center  px-4 py-8 items-center gap-4'>

    <p><Loader size={20}/></p>
    <p>searching</p>
    

    </div>:(

        result.length >=0 ? <div className='flex gap-3 flex-col'>

        {result?.map((d)=>(
            <a href={d.url} target="_blank" className='flex rounded-md items-center gap-4 hover:bg-gray-200 p-1 cursor-pointer '>
                <img className='h-16 w-16 object-cover' src={d.urlToImage}/>
                <p>{d.title}</p>
            </a>
        ))}

        </div> : <p>No results found</p>
    )}

</div>

}

    

    </motion.div>
  )
}

export default LiveSearch
