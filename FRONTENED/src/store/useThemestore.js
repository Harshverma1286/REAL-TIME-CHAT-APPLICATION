import { create } from "zustand";


export const useThermestore = create((set)=>({
    theme:localStorage.getItem("chat-theme" || "light"),
    setTheme: (theme)=>{
        set({theme});
    }
}))