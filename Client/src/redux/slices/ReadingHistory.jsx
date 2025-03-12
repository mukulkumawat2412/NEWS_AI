
import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import { getCookie } from "../../utils/utils.js"



const initialState = {
    loading:false,
    readingHistory:[]


}







export const addReadingHistory = createAsyncThunk("/reading-history",async(data,{rejectWithValue})=>{

    const id = getCookie("id")


    try {
        

        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/${id}/reading-history`,data)
       return res.data
    } catch (error) {
       return rejectWithValue(error.message)
    }

})




export const getReadingHistory = createAsyncThunk("/getreading-history",async(_,{rejectWithValue})=>{

    const id = getCookie("id")

    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/${id}/reading-history`)

       return res.data
        
    } catch (error) {
        rejectWithValue(error.message)
    }

})











const ReadingHistorySlice = createSlice({
    name: 'readingHistory',
    initialState,

    extraReducers: (builder) => {
        builder
        .addCase(addReadingHistory.pending, (state) => {
            state.loading = true;
        })
        .addCase(addReadingHistory.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload);
         
        })
        .addCase(addReadingHistory.rejected, (state, action) => {
            state.loading = false;
          
        })
        .addCase(getReadingHistory.pending, (state) => {
         
        })
        .addCase(getReadingHistory.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload);
            state.readingHistory = action.payload.data
       
        })
        .addCase(getReadingHistory.rejected, (state, action) => {
            state.loading = false;
         
        });
    }
});







export default ReadingHistorySlice.reducer
