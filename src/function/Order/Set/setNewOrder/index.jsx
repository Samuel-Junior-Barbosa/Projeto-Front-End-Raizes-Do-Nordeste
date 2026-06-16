import axios from "axios";
import getLastOrder from "/src/function/Account/Get/getLastOrder";
import api from "../../../Api";


const setNewOrder = async ( idUser, productList, total ) => {

    let lastIdOrder = 1
    let lastOrder = await getLastOrder()
    if( lastOrder ) {
        lastIdOrder = lastOrder.id_pedido
    }
    console.log(" LAST ORDER: ", lastOrder)
    let newIdOrder = Number(lastIdOrder) + 1
    let address = JSON.parse(sessionStorage.getItem('addressSelected'))
    
    let tmpOrder = {
        'id_pedido' : newIdOrder,
        'id_cliente' : idUser,
        'itens' : [...productList],
        'totalCusto' : total,
        'status' : 'a confirmar',
        'address' : 0
    }

    if( address ) {
        tmpOrder['addressId'] = address.addressId
        
    }

    console.log(" tmpOrder: ", tmpOrder)
    await api.post(
        `/orders`,
        tmpOrder
    );

    
}


export default setNewOrder;