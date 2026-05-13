import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from './ChoosePaymentForm.module.css'
import LabelComp from '/src/component/LabelComp';
import PaymentParcelList from "../../component/PaymentParcelList";
import ButtonComp from '/src/component/ButtonComp'


const ChoosePaymentForm = () => {

    const [ paymentFormList, setPaymentFormList ] = useState([])
    const [ quantityParcel, setQuantityParcel ] = useState(1)
    const [ selectQuantityParcel, setSelectQuantityParcel ] = useState( false );
    const [ informMoneyValueShowWindow, setInformMoneyValueShowWindow ] = useState(false)
    //const [ paymentFormParcelList, setPaymentFormParcelList ] = useState( { id: 1, description : 'teste', 'parcel' : [[0, 'teste1'], [1, 'teste2']] })
    const [ paymentFormParcelList, setPaymentFormParcelList ] = useState()
    const [ moneyValue, setMoneyValue ] = useState('0')
    const currentChangeValue = useRef()

    const [ orderTotalCost, setOrderTotalCost ] = useState(0)

    const [ changeValue, setChangeValue ] = useState(0)

    const navigate = useNavigate()

    const getPaymentApi = async () => {
        let data = {
            'status' : 90,
            'content' : []

        }
        
        data.content = [
            {
                'id' : 1,
                'description' : 'Dinheiro',
                'parcel' : [],
                'quantity' : 1,
                'paymentValue' : 0
            },{
                'id' : 2,
                'description' : 'Cartao debito',
                'parcel' : [],
                'quantity' : 1,
                'paymentValue' : 0
            },{
                'id' : 3,
                'description' : 'Cartao credito',
                'parcel' : [
                    [1, '1x credito'],
                    [2, '2x credito']
                ],
                'quantity' : 1,
                'paymentValue' : 0
            },{
                'id' : 4,
                'description' : 'Pix',
                'parcel' : [
                    [1, '1x pix'],
                    [2, '2x pix']

                ],
                'quantity' : 1,
                'paymentValue' : 0
            }
        ]

        return data
    }

    const getPayment = async () => {
        const response = await getPaymentApi()
        if( response.status ) {
            setPaymentFormList( response.content )
            return response.content
        }
    }

    const handleChoosePaymentForm = ( id ) => {
        let tmpPaymentForm;
        for( let i = 0; i < paymentFormList.length; i ++ ) {

            if( paymentFormList[i].id == id ) {

                if( id === 1 ) {
                    tmpPaymentForm = paymentFormList[i]
                    tmpPaymentForm.quantity = 1
                    tmpPaymentForm.paymentValue = moneyValue
                    sessionStorage.setItem("paymentForm", JSON.stringify( tmpPaymentForm ) )
                    setPaymentFormParcelList([])
                    setInformMoneyValueShowWindow( true )

                    return
                }

                else if( paymentFormList[i].parcel.length > 0 ) {
                    //console.log(" paymentFormList: ", paymentFormList[i].parcel.length)
                    tmpPaymentForm = paymentFormList[i]
                    tmpPaymentForm.quantity = 1
                    sessionStorage.setItem("paymentForm", JSON.stringify( tmpPaymentForm ))
                    setPaymentFormParcelList( paymentFormList[i] )
                    setSelectQuantityParcel( true )
                    return
                }
                else {
                    tmpPaymentForm = paymentFormList[i]
                    tmpPaymentForm.quantity = 1
                    tmpPaymentForm.paymentValue = orderTotalCost
                    sessionStorage.setItem("paymentForm", JSON.stringify( tmpPaymentForm ))
                    setPaymentFormParcelList( paymentFormList[i] )
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
            return
        }
        setChangeValue( tmpCalc )
        currentChangeValue.current = tmpCalc
    }

    const handleKeydownChangeInput = (key) => {
        if( key === 'Enter' ) {
            handleCalculateChaveValue()
        }
        return;
    }

    const handleConfirmMoneyValue = () => {
        handleCalculateChaveValue()

        let userDecision = confirm(`você informou R$${moneyValue}. Total do troco: R$${currentChangeValue.current}, deseja confirmar esse valor de pagamento?`)
        setInformMoneyValueShowWindow( false )
        if( !userDecision ) {
            return
        }

        let tmpPayment = JSON.parse( sessionStorage.getItem("paymentForm") )
        tmpPayment.paymentValue = moneyValue

        sessionStorage.setItem("paymentForm", JSON.stringify(tmpPayment))

        navigate('/order-review')



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
                />

            )}
        </div>
    );
}


export default ChoosePaymentForm;