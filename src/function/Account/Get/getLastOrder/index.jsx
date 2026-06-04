import getAccountOrder from "../getAccountOrder"




const getLastOrder = async () => {

    const orderData = await getAccountOrder()

    let lastOrder = []
    let maxId = 1
    for( let i =0; i < orderData.length; i ++ ) {
        if( orderData[i].id_pedido > maxId ) {
            lastOrder = orderData[i]
        }

    }

    console.log(" lastOrder: ", lastOrder)
    
    return lastOrder
}

export default getLastOrder;