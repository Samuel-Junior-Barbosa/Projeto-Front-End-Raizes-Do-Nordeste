import axios from "axios";
import getLastOrder from "../../../Account/Get/getLastOrder";
import getOrderByIdDelivery from "../../Get/getOrderByIdDelivery";
import getOrder from "../../Get/getOrder";
import api from "../../../Api";


const changeOrderStatus = async ( idOrder, status ) => {

    let order = await getOrderByIdDelivery( idOrder )

    //console.log(" setOrderStatus: ", order)
    if( !order ) {
        return order
    }
    
    await api.patch(
        `/orders/${order.id}`, {
            "status" : status
        }
        
    );

    return order

    
}


export default changeOrderStatus;