import axios from "axios"
const host = window.location.hostname


const api = axios.create({
    baseURL : `https://raizes-do-nordeste-api-1.onrender.com`,
    //baseURL : `http://${host}:3000`,
    //baseURL : "http://localhost:3000",
    
    
    headers : {
        "Content-Type" : "application/json",
        "Cache-Control" : "no-cache",
    }
})

export default api