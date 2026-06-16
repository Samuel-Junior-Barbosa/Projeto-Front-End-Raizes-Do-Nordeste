import api from "../../../Api";
import getOrder from "../getOrder";
import getOrderData from "../getOrderData";


const getOrderByIdDelivery = async ( idOrder ) => {

    let response;

    response = await api.get(
        `/orders?id_pedido=${idOrder}`
    )

    return response.data[0]


}

export default getOrderByIdDelivery;