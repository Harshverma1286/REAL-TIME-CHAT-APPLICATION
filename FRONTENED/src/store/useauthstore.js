import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set)=>({
    authuser:null,

    isCheckingAuth:true,

    isSigningUp:false,

    isLoggingIng:false,

    isUpdatingProfile:false,

    checkauth: async()=>{
        try {
            const res = await axiosInstance.get("/auth/check");

            set({authuser:res.data});

        } catch (error) {
            console.log("Error in checkauth",error);
            set({authuser:null});
        }finally{
            set({isCheckingAuth:false});
        }
    },

    signup: async()=>{
        set({isSigningUp:true});
        try {
            const res = await axiosInstance.post("/auth/signup",data);

            set({authuser:res.data});

            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            set({isSigningUp:false});
        }
    },

    logout: async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authuser:null})
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    login: async(data)=>{
        set({isLoggingIng:true})

        try {
            const res = await axiosInstance.post("/auth/login",data);

            set({authuser:res.data});

            toast.success("logged in successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            set({isLoggingIng:false});
        }
    },

    updateprofile: async(data)=>{
        
    }
}))