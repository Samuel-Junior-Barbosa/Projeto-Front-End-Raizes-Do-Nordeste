import axios from "axios";
import api from "../../../Api";


const setAccountOrder = ( user, value ) => {
    return 
    let response = {
        'status' : 90,
        'content' : false
    }
    let alterResponse = api.patch(`http://localhost:3000/accountData/${user}`, { 'buyPoint' : value} )
    response.status = alterResponse.status
    if( response.status === 200 ) {
        response.status = 0
        response.content = true
    } 
        
    return response
}


export default setAccountOrder;