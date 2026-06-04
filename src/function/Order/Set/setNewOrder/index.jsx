import axios from "axios";
import getLastOrder from "../../../Account/Get/getLastOrder";


const setNewOrder = async ( idUser, productList, total ) => {

    let lastOrder = getLastOrder()
    let lastIdOrder = 0
    if( lastOrder.length > 0 ) {
        lastIdOrder = lastOrder.id_pedido
    }
    
    let newIdOrder = Number(lastIdOrder) + 1

    
    let tmpOrder = {
        'id_pedido' : newIdOrder,
        'id_cliente' : idUser,
        'itens' : [...productList],
        'totalCusto' : total,
        'status' : 'a confirmar'

    }

    console.log(" tmpOrder: ", tmpOrder)
    await axios.post(
        `http://localhost:3000/orders`,
        tmpOrder
    );

    
}


export default setNewOrder;