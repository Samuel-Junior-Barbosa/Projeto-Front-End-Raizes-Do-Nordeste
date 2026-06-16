import axios from "axios";
import getAccountData from "../../../Data/Get/getAccountData";



const getIdUser = async ( username ) => {
    const response = await getAccountData()
    
    let idUser = null
    for( let i = 0; i < response.length; i ++ ) {
        if( response[i].name == username ) {
            idUser = response[i].accountId
        }
    }


    //console.log(" id cliente: ", username, idUser, response)
    return idUser
}


export default getIdUser;