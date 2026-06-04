import axios from "axios";
import { useEffect } from "react";
import api from "../../../Api";



const getAccountData = async ( idUser = '') => {
    let data = undefined;
    let error = null;
    let response = undefined;

    if( idUser ) {
        response = await api.get(
            `http://localhost:3000/accountData/${idUser}`
        )
    }

    else {
        response = await api.get(
            'http://localhost:3000/accountData'
        )
    }

    data = response.data

    //console.log(" response: ", response)
    //console.log(" idUser: ", idUser)
    return data

}

export default getAccountData;