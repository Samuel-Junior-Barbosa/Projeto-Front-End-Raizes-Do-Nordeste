import { useEffect } from 'react'
import styles from './PaymentParcelList.module.css'
import { useNavigate } from 'react-router-dom'
import ButtomComp from '/src/component/ButtonComp'

const PaymentParcelList = ({parcelList, setQuantitySelected, setControlFrame} ) => {

    const navigate = useNavigate();
    const handleChoosePayment = ( quantidade ) => {
        setQuantitySelected( quantidade )
        setControlFrame(false)

        let tmpPaymentForm = JSON.parse( sessionStorage.getItem("paymentForm"))
        tmpPaymentForm.quantity = quantidade

        sessionStorage.setItem("paymentForm", JSON.stringify( tmpPaymentForm ))
        navigate('/order-review')
        
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

            <ButtomComp
                nameClass={ styles.CloseButton}
                text={"Voltar"}
                onClickButton={ handleGoBack }
            />
        </div>
    );
}


export default PaymentParcelList;