import api from "../../../Api";


const getDiscountCode = async ( discountCode = '') => {
    discountCode = String( discountCode )

    let responseData = await api.get(
        '/discountCoupon'
    )

    responseData = responseData.data

    let response;

    for( let i = 0; i < responseData.length; i ++ ) {
        if( responseData[i].code === discountCode ) {
            response = responseData[i]
        }
    }
    //console.log(" getDiscountCode: ", discountCode, response)
    return response
}

export default getDiscountCode;