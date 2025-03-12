import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios"



const initialState = {
    loading:false,
    error:null,
    products:[]
}



export const fetchProduct = createAsyncThunk("/fetchProduct",async()=>{
    try {
        const res =   await axios.get("https://fakestoreapi.com/products")

        return res.data
        
    } catch (error) {
        console.log(error)
        
    }



})


const ProductSlice = createSlice({
    name:"Product",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(fetchProduct.pending,(state)=>{
            state.loading = true

        }).addCase(fetchProduct.fulfilled,(state,action)=>{
            
            state.products = action.payload
           
        })

    }
})



export default ProductSlice.reducer





