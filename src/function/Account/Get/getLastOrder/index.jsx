import api from "../../../Api"
import getAccountOrder from "../getAccountOrder"




const getLastOrder = async () => {

    const orderData = await api.get(
        '/orders?_sort=-id_pedido'
    )

    let lastOrder = orderData.data[0]
    //let maxId = Number(lastOrder?.id_pedido?? 1)
    console.log(" lastOrder: ", lastOrder)

    return lastOrder
}

export default getLastOrder;