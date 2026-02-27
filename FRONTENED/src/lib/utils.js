export function formatMessageTime(data){
    return new Date(date).toLocaleDateString("en-us",{
        hour:"2-Digit",
        minute:"2-digit",
        hour12:false
    })
}