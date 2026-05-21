import styles from './Orders.module.css'
import { useEffect, useState } from "react";
import LabelComp from '/src/component/LabelComp'


const OrdersPage = () => {

    const [ orders, setOrders ] = useState([]);

    useEffect(() => {
        let tmpOrders = JSON.parse( localStorage.getItem('orders') )
        console.log(" ORDERS: ", tmpOrders)
        if( tmpOrders ) {
            setOrders( tmpOrders )
        }
        


    }, [])

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
                        <label>Pedido Nº ({item.id}) </label>
                        <label>Total: R${item.totalCost}</label>
                        <label>Status: [ {item.status} ]</label>

                    </li>
                    
                ))}
            </ul>
        </div>
    );
}


export default OrdersPage;