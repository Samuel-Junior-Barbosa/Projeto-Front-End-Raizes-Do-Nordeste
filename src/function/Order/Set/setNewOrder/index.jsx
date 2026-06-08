import axios from "axios";
import getLastOrder from "../../../Account/Get/getLastOrder";
import api from "../../../Api";


const setNewOrder = async ( idUser, productList, total ) => {

    let lastOrder = getLastOrder()
    let lastIdOrder = 0
    if( lastOrder.length > 0 ) {
        lastIdOrder = lastOrder.id_pedido
    }
    
    let newIdOrder = Number(lastIdOrder) + 1
    let address = JSON.parse(sessionStorage.getItem('addressSelected'))
    
    let tmpOrder = {
        'id_pedido' : newIdOrder,
        'id_cliente' : idUser,
        'itens' : [...productList],
        'totalCusto' : total,
        'status' : 'a confirmar',
        'addressId' : address.id

    }

    console.log(" tmpOrder: ", tmpOrder)
    await api.post(
        `/orders`,
        tmpOrder
    );

    
}


export default setNewOrder;