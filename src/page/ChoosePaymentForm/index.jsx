import { useEffect, useRef, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

import styles from './ChoosePaymentForm.module.css'
import LabelComp from '/src/component/LabelComp';
import PaymentParcelList from "../../component/PaymentParcelList";
import ButtonComp from '/src/component/ButtonComp'
import getPaymentFormApi from "../../function/Buy/getPaymentFormApi";


const ChoosePaymentForm = () => {

    const [ paymentFormList, setPaymentFormList ] = useState([])
    const [ quantityParcel, setQuantityParcel ] = useState(1)
    const [ selectQuantityParcel, setSelectQuantityParcel ] = useState( false );
    const [ informMoneyValueShowWindow, setInformMoneyValueShowWindow ] = useState(false)
    //const [ paymentFormParcelList, setPaymentFormParcelList ] = useState( { id: 1, description : 'teste', 'parcel' : [[0, 'teste1'], [1, 'teste2']] })
    const [ paymentFormParcelList, setPaymentFormParcelList ] = useState()
    const [ paymentForm, setPaymentForm ] = useState()

    const [ moneyValue, setMoneyValue ] = useState('0')
    const currentChangeValue = useRef()

    const [ orderTotalCost, setOrderTotalCost ] = useState(0)

    const [ changeValue, setChangeValue ] = useState(0)

    const navigate = useNavigate()
    const location = useLocation()

    const { id_place_form } = location.state || { id_place_form : 1 }

    const handleGetPaymentForm = async () => {
        const response = await getPaymentFormApi()
        return response
    }
    const getPayment = async () => {
        const response = await handleGetPaymentForm()
        if( response.status ) {
            setPaymentFormList( response.content )
            return response.content
        }
    }

    const handleChoosePaymentForm = ( id ) => {
        let tmpPaymentForm;
        for( let i = 0; i < paymentFormList.length; i ++ ) {
            paymentFormList[i].id = Number(paymentFormList[i].id)
            if( paymentFormList[i].id == id ) {

                if( id == 1 ) {
                    tmpPaymentForm = paymentFormList[i]
                    tmpPaymentForm.quantity = 1
                    tmpPaymentForm.paymentValue = moneyValue
                    sessionStorage.setItem("paymentForm", JSON.stringify( tmpPaymentForm ) )
                    setPaymentForm( tmpPaymentForm )
                    setPaymentFormParcelList([])
                    setInformMoneyValueShowWindow( true )

                    return
                }

                else if( paymentFormList[i].parcel.length > 0 ) {
                    //console.log(" paymentFormList: ", paymentFormList[i].parcel.length)
                    tmpPaymentForm = paymentFormList[i]
                    tmpPaymentForm.quantity = 1
                    sessionStorage.setItem("paymentForm", JSON.stringify( tmpPaymentForm ))
                    setPaymentForm( tmpPaymentForm )

                    setPaymentFormParcelList( tmpPaymentForm )
                    setSelectQuantityParcel( true )
                    return
                }
                else {
                    tmpPaymentForm = paymentFormList[i]
                    tmpPaymentForm.quantity = 1
                    tmpPaymentForm.paymentValue = orderTotalCost
                    sessionStorage.setItem("paymentForm", JSON.stringify( tmpPaymentForm ))
                    setPaymentForm( tmpPaymentForm )
                    setPaymentFormParcelList( tmpPaymentForm )
                    setSelectQuantityParcel( true )
                    //navigate('/order-review')
                }
            }
        }
    };

    const handleCalculateChaveValue = () => {
        

        let tmpCalc = Number(moneyValue) - orderTotalCost;
        if( tmpCalc < 0 ) {
            alert(" O valor do dinheiro não pode ser menor que o total dos produtos.")
            return 1
        }
        setChangeValue( tmpCalc )
        currentChangeValue.current = tmpCalc

        return 0
    }

    const handleKeydownChangeInput = (key) => {
        if( key === 'Enter' ) {
            handleCalculateChaveValue()
        }
        return;
    }

    const handleConfirmMoneyValue = () => {
        const data = {
            id_place_form : id_place_form
        }
        const calculateResponse = handleCalculateChaveValue()
        if( calculateResponse > 0 ) {
            return calculateResponse
        }

        let userDecision = confirm(`você informou R$${moneyValue}. Total do troco: R$${currentChangeValue.current}, deseja confirmar esse valor de pagamento?`)
        setInformMoneyValueShowWindow( false )
        if( !userDecision ) {
            return
        }

        let tmpPayment = JSON.parse( sessionStorage.getItem("paymentForm") )
        tmpPayment.paymentValue = moneyValue

        sessionStorage.setItem("paymentForm", JSON.stringify(tmpPayment))

        navigate('/order-review', { state : data})



    }

    useEffect( () => {
        getPayment()
    }, [])

    useEffect(() => {
        let tmpTotal = JSON.parse( sessionStorage.getItem("orderTotalCost"))
        setOrderTotalCost( tmpTotal )
    }, [])

    return (
        <div
            className={ styles.paymentListMainDiv}
        >

            <LabelComp
                text={'Escolha a forma de pagamento'}
            />
            <div
                className={ styles.paymentListDiv}
            >
                <ul
                    className={styles.paymentList}
                >
                    { paymentFormList && paymentFormList.map((item, i) => (
                        <li
                            key={i}
                            onClick={ (e) => (
                                handleChoosePaymentForm(item.id)
                            )}
                        >
                            {item.description}
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className={ styles.bottomDivButton }>
                <ButtonComp
                    text={"voltar"}
                    onClickButton={ () => navigate(-1)}
                />

            </div>
            { informMoneyValueShowWindow && (
                <div className={styles.moneyInputDiv}>
                    <LabelComp
                        nameClass={ styles.moneyinputLabel}
                        text={"Informa o valor do pagamento em dinheiro"}
                    />
                    
                    <label> Total do pedido: {orderTotalCost}</label>
                    <div>
                        <hr />
                        <label> Valor: </label>
                        <input
                            type={'number'}
                            value={ moneyValue }
                            onChange={ (e) => setMoneyValue(e.target.value)}
                            min={0}
                            onKeyDown={ (e) => handleKeydownChangeInput(e.key)}
                        />
                        <hr />
                    </div>
                    <hr />
                    <label> Troco: { changeValue }</label>
                    <hr />

                    <ButtonComp
                        nameClass={ styles.confirmButtonMoneyValue }
                        text={"Confirmar"}
                        onClickButton={handleConfirmMoneyValue}
                    />
                    <ButtonComp
                        nameClass={ styles.confirmButtonMoneyValue }
                        text={"cancelar"}
                        onClickButton={(e) => (
                            setInformMoneyValueShowWindow(false)
                        )}
                    />

                </div>

            )}

            { selectQuantityParcel && (
                <PaymentParcelList
                    parcelList = { paymentFormParcelList }
                    setQuantitySelected={ setQuantityParcel }
                    setControlFrame={ setSelectQuantityParcel }
                    paymentForm={ paymentForm }
                />

            )}
        </div>
    );
}


export default ChoosePaymentForm;