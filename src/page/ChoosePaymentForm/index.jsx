import { useEffect, useState } from "react";
import styles from './ChoosePaymentForm.module.css'
import LabelComp from '/src/component/LabelComp';
import PaymentParcelList from "../../component/PaymentParcelList";
import { useNavigate } from "react-router-dom";

const ChoosePaymentForm = () => {

    const [ paymentFormList, setPaymentFormList ] = useState([])
    const [ quantityParcel, setQuantityParcel ] = useState(1)
    const [ selectQuantityParcel, setSelectQuantityParcel ] = useState( false );
    //const [ paymentFormParcelList, setPaymentFormParcelList ] = useState( { id: 1, description : 'teste', 'parcel' : [[0, 'teste1'], [1, 'teste2']] })
    const [ paymentFormParcelList, setPaymentFormParcelList ] = useState()

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
                'parcel' : []

            },{
                'id' : 2,
                'description' : 'Cartao debito',
                'parcel' : []

            },{
                'id' : 3,
                'description' : 'Cartao credito',
                'parcel' : [
                    [1, '1x credito'],
                    [2, '2x credito']
                ]
            },{
                'id' : 4,
                'description' : 'Pix',
                'parcel' : [
                    [1, '1x pix'],
                    [2, '2x pix']

                ]
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
                if( paymentFormList[i].parcel.length > 0 ) {
                    console.log(" paymentFormList: ", paymentFormList[i].parcel.length)
                    tmpPaymentForm = paymentFormList[i].quantity = 1
                    sessionStorage.setItem("paymentForm", JSON.stringify( tmpPaymentForm ))
                    setPaymentFormParcelList( paymentFormList[i] )
                    setSelectQuantityParcel( true )
                    return
                }
                else {
                    tmpPaymentForm = paymentFormList[i].quantity = 1
                    sessionStorage.setItem("paymentForm", JSON.stringify( tmpPaymentForm ))
                    navigate('/order-review')
                }
            }
        }
    };

    useEffect( () => {
        getPayment()
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