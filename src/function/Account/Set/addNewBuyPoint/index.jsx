import axios from "axios";
import getAccountData from "../../../Data/Get/getAccountData";
import getBuyPoint from "../../Get/getBuyPoints";
import api from "../../../Api";




const addNewBuyPoint = async ( idUser, value = 1 ) => {

    const response = await getBuyPoint( idUser )
    const accountData = await getAccountData( idUser )
    
    let point = response + value
    //console.log(" ADD BUYPOINT: ", response, point, value)
    await api.patch(
        `/accountData/${accountData.id}`,
        { 'buyPoint' : point }
    )
    return
}


export default addNewBuyPoint;