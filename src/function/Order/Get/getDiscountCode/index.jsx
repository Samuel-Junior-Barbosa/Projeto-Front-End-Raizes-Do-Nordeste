import api from "../../../Api";


const getDiscountCode = async ( discountCode ) => {

    const response = await api.get(
        `/discountCoupon?code=${discountCode}`
    )
    //console.log(" getDiscountCode: ", response.data)
    return response.data[0]
}

export default getDiscountCode;