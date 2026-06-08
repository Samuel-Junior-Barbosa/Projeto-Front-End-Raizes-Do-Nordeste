import axios from "axios";
import getLastOrder from "../../../Account/Get/getLastOrder";
import getOrderByIdDelivery from "../../Get/getOrderByIdDelivery";
import getOrder from "../../Get/getOrder";


const setOrderStatus = async ( idOrder ) => {

    let order = await getOrderByIdDelivery( idOrder )

    //console.log(" setOrderStatus: ", order)
    if( order.status === 'a confirmar' ) {
        order.status = 'preparando'
    }
    else if( order.status === 'preparando' ) {
        order.status = 'a caminho'
    }

    else if( order.status === 'a caminho' ) {
        order.status = 'entregue'

    }
    else {
        order.status = 'a confirmar'
    }

    let value = {
        status : order.status
    }

    if( !order ) {
        return null
    }
    
    await axios.patch(
        `/orders/${order.id}`,
        value
    );

    
}


export default setOrderStatus;