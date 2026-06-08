import api from "../../../Api";


const getOrderData = async () => {

    const response = await api.get(
        '/orders'
    )
    //console.log(" getOrderData: ", response)
    //console.log(" getOrderData data: ", response.data)
    return response.data
}

export default getOrderData;