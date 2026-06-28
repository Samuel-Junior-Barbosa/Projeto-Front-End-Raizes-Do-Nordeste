import api from "../../../Api";




const getPromotionData = async (idPromotion='', listInative = false ) => {

    let response;

    if ( listInative === true ) {
        response = await api.get(
            '/discountCoupon?status=false'
        )
    }
    else if( idPromotion ) {
        response = await api.get(
            `/discountCoupon?promotionId=${idPromotion}`
        )
    }

    else {
        response = await api.get(
            '/discountCoupon?status=true'
        )
    }


    response = response.data

    return response
}

export default getPromotionData;