import {configureStore} from "@reduxjs/toolkit"
import ProductReducer from "../productSlice.jsx"
import AuthReducer from "../authSlice.jsx"
import NewsReducer from "../newsSlice.jsx"
import ReadingHistoryReducer from "../ReadingHistory.jsx"
import BookMarkReducer from "../bookmarkSlice.jsx"
import SummaryReducer from "../SummerySlice.jsx"


const store =  configureStore({

    reducer:{
        
        Product:ProductReducer,
        auth:AuthReducer,
        news:NewsReducer,
        ReadingHistory:ReadingHistoryReducer,
        Bookmark:BookMarkReducer,
        Summary:SummaryReducer

    }

})



export default store