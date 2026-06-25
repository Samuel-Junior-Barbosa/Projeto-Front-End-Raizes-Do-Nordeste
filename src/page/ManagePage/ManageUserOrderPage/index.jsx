import { useEffect, useState } from 'react';
import styles from './ManageUserOrderPage.module.css';
import LabelComp from '/src/component/LabelComp';
import getAccountOrder from '../../../function/Account/Get/getAccountOrder';
import getOrderByIdDelivery from '../../../function/Order/Get/getOrderByIdDelivery';
import getOrderData from '../../../function/Order/Get/getOrderData';
import ButtonComp from '../../../component/ButtonComp';
import changeOrderStatus from '../../../function/Order/Set/changeOrderStatus';


const ManageUserOrderPage = () => {

    const [ orderId, setOrderId ] = useState('');
    const [ orderList, setOrderList ] = useState('');
    
    const [ orderData, setOrderData ] = useState([]);
    const [ orderClientId, setOrderClientId ] = useState('0');
    const [ orderTotal, setOrderTotal ] = useState('0');
    const [ orderStatus, setOrderStatus ] = useState(false);
    
    const [ showOrderList, setShowOrderList ] = useState( true )
    const [ showOrderAlteration, setShowOrderAlteration ] = useState( false )

    const handleResetValues = () => {
        setOrderId('')
        setOrderData([]);
        setOrderClientId('0');
        setOrderTotal('0');
        setOrderStatus(false);
    }

    const handleSetOrderId = async ( value ) => {
        let tmp_value = Number(value )
        if( Number(value ) ) {
            setOrderId( tmp_value )
            const response = await handleSearchForOrder( tmp_value )
            //console.log(" handleSetOrderId: ", tmp_value, response)
        }
        else {
            setOrderId('')
            const response = await handleSearchForOrder( '' )
            //console.log(" handleSetOrderId: ", tmp_value, response)

        }


        
    }


    const handleSearchForOrder = async ( order_id ) => {
       //(" SEARCH ORDER: ", order_id)
        let response = {};
        if( order_id !== '' ) {
            response = await getOrderByIdDelivery( order_id )
            if( !response ) {
                response = []
            }
            else {
                response = [ response ]
            }
            


        }
        else {
            response = await getOrderData()
        }
        //console.log(" handleSearchForOrder: ", response)
        setOrderList( response )
        return response
        
    }


    const handleGetOrderData = async ( ) => {
        const response = await getAccountOrder()
        //console.log(" RESPONSE: ", response)
        setOrderList( response )
    }


    const handleChooseOrder = async ( order_id ) => {
        const response = await getOrderByIdDelivery( order_id )
        setOrderData( response )
        setOrderId( order_id)
        setOrderClientId( response.id_cliente ) 
        setOrderStatus( response.status )
        setOrderTotal( response.totalCusto )


        handleShowOrderAlteration()


    }

    const handleShowOrderAlteration = () => {
        setShowOrderList( false )
        setShowOrderAlteration( true )
    }

    const handleShowOrderList = () => {
        setShowOrderAlteration( false )
        setShowOrderList( true )
    }

    const handleSaveOrderAlteration = async () => {
        
        const confirmWindow = confirm("Deseja realmente alterar o status desse pedido?")
        if( !confirmWindow ) {
            return
        }

        
        const response = await changeOrderStatus( orderId, orderStatus)
        alert("Status alterado com sucesso!")
        handleResetValues()
        handleShowOrderList()
    
    }

    const handleCancelOrderAlteration = () => {
        handleResetValues()
        handleShowOrderList()
    }

    useEffect(() => {
        handleGetOrderData()
    }, [])


    useEffect(() => {
        if( !showOrderList ) {
            return
        }

        handleGetOrderData()
        
    }, [ showOrderList ])


    return(
       <div className={ styles.ManageUserOrderPageMainDiv}>
            <LabelComp 
                text={"Pedidos"}
            />

            { !showOrderAlteration && (
                <div>
                    <input
                        className={ styles.searchOrderInput }
                        placeholder={'Pesquise usando ID do pedido'}
                        value={orderId}
                        onChange={ (e) => handleSetOrderId( e.target.value.toUpperCase())}
                    />
                </div>

            )}
            
            <div className={ styles.ManageUserOrderPageDiv }>

                { showOrderList && (
                    <ul className={ styles.orderList }>
                        { Array.isArray(orderList) && orderList.length > 0 && orderList.map( (item, i ) => (
                            <li
                                key={i}
                                onClick={ (e) => handleChooseOrder( item.id_pedido )}
                            >
                                Id pedido: ( { item.id_pedido} ) <br/>
                                status: [ {item.status} ] <br/>
                                total pedido: R${Number(item.totalCusto).toFixed(2)} <br/>
                                Id cliente: {item.id_cliente} <br/>
                            </li>
                        ))}
                    </ul>
                )}

                { showOrderAlteration && (
                    <>
                        <div className={ styles.orderAlterationMainDiv}>
                            <div>
                                <label> Id pedido:</label>
                                <input
                                    value={ orderId }
                                    readOnly={true}
                                />
                            </div>
                            <div>
                                <label> Status: </label>
                                <select
                                    value={ orderStatus }
                                    onChange={ (e) => setOrderStatus(e.target.value)}
                                >
                                    <option value={'a confirmar'}> A confirmar </option>
                                    <option value={'preparando'}> Preparando </option>
                                    <option value={'a caminho'}> A caminho </option>
                                    <option value={'entregue'}> Entregue </option>
                                </select>
                            </div>
                            <div>
                                <label> Total pedido: </label>
                                <input
                                    value={ orderTotal }
                                    readOnly={true}
                                />
                            </div>
                            <div>
                                <label> Id cliente: </label>
                                <input
                                    value={ orderClientId}
                                    readOnly={true}
                                />
                            </div>
                        </div>
                        <div className={styles.alterationButtonDiv}>
                            <ButtonComp
                                text={"Salvar"}
                                onClickButton={ handleSaveOrderAlteration }
                            />
                            <ButtonComp
                                text={"Cancelar"}
                                onClickButton={ handleCancelOrderAlteration }
                            />
                        </div>
                    </>
                )}
                
            </div>
       </div>
    )
}


export default ManageUserOrderPage;