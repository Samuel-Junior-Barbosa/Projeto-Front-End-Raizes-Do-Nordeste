import api from "../../../Api";
import getOrder from "../getOrder";
import getOrderData from "../getOrderData";


const getOrderByIdDelivery = async ( idOrder ) => {

    const response = await getOrderData()
    //console.log(" getOrderByIdDelivery: ", response)
    for( let i = 0; i < response.length; i ++ ) {
        if( response[i].id === idOrder ) {
            return response[i]
        }
    }
    
    return null
}

export default getOrderByIdDelivery;