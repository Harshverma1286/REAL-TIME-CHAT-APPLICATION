import { create } from "zustand";


export const useThemestore = create((set)=>({
    theme:localStorage.getItem("chat-theme" || "light"),
    setTheme: (theme)=>{
        set({theme});
    }
}))