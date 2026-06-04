import axios from "axios";
import getAccountData from "../../Data/Get/getData";
import getBuyPoint from "../Get/getBuyPoints";
import api from "../../Api";




const addNewBuyPoint = async ( idUser, value = 1 ) => {

    const response = await getBuyPoint( idUser )

    
    let point = response + value
    //console.log(" ADD BUYPOINT: ", response, point, value)
    await api.patch(
        `http://localhost:3000/accountData/${idUser}`,
        { 'buyPoint' : point }
    )
    return
}


export default addNewBuyPoint;