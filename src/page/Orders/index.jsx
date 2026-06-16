import styles from './Orders.module.css'
import { useEffect, useState } from "react";
import LabelComp from '/src/component/LabelComp'
import getOrder from '../../function/Order/Get/getOrder';
import getIdUser from '../../function/Account/Get/getIdUser';
import setOrderStatus from '../../function/Order/Set/setOrderStatus';


const OrdersPage = () => {

    const [ orders, setOrders ] = useState([]);
    const [ deliveredOrders, setDeliveredOrders ] = useState(0)

    const handleGetOrderApi = async () => {
        const username = JSON.parse(sessionStorage.getItem("currentAccount")).name
        const idUser = await getIdUser( username )
        const response = await getOrder( idUser )
        
        setOrders( response )

    }


    const handleRefreshOrders = async () => {
        let tmpEntregues = 0
        let tmpOrders = [...orders]
        setTimeout( async () => {
            //console.log(" verify orders: ", orders)
            if( tmpOrders.length > 0 && tmpEntregues < tmpOrders.length) {
                for( let i = 0; i < tmpOrders.length; i ++ ) {
                    //console.log(" TMP ENTREGUES: ", tmpEntregues)
                    let tmpResponse = await setOrderStatus( tmpOrders[i].id_pedido)
                    //console.log(" TMP RESPONSE: ", tmpResponse)
                    tmpOrders[i].status = tmpResponse.status
                    if( tmpResponse.status == 'entregue' ) {
                        //console.log(" ENTREGUE")
                        tmpEntregues += 1
                        continue
                    }
                    
                }

                
                if( tmpEntregues === tmpOrders.length ) {
                    setDeliveredOrders( tmpEntregues )
                }
                

                setOrders( tmpOrders )
                sessionStorage.setItem("orders", JSON.stringify(tmpOrders) )

            }

        }, 2000)
    }


    useEffect(() => {
        handleGetOrderApi()
    }, [])
    
    
    /* Simula uma rotina de verificação de status de pedido */
    useEffect(() => {
        if( orders && deliveredOrders < orders.length ) {
            handleRefreshOrders()
        }
        
    }, [orders])

    return (
        <div className={ styles.orderListDiv }>

            <LabelComp
                text={"Pedidos"}
            />

            <ul className={ styles.orderList }>
                { orders && orders.map((item, index) => (
                    <li
                        key={index}
                    >
                        <label>Codigo do Pedido: ({item.id}) </label>
                        <label>Total: R${item.totalCusto}</label>
                        <label>Status: [ {item.status} ]</label>

                    </li>
                    
                ))}
            </ul>
        </div>
    );
}


export default OrdersPage;