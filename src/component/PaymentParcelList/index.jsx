import { useEffect, useState } from 'react'
import styles from './PaymentParcelList.module.css'
import { useNavigate } from 'react-router-dom'
import ButtomComp from '/src/component/ButtonComp'
import LabelComp from '/src/component/LabelComp'

const PaymentParcelList = ({parcelList, setQuantitySelected, setControlFrame} ) => {

    const [ showParcelList, setShowParcelList ] = useState( true )
    const [ showCreditCardInfo, setShowCreditCardInfo ] = useState( false )
    const navigate = useNavigate();
    const handleChoosePayment = ( quantidade ) => {
        setQuantitySelected( quantidade )
        

        let tmpPaymentForm = JSON.parse( sessionStorage.getItem("paymentForm"))
        //console.log(" tmpPaymentForm: ", tmpPaymentForm)
        tmpPaymentForm.quantity = quantidade

        sessionStorage.setItem("paymentForm", JSON.stringify( tmpPaymentForm ))
        setShowParcelList( false )
        setShowCreditCardInfo( true )
        //setControlFrame(false)
        //navigate('/order-review')
        
    }

    const handleGoBack = () => {
        setControlFrame(false)
    }

    useEffect(() => {
        console.log(" PARCELLIST: ", parcelList)
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
                            {console.log(" item: ", item)}
                        </li>
                        ))
                    )}
                </ul>

            )}

            { showCreditCardInfo && (
                <div className={ styles.creditCardInfoDiv}>

                    <LabelComp
                        text={"confirme os dados do seu cartão"}
                    />
                    <div>
                        <label> CPF do titular</label>
                        <input 
                            placeholder={"insira os numeros do seu CPF"}
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
                            placeholder={"insira os numeros do seu cartão"}
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
                            type={"number"}
                            min={0}
                            max={1000}
                        />
                    </div>
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