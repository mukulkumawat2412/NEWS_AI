import User from "../models/User.js";
import axios from "axios"
import News from "../models/News.js";




export const Preferences = async(req,res)=>{
    try {
        const {id} = req.params

        // const req = {
        //     body:{
        //         preferences:"Technology"
        //     }
        // }
        const {preferences} = req.body
        console.log(preferences)

        const user =  await User.findById(id) 
        console.log(user)

        user.preferences = [...user.preferences, ...preferences]
        await user.save()

        res.status(200).json({message:"preferences save Successfully"})

        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }

}




export const fetchByNewsCategory = async(req,res)=>{
    const {category} = req.params

    const {page=6} = req.query
    const pageSize = 10
    
    try {
        

        const response = await axios.get(`https://newsapi.org/v2/top-headlines?category=${category}&language=en&pageSize=${pageSize}&page=${page}&apiKey=${process.env.NEWS_API_KEY}`)
        
        console.log(response.data)
        

        if(response.data){
           return res.status(200).json({length:response.data.articles.length ,news:response.data.articles,
            nextPage:response.data.articles.length === pageSize ? Number(page) +1 : null
           })
        }

       

    } catch (error) {
        
    }

}



export const fetchAllNews = async(req,res)=>{

    console.log(req.query)

    const {limit=20, page =1,keyword  } = req.query

    const query = keyword ? {
         $or : [{title: {$regex: keyword, $options: 'i'}}, {content:{$regex: keyword, $options:'i'}},

            {description: {$regex: keyword, $options: 'i'}}, {author:{$regex:keyword, $options: 'i'}},
            {url: {$regex: keyword, $options: 'i'}}
         ]
    } :{}



    try {
        
        const news = await News.find(query).sort({createdAt:-1}).limit(Number(limit)).skip((page-1)*limit)
        
        if(!news){

            return res.status(400).json({message:"no news found"})

        }

        const totalCount = await News.countDocuments(query) 




        res.status(200).json({totalCount,totalPages:Math.ceil(totalCount/limit), length:news.length,data:news})
        
    } catch (error) {
        
    }
}