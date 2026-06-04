import styles from './Orders.module.css'
import { useEffect, useState } from "react";
import LabelComp from '/src/component/LabelComp'
import getOrder from '../../function/Order/Get/getOrder';
import getIdUser from '../../function/Account/Get/getIdUser';
import setOrderStatus from '../../function/Order/Set/setOrderStatus';


const OrdersPage = () => {

    const [ orders, setOrders ] = useState([]);

    const handleGetOrderApi = async () => {
        const username = JSON.parse(sessionStorage.getItem("currentAccount")).name
        const idUser = await getIdUser( username )
        const response = await getOrder( idUser )
        
        setOrders( response )

    }

    useEffect(() => {
        handleGetOrderApi()
    }, [])
    
    
    /* Simula uma rotina de verificação de status de pedido */
    useEffect(() => {

        let tmpEntregues = 0
        let tmpOrders = [...orders]

        setTimeout(() => {
            //console.log(" verify orders: ", orders)
            if( tmpOrders.length > 0 ) {
                for( let i = 0; i < tmpOrders.length; i ++ ) {
                    
                    if( tmpOrders[i].status === 'a confirmar' ) {
                        tmpOrders[i].status = 'preparando'
                    }
                    else if( tmpOrders[i].status === 'preparando' ) {
                        tmpOrders[i].status = 'a caminho'
                    }

                    else if( tmpOrders[i].status === 'a caminho' ) {
                        tmpOrders[i].status = 'entregue'

                    }
                    else if( tmpOrders[i].status === 'entregue' ) {
                        tmpEntregues += 1
                        continue
                    }
                    else {
                        tmpOrders[i].status = 'a confirmar'
                    }
                    
                   setOrderStatus( tmpOrders[i].id)
                    
                }

                if( tmpEntregues === tmpOrders.length ) {
                    return
                }
                setOrders( tmpOrders )
                sessionStorage.setItem("orders", JSON.stringify(tmpOrders) )
            }
        }, 2000)
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