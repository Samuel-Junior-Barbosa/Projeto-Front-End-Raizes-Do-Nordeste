import axios from "axios"
const host = window.location.hostname


const api = axios.create({
    //baseURL : "http://localhost:3000",
    baseURL : `http://${host}:3000`,
    headers : {
        "Content-Type" : "application/json",
        "Cache-Control" : "no-cache",
    }
})

export default api