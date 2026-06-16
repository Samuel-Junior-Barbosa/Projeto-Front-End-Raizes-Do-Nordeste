import axios from "axios";
import getAccountData from "/src/function/Data/Get/getAccountData";
import getBuyPoint from "/src/function/Account/Get/getBuyPoints";
import api from "/src/function/Api";
import getFidelityPromo from "/src/function/Buy/getFidelityPromo";
import removeBuyPoint from "/src/function/Account/Set/removeBuyPoint";




const useFidelityPromotion = async ( idUser, fidelityCode ) => {

    const response = await getBuyPoint( idUser )
    const promotion = await getFidelityPromo( fidelityCode )

    //console.log(" use fidelity promotion: ", idUser, fidelityCode, response, promotion)
    await removeBuyPoint( idUser, promotion.buyPoint )
    return true
}


export default useFidelityPromotion;