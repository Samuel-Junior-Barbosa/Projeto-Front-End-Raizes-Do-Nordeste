import api from "../../../Api";




const alterPromotionDiscount = async( promotionId, promotionCode, status, promotionType, promotionValue ) => {
    if ( status === 'false') {
        status = false
    }

    else if( status === 'true' ) {
        status = true
    }
    
    //console.log(" ALTER PROMOTION ID: ", promotionId)
    let promotion = await api.get(
        `/discountCoupon?promotionId=${promotionId}`
    )

    //console.log(" promotionData: ", promotion)
    
    promotion = promotion.data[0]
    let idPromotion = promotion.id
    
    let alterationData = {
        'code' : promotionCode,
        'percentage' : 0,
        'moneyDiscount' : 0,
        'promotionId' : promotionId,
        'status' : status
    }
    //console.log(" Promotion Value: ", promotionValue)
    if( promotionType === 1) {
        alterationData['moneyDiscount'] = promotionValue
    }
    else if( promotionType === 0) {
        alterationData['percentage'] = promotionValue
    }
    //console.log(" Promotion Value: ", promotionType, promotionType === 0)

    //console.log(" promotionAlterData: ", alterationData)

    const response = await api.patch(
        `/discountCoupon/${idPromotion}`, alterationData
    )

    return response
}

export default alterPromotionDiscount;