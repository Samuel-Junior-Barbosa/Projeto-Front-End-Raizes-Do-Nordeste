import axios from "axios";
import getAccountData from "../../Data/Get/getData";
import getBuyPoint from "../Get/getBuyPoints";
import api from "../../Api";
import getFidelityPromo from "../../Buy/getFidelityPromo";
import removeBuyPoint from "../removeBuyPoint";




const useFidelityPromotion = async ( idUser, fidelityCode ) => {

    const response = await getBuyPoint( idUser )
    const promotion = await getFidelityPromo( fidelityCode )

    //console.log(" use fidelity promotion: ", idUser, fidelityCode, response, promotion)
    await removeBuyPoint( idUser, promotion.buyPoint )
    return true
}


export default useFidelityPromotion;