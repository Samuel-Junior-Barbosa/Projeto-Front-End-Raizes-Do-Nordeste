import { useEffect, useState } from 'react'
import styles from './PaymentParcelList.module.css'
import { useLocation, useNavigate } from 'react-router-dom'
import ButtomComp from '/src/component/ButtonComp'
import LabelComp from '/src/component/LabelComp'

const PaymentParcelList = ({parcelList, setQuantitySelected, setControlFrame, paymentForm} ) => {

    const [ showParcelList, setShowParcelList ] = useState( true )
    const [ showCreditCardInfo, setShowCreditCardInfo ] = useState( false )
    const [ showPixKey, setShowPixKey ] = useState( false)
    const [ cpfTitular, setCpfTitular ] = useState('')
    const [ cardNumber, setCardNumber ] = useState('')
    const [ securityCardNumber, setSecurityCardNumber ] = useState('')
    const navigate = useNavigate();

    //const location = useLocation();
    //const { paymentForm } = location.state || { paymentForm : null}


    const handleChoosePayment = ( quantidade ) => {
        setQuantitySelected( quantidade )
        

        //let tmpPaymentForm = JSON.parse( sessionStorage.getItem("paymentForm"))
        let tmpPaymentForm = paymentForm
        console.log(" tmpPaymentForm: ", tmpPaymentForm)
        tmpPaymentForm.quantity = quantidade
        //let tmpOrderTotalCost = JSON.parse( sessionStorage.getItem("orderTotalCost"))
        let tmpOrderTotalCost = tmpPaymentForm.paymentValue
        
        setShowParcelList( false )
        if( tmpPaymentForm.id == 2 || tmpPaymentForm.id == 3 )  {
            tmpPaymentForm.paymentValue = tmpOrderTotalCost
            setShowCreditCardInfo( true )   
        }
        else if (tmpPaymentForm.id == 4) {
            tmpPaymentForm.paymentValue = tmpOrderTotalCost
            setShowPixKey( true )
        }
        
        sessionStorage.setItem("paymentForm", JSON.stringify( tmpPaymentForm ))
        
    }

    const handleSetCpfTitular = ( num ) => {
        if( !cpfTitular && !Number(num)) {
            setCpfTitular('')
        }
        setCpfTitular( num )
    }


    const handleSetCardNumber = ( num ) => {
        if( !cardNumber && !Number(num)) {
            setCardNumber('')
        }
        setCardNumber( num )

    }

    const handleSetSecutyCardNumber = ( num ) => {
        if( !securityCardNumber && !Number(num)) {
            setSecurityCardNumber('')
        }
        setSecurityCardNumber( num )

    }


    const handleGoBack = () => {
        setControlFrame(false)
    }

    const handleChangeWindow = () => {
        setControlFrame(false)
        navigate('/order-review')
    }

    useEffect(() => {
        let tmpPaymentForm = JSON.parse( sessionStorage.getItem("paymentForm"))
        if( tmpPaymentForm.id === 2 ) {
            setShowParcelList( false )
            setShowCreditCardInfo( true )
        }
    }, [])

    return (
        <div
            className={ styles.PaymentParcelListDiv }
        >
            { showParcelList && (
                <ul
                    className={ styles.PaymentParcelList }
                >
                    { parcelList && (
                        parcelList.parcel.map(( item, i) => (
                        <li
                            key={i}
                            onClick={ (e) => (
                                handleChoosePayment( item[0] )
                            )}
                        >
                            {item[1]}
                        </li>
                        ))
                    )}
                </ul>

            )}

            { showCreditCardInfo && (
                <div className={ styles.paymentInfoDiv}>
                    <LabelComp
                        text={"confirme os dados do seu cartão"}
                    />
                    <div>
                        <label> CPF do titular</label>
                        <input 
                            type={'text'}
                            placeholder={"insira os numeros do seu CPF"}
                            value={ cpfTitular }
                            onChange={ (e) => (
                                handleSetCpfTitular(e.target.value.replace(/\D/g, ''))
                            )}
                        />
                    </div>
                    <div>
                        <label> Nome completo do Titular: </label>
                        <input
                            placeholder={'insira o titular do cartão'}
                        />
                    </div>
                    <div>
                        <label> Numero do cartão</label>
                        <input
                            type={'text'}
                            placeholder={"insira os numeros do seu cartão"}
                            value={ cardNumber }
                            onChange={(e) => (
                                handleSetCardNumber(e.target.value.replace(/\D/g, ''))
                            )}
                        />
                    </div>

                    <div>
                        <label> Data de validade: </label>
                        <input
                            type={'date'}
                        />
                    </div>

                    <div>
                        <label> Codigo de segurança: </label>
                        <input
                            type={"text"}
                            min={0}
                            max={1000}
                            value={securityCardNumber}
                            onChange={ (e) => (
                                handleSetSecutyCardNumber( e.target.value.replace(/\D/g, '') )
                            )}
                        />
                    </div>
                    <ButtomComp
                      text={"confirmar"}
                      onClickButton={ handleChangeWindow }
                    />
                </div>

            )}

            { showPixKey && (
                <div className={styles.pixPaymentInfoDiv}> 
                    <div className={styles.pixKeyDiv}>
                        <label> Chave PIX: 00.000.000/0001-00</label>
                        <ButtomComp
                            text={"copiar"}
                        />
                    </div>
                    <ButtomComp
                        text={"confirmar"}
                        onClickButton={ handleChangeWindow }
                    />

                </div>
            )}

            <ButtomComp
                nameClass={ styles.CloseButton}
                text={"Voltar"}
                onClickButton={ handleGoBack }
            />
        </div>
    );
}


export default PaymentParcelList;