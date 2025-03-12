import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getCookie } from "../../utils/utils.js";



const initialState = {
    loading:false,
    bookmarks:[]

}





export const addBookmark = createAsyncThunk("/addBookmarks",async(data,{rejectWithValue})=>{

    const id = getCookie("id")

    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/${id}/bookmarks`,data)

        return res.data
        
    } catch (error) {
       return rejectWithValue(error.message)
    }

})



export const getBookmarks = createAsyncThunk("getBookmarks",async(_,{rejectWithValue})=>{

    const id = getCookie("id")

    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/${id}/bookmarks`)

        return res.data
        
    } catch (error) {
        
        return rejectWithValue(error.message)
    }

})
















export const removeBookmark = createAsyncThunk("/removeBookmarks",async(articleUrl,{rejectWithValue})=>{

    const id = getCookie("id")

    try {
        const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/${id}/bookmarks`,{articleUrl})

       return res.data
        
    } catch (error) {
        return rejectWithValue(error.message)
        
    }

})






const BookmarkSlice = createSlice({
    name:"bookmarks",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(addBookmark.pending,(state)=>{
            state.loading = false

        }).addCase(addBookmark.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.loading = false
        }).addCase(addBookmark.rejected,(state,action)=>{
            state.loading = false
        }).addCase(removeBookmark.pending,(state)=>{
            state.loading = true
        }).addCase(removeBookmark.fulfilled,(state,action)=>{
            state.loading = false,
            console.log(action.payload)
            state.bookmarks = action.payload
        }).addCase(removeBookmark.rejected,(state,action)=>{
            state.loading = false,
            console.log(action.payload)
        }).addCase(getBookmarks.pending,(state)=>{
            state.loading = true
        }).addCase(getBookmarks.fulfilled,(state,action)=>{
            state.loading = false,
            console.log(action.payload)
            state.bookmarks = action.payload.data

        })
    }
    
})




export default BookmarkSlice.reducer