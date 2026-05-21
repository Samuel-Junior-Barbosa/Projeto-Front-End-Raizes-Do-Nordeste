import { useNavigate } from 'react-router-dom';
import styles from './FinishOrder.module.css'
import CircularProgress from '/src/component/CircularProgress';
import LabelComp from '/src/component/LabelComp'

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ButtonComp from '../../component/ButtonComp';



const FinishOrderPage = () => {
    const [progress, setProgress] = useState(0);
    const [ validationPayment, setValidationPayment ] = useState( false )
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const navigate = useNavigate()

    const paymentValidationSimulation = async () => {
        for( let i = 0; i < 110; i += 10 ) {
            setProgress(i)
            await sleep(500)
        }


        setValidationPayment( true )
    }

    const finishValdiation = () => {
        let tmpShoppingCart = JSON.parse( sessionStorage.getItem("shoppingCart"))
        let tmpTotal = JSON.parse( sessionStorage.getItem('orderTotalCost'))
        let tmpOrders = JSON.parse( localStorage.getItem("orders") )
        let maxIdOrder = 0
        if( !Array.isArray(tmpOrders) ) {
            tmpOrders = []
        }

        for( let i = 0; i < tmpOrders.length; i ++ ) {
            if( tmpOrders[i].id > maxIdOrder ) {
                maxIdOrder = tmpOrders[i].id
            }
        }

        let tmpOrder = {
            'id' : maxIdOrder +1,
            'itens' : tmpShoppingCart,
            'totalCost' : tmpTotal,
            'status' : 'a confirmar'
        }
        //console.log(" TMP ORDERS1: ", tmpOrder)
        tmpOrders.push( tmpOrder )
        //console.log(" TMP ORDERS2: ", tmpOrder)
        localStorage.setItem("orders", JSON.stringify( tmpOrders ))
    
        sessionStorage.setItem('shoppingCart', JSON.stringify( []) )
    }

    const handleGoToOrderList = () => {
        navigate('/track-order')
    }

    useLayoutEffect(() => {
        async function payValidation()  {
            await paymentValidationSimulation()
        }

        payValidation()
    }, [])


    useEffect(() => {
        if( validationPayment ) {
            finishValdiation()
        }
    }, [validationPayment])


  return (
    <div className={ styles.progressCircleDiv}
    >   
        <div className={ progress < 100 ? styles.subProgressCircleDiv : styles.hiddenComp }
        >
            <CircularProgress progress={progress} />
            <label> Validando pagamento... </label>
        </div>

        
        <div className={ progress < 100 ? styles.hiddenComp : styles.thankDiv }
        >
            <label> Pagamento Realizado com sucesso. <br/> Obrigado pela preferência! </label>
        </div>


        <ButtonComp
            nameClass={ progress < 100 ? styles.hiddenComp : styles.showingComp}
            text={"Acompanhar pedido"}
            onClickButton={ handleGoToOrderList }
        />

    </div>
  );
}

export default FinishOrderPage;