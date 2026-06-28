import { useEffect, useState } from 'react';
import styles from './OrderReview.module.css';

import LabelComp from '/src/component/LabelComp'
import ButtonComp from '../../component/ButtonComp';
import { useNavigate } from 'react-router-dom';
import getDiscountCode from '../../function/Order/Get/getDiscountCode';
import getBuyPoint from '../../function/Account/Get/getBuyPoints';
import getIdUser from '../../function/Account/Get/getIdUser';
import getFidelityPromo from '../../function/Buy/getFidelityPromo';

const OrderReview = () => {
    const [ productList, setProductList ] = useState([])
    const [ shoppingCartData, setShoppingCartData ] = useState([])

    const navigate = useNavigate()
    const sumProduct = JSON.parse( sessionStorage.getItem("orderTotalCost"))
    const [ discountAmount, setDiscountAmount ] = useState(0)
    const [ discountCodeData, setDiscountCodeData ] = useState({}) 
    const [ changeValue, setChangeValue ] = useState(0)
    const [ deliveryFee, setDeliveryFee ] = useState(0)
    const [ totalValue, setTotalValue ] = useState(0)
    const [ discountCode, setDiscountCode ] = useState('')
    const [ idUser, setIdUser ] = useState('')
    const [ currentPaymentForm, setCurrentPaymentForm ] = useState({})
    const currentAccount = JSON.parse(sessionStorage.getItem("currentAccount"))
    const username = currentAccount.name

    const [ useFidelityPromotion, setUseFidelityPromotion ] = useState( false )
    const [ fidelityDescription, setFidelityDescription ] = useState('')
    const [ fidelityDiscountValue, setFidelityDiscountValue ] = useState(0)

    const [ usePromotionCode, setUsePromotionCode ] = useState( false )
    const [ fidelityCode, setFidelityCode ] = useState('today')



    const handleGetDiscountCode = async ( code ) => {
        const response = await getDiscountCode( code )
        //console.log("handleGetDiscountCode response: ", response)
        //console.log(" handleGetCode: ", code)
        let tmpDiscountValue = null
        if( !response ) {
            return
        }

        setDiscountCodeData( response )
        if( response.percentage ) {
            tmpDiscountValue = Number( response.percentage )
            tmpDiscountValue = sumProduct * ( tmpDiscountValue / 100)
            alert(` parabens, você resgatou um codigo com ${tmpDiscountValue}% de desconto`)
        }

        else if( response.moneyDiscount ) {
            tmpDiscountValue = Number(response.moneyDiscount)
            alert(` parabens, você resgatou um codigo com R$${tmpDiscountValue.toFixed(2)} de desconto`)
        }
        
        //console.log("handleGetDiscountCode tmpDiscountValue: ", tmpDiscountValue)

        return tmpDiscountValue.toFixed(2)
    }

    const handleGoBack = () => {
        navigate(-1)
    }

    const handleChangeDiscountValue = ( code ) => {
        setDiscountCode( code )
    }

    const addDiscountCode = async () => {
        let tmpTotal = sumProduct + deliveryFee
        tmpTotal -= fidelityDiscountValue
        if( !discountCode && usePromotionCode === true ) {
            setTotalValue( tmpTotal )
            setDiscountAmount( fidelityDiscountValue )
            setUsePromotionCode( false )
            return
        }   

        setUsePromotionCode( true )
        let discountAmountValue = await handleGetDiscountCode( discountCode )
        discountAmountValue = Number( discountAmountValue )
        if( discountAmountValue ) {

            if( discountAmountValue >= totalValue ) {
                alert(" O cupom não pode passar de 100% do pedido")
                return
            }
            let newDiscountValue = fidelityDiscountValue + discountAmountValue

            setDiscountAmount( newDiscountValue )
            setTotalValue( tmpTotal - newDiscountValue)

            return discountAmountValue
        }
        

        alert(" Nenhum cupom valido encontrado, tente outro codigo")
    }

    const handleRecalculateValues = () => {
        let tmpTotal = sumProduct + deliveryFee
        tmpTotal -= discountAmount
        tmpTotal = tmpTotal.toFixed(2)
        setTotalValue( tmpTotal )
        //console.log(" currentPaymentForm: ", currentPaymentForm)
        if( currentPaymentForm ) {
            if( currentPaymentForm.id === 1 ) {
                let tmp = currentPaymentForm.paymentValue - tmpTotal
                tmp = tmp.toFixed(2)
                setChangeValue(tmp )
            }

        }
    }

    const handleVerifyFidelity = async () => {
        let tmpIdUser = await getIdUser( username )

        if( currentAccount.lgpdConcentiment.participationInTheLoyaltyProgram ) {
            return
        }
        let tmpFidality = await getBuyPoint( tmpIdUser )

        let promo = await getFidelityPromo("today")

        if( tmpFidality < promo.buyPoint ) {
            setUseFidelityPromotion( false )
            return null
        }
        //console.log(" promo: ", promo)
        setUseFidelityPromotion( true )
        let tmpDiscount = totalValue * (promo.percentage / 100)
        let tmpDiscountValue = totalValue - tmpDiscount
        setFidelityDiscountValue( tmpDiscount )
        tmpDiscountValue = tmpDiscountValue.toFixed(2)
        
        setTotalValue( tmpDiscountValue )

        let newDiscountValue = Number(discountAmount) + Number(tmpDiscount)
        setDiscountAmount( newDiscountValue  )
        setFidelityDescription( promo.description )
        //console.log(" PROMO VALUE: ", tmpDiscountValue)


    }

    const handleConfirmPayment = () => {
        const data = {
            fidelityCode : fidelityCode,
            useFidelityPromotionRecived : useFidelityPromotion
        }

        if( currentAccount.name !== '' ) {
            navigate('/finish-order', { state : data })
            return
        }

        navigate('/login')
        return
    }

    useEffect(() => {
        let tmp_cart_list = JSON.parse(sessionStorage.getItem("shoppingCart"))
        setShoppingCartData( tmp_cart_list )
        setProductList( tmp_cart_list.products )
        let tmpDeliveryFee = JSON.parse(sessionStorage.getItem("deliveryFeeValue"))
        if( tmpDeliveryFee ) {
            tmpDeliveryFee = Number( tmpDeliveryFee ).toFixed(2)
            setDeliveryFee( tmpDeliveryFee )
        }
        
        let tmpChangeValue = JSON.parse(sessionStorage.getItem("changeValueValue"))

        if( tmpChangeValue ) {

            tmpChangeValue = Number( tmpChangeValue ).toFixed(2)
            setChangeValue( tmpChangeValue )
        }

        let tmpPaymentForm = JSON.parse( sessionStorage.getItem('paymentForm'))
        //console.log(" order review - tmpPaymentForm: ", tmpPaymentForm)
        if( tmpPaymentForm ) {
            tmpPaymentForm.paymentValue = Number( tmpPaymentForm.paymentValue ).toFixed(2)
            
        }

        setCurrentPaymentForm( tmpPaymentForm )
        
        
    }, [])


    useEffect(() => {
        handleVerifyFidelity()
        handleRecalculateValues()
        
    }, [deliveryFee, changeValue, currentPaymentForm])


    useEffect(() => {
        handleRecalculateValues()
        
    }, [discountAmount])



    return (
        <div className={styles.OrderReviewMainDiv}>
            <LabelComp
                text={" Resumo do pedido: "}
            />

            <div className={styles.OrderReviewDiv} >

                <div className={styles.productListDiv}
                >
                    <LabelComp nameClass={styles.productListLabel} 
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

                    { discountCodeData.code && (

                        
                        <label>
                            <br />
                            desconto de: { discountCodeData.moneyDiscount  ? (
                                <label> R${discountCodeData.moneyDiscount} </label>
                            ) : (
                                <label> {discountCodeData.percentage}% </label>
                            )}
                        </label>
                    )}
                </div>

                <div className={ styles.paymentDiv}
                >
                    <label> Pagamento </label>
                    <label> {currentPaymentForm.quantity}x : {currentPaymentForm.description} = {currentPaymentForm.paymentValue}</label>
                    <hr />
                    <label>  SubTotal: R${sumProduct.toFixed(2)}</label>
                    <label>  Descontos: R${discountAmount.toFixed(2)}</label>
                    <label>  Troco: R${changeValue} </label>
                    <label>  Taxa de entrega: R${deliveryFee.toFixed(2)}</label>
                    <hr />
                    <label>  Valor Total: R${Number(totalValue).toFixed(2)}</label>
                    { useFidelityPromotion && (
                        <label>
                             
                            Parabéns, você obteve uma promoção de fidelidade de:
                            <br />
                            {fidelityDescription}
                        </label>
                    )}

                </div>
                
                
                <div className={styles.confirmPaymentButton}>
                    <ButtonComp
                        text={"Confirmar"}
                        onClickButton={ handleConfirmPayment }
                    />
                    <ButtonComp
                        text={"Voltar"}
                        onClickButton={ handleGoBack }
                    />
                </div>
            </div>
        </div>
    );
};


export default OrderReview;