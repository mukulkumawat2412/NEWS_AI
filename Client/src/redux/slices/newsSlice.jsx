import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { getCookie } from "../../utils/utils.js";


const initialState = {
    loading:false,
    data:null,
    error:null,
    news:[],
    totalPages:0,
    totalCount:0,
    totalItems:0

}



const id = getCookie("id")

export const setPreferences = createAsyncThunk("/preference",async(newsData,{rejectWithValue})=>{
    
    try {
        const res =   await axios.post(`${import.meta.env.VITE_API_URL}/api/preference/${id}`,newsData)

        console.log((res.data))
           return res.data
    } catch (error) {
        return rejectWithValue(error)
    }

})








export const fetchAllNews = createAsyncThunk("/fetchallnews",async({currentPage,search},{rejectWithValue})=>{
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/news?page=${currentPage}&keyword=${search}`)
    // console.log(response)
    return response.data
   
    
    
  }
   catch (error) {return rejectWithValue(error.response?.data || 'Something went wrong');
  }

  
})


















const NewsSlice = createSlice({
    name:"news",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(setPreferences.pending,(state)=>{
            state.loading = true

        }).addCase(setPreferences.fulfilled,(state)=>{
            state.loading = false

        }).addCase(fetchAllNews.pending,(state)=>{
            state.loading = true

          }).addCase(fetchAllNews.fulfilled,(state,action)=>{
            state.loading = false,
            // console.log(action.payload)
            state.totalPages = action.payload.totalPages,
            state.news = action.payload.data,
            state.totalCount = action.payload.totalCount,
            state.totalItems = action.payload.length

          })
    }
})








export default NewsSlice.reducer


