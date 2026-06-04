import api from "../../../Api";


const getDiscountCode = async ( discountCode ) => {

    const response = await api.get(
        `http://localhost:3000/discountCoupon?code=${discountCode}`
    )
    //console.log(" getDiscountCode: ", response.data)
    return response.data[0]
}

export default getDiscountCode;