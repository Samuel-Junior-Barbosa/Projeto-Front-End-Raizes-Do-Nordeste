import api from "../../../Api";
import getLastPromotionId from "../../Get/getLastPromotionId";




const createPromotionDiscount = async( promotionCode, status, promotionType, promotionValue ) => {
    if ( status === 'false') {
        status = false
    }

    else if( status === 'true' ) {
        status = true
    }
    
    promotionValue = Number( promotionValue )

    let lastIdpromotion = await getLastPromotionId()
    
    const newIdPromotion = Number(lastIdpromotion) + 1
    //console.log(" lastIdpromotion: ", lastIdpromotion)
    //console.log(" newIdPromotion: ", newIdPromotion)

    let createData = {
        'code' : promotionCode,
        'percentage' : 0,
        'moneyDiscount' : 0,
        'promotionId' : newIdPromotion,
        'status' : status
    }
    //console.log(" Promotion Value: ", promotionValue)
    if( promotionType === 1) {
        createData['moneyDiscount'] = promotionValue
    }
    else if( promotionType === 0) {
        createData['percentage'] = promotionValue
    }
    //console.log(" Promotion Value: ", promotionType, promotionType === 0
    //console.log(" createData: ", createData)
    
    const response = await api.post(
        `/discountCoupon`, createData
    )

    return response
}

export default createPromotionDiscount;