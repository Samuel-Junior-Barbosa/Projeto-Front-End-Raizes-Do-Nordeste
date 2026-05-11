import { useEffect, useState } from 'react';
import styles from './OrderReview.module.css';

import LabelComp from '/src/component/LabelComp'
import ButtonComp from '../../component/ButtonComp';

const OrderReview = () => {
    const [ productList, setProductList ] = useState([])

    const sumProduct = JSON.parse( sessionStorage.getItem("orderTotalCost"))
    const [ discountAmount, setDiscountAmount ] = useState(0)
    const [ changeValue, setChangeValue ] = useState(0)
    const [ deliveryFee, setDeliveryFee ] = useState(0)
    const [ totalValue, setTotalValue ] = useState(0)
    const [ discountCode, setDiscountCode ] = useState('')

    const [ currentPaymentForm, setCurrentPaymentForm ] = useState()

    const discountCodes = {
        'teste1' : 5,
        'teste2' : 10,
        'teste3' : 15,
    }

    const handleChangeDiscountValue = ( code ) => {
        setDiscountCode( code )
    }

    const addDiscountCode = () => {
        if( !discountCode ) {
            setDiscountAmount(0)
            return
        }   

        let discountAmountValue = discountCodes[discountCode]
        if( discountAmountValue ) {
            setDiscountAmount( discountAmountValue )
            return discountCodes[ discountCode ]
        }

        alert(" Nenhum cupom valido encontrado, tente outro codigo")
    }

    useEffect(() => {
        let tmp_cart_list = JSON.parse(sessionStorage.getItem("shoppingCart"))
        setProductList( tmp_cart_list )
        let tmpDeliveryFee = JSON.parse(sessionStorage.getItem("deliveryFeeValue"))
        if( tmpDeliveryFee ) {
            setDeliveryFee( tmpDeliveryFee )
        }
        
        let tmpChangeValue = JSON.parse(sessionStorage.getItem("changeValueValue"))

        if( tmpChangeValue ) {
            setChangeValue( tmpChangeValue )
        }

        let tmpPaymentForm = JSON.parse( sessionStorage.getItem('paymentForm'))

        if( tmpPaymentForm ) {
            setCurrentPaymentForm( tmpPaymentForm )
        }


        

    }, [])


    useEffect(() => {

        let tmpTotal = sumProduct - discountAmount
        tmpTotal += deliveryFee
        setTotalValue( tmpTotal )

        if( currentPaymentForm.id === 1 ) {
            
        }

    }, [deliveryFee, discountAmount, changeValue])

    return (
        <div
            className={styles.OrderReviewMainDiv}
        >
            <LabelComp
                text={" Resumo do pedido: "}
            />

            <div
                className={styles.OrderReviewDiv}
            >

                <div className={styles.productListDiv}
                >
                    <LabelComp
                        nameClass={styles.productListLabel}
                        text={"Itens do pedido"}
                    />

                    <ul
                        className={styles.productList}
                    >
                        { productList && productList.map((item, i) => (
                            <li
                                key={i}
                            >
                                {item.quantidade}x {item.produto} : R${item.precovenda}
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className={styles.discountDiv}
                >
                    <label> Cupom de desconto </label>
                    <input
                        className={styles.inputDiscountCode}
                        text={"text"}
                        onChange={ (e) => (
                            handleChangeDiscountValue(e.target.value)
                        )}

                    />
                    <ButtonComp
                        nameClass={ styles.discountButtom}
                        text={"adicionar"}
                        onClickButton={addDiscountCode}
                    />
                </div>

                <div className={ styles.paymentDiv}
                >
                    <label> Pagamento </label>
                    <hr />
                    <label>  SubTotal: R${sumProduct}</label>
                    <label>  Descontos: R${discountAmount}</label>
                    <label>  Troco: R${changeValue} </label>
                    <label>  Taxa de entrega: R${deliveryFee}</label>
                    <hr />
                    <label>  Valor Total: R${totalValue}</label>
                </div>
                
                


            </div>
        </div>
    );
};


export default OrderReview;