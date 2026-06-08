import api from "../../Api"


const getPaymentFormApi = async () => {
    let data = {
        'status' : 90,
        'content' : []

    }
    
    const response = await api.get(
        '/paymentForm'
    )

    data.content = response.data

    return data
}


export default getPaymentFormApi;