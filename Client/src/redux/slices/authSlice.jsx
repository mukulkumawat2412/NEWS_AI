import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";
import { removeCookie, setCookie, getCookie } from "../../utils/utils.js";
import { auth, googleAuthProvider } from "../../config/Firebase.js";
import { signInWithPopup } from "firebase/auth";




const initialState = {
    loading: false,
    authenticated: getCookie("isAuthenticated") || false,
    name: getCookie("name") || null,
    id: getCookie("id") || null,
    preferences: []
}


export const Register = createAsyncThunk("/signup", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, data)

        return res.data


    } catch (error) {
        return rejectWithValue(error)

    }
})



export const login = createAsyncThunk("/login", async (loginData, { rejectWithValue }) => {
    try {
        const res = await axios.post("https://news-ai-chi.vercel.app/auth/login", loginData, { withCredentials: true })


        const verifyres = await axios.get(`${import.meta.env.VITE_API_URL}/auth/verify`, { withCredentials: true })


        return { ...res.data, ...verifyres.data }

    } catch (error) {
        return rejectWithValue(error)

    }

})






export const signInWithGoogle = createAsyncThunk("/google-login", async () => {
    try {
        const result = await signInWithPopup(auth, googleAuthProvider)

        console.log(result.user.getIdToken())

        const IdToken = await result.user.getIdToken()
        console.log(IdToken)

        const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/google`, { IdToken })

        return res.data


    } catch (error) {
        console.log(error)

    }



})









const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signout: (state) => {
            state.authenticated = false,
                state.id = null,
                state.name = null,
                removeCookie("isAuthenticated")
            removeCookie("name")
            removeCookie("id")

        }
    },
    extraReducers: (builder) => {
        builder.addCase(Register.pending, (state) => {
            state.loading = true

        }).addCase(Register.fulfilled, (state, action) => {
            state.loading = false
            console.log(action.payload.message)
            toast.success(action.payload.message)

        }).addCase(Register.rejected, (state, action) => {
            console.log(action.payload)
            toast.error(action.payload.response.data.message)

        }).addCase(login.pending, (state) => {
            state.loading = true

        }).addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.authenticated = action.payload.authenticated
            state.name = action.payload.name
            state.id = action.payload.id
            state.preferences = action.payload.preferences ? [...action.payload.preferences] : [];



            setCookie("isAuthenticated", action.payload.authenticated)
            setCookie("email", action.payload.email)

            setCookie("name", action.payload.name)

            setCookie("id", action.payload.id)

            console.log(action.payload)
            toast.success(action.payload.message)


        }).addCase(login.rejected, (state, action) => {
            state.loading = false
            toast.error(action.payload.response.data.message)


        }).addCase(signInWithGoogle.pending, (state) => {
            // state.loading = true

        }).addCase(signInWithGoogle.fulfilled, (state, action) => {
            state.loading = false
            state.authenticated = action.payload.authenticated
            state.name = action.payload.name
            state.id = action.payload.id
            state.preferences = action.payload.preferences;
            localStorage.setItem(
                'preferences',
                JSON.stringify(action.payload.preferences)
            );
            console.log(action.payload);
            toast.success(action.payload.message);

            setCookie("isAuthenticated", action.payload.authenticated)
            setCookie("email", action.payload.email)

            setCookie("name", action.payload.name)

            setCookie("id", action.payload.id)

            console.log(action.payload)
           

        })

    }

})






export default authSlice.reducer
export const { signout } = authSlice.actions