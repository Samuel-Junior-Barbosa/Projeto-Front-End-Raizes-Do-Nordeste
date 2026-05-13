import { useNavigate } from 'react-router-dom';
import styles from './FinishOrder.module.css'
import CircularProgress from '/src/component/CircularProgress';
import LabelComp from '/src/component/LabelComp'

import { useEffect, useRef, useState } from "react";
import ButtonComp from '../../component/ButtonComp';



const FinishOrderPage = () => {
    const [progress, setProgress] = useState(0);
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const navigate = useNavigate()

    const paymentValidationSimulation = async () => {
        for( let i = 0; i < 110; i += 10 ) {
            setProgress(i)
            await sleep(500)
        }
        sessionStorage.setItem('shoppingCart', JSON.stringify( []) )
    }

    const handleGoToOrderList = () => {
        navigate('/track-order')
    }

    useEffect(() => {
        paymentValidationSimulation()

    }, [])



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