import axios from "axios";
import getLastOrder from "../../../Account/Get/getLastOrder";
import getOrderByIdDelivery from "../../Get/getOrderByIdDelivery";
import getOrder from "../../Get/getOrder";
import api from "../../../Api";


const setOrderStatus = async ( idOrder ) => {

    let order = await getOrderByIdDelivery( idOrder )

    //console.log(" setOrderStatus: ", order)
    if( !order ) {
        return order
    }

    if( order.status === 'a confirmar' ) {
        order.status = 'preparando'
    }
    else if( order.status === 'preparando' ) {
        order.status = 'a caminho'
    }

    else if( order.status === 'a caminho' ) {
        order.status = 'entregue'

    }
    else if( order.status === 'entregue' ) {
        order.status = 'entregue'
    }
    else {
        order.status = 'a confirmar'
    }



    if( !order ) {
        return order
    }
    
    await api.patch(
        `/orders/${order.id}`, {
            "status" : order.status
        }
        
    );

    return order

    
}


export default setOrderStatus;