import { useLocation, useNavigate } from 'react-router-dom';
import styles from './FinishOrder.module.css'
import CircularProgress from '/src/component/CircularProgress';
import LabelComp from '/src/component/LabelComp'

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import ButtonComp from '../../component/ButtonComp';
import setAccountOrder from '../../function/Account/Set/setAccountOrder';
import setNewOrder from '../../function/Order/Set/setNewOrder';
import getIdUser from '../../function/Account/Get/getIdUser';
import addNewBuyPoint from '../../function/Account/addNewBuyPoint';
import removeBuyPoint from '../../function/Account/removeBuyPoint';
import useFidelityPromotion from '../../function/Account/useFidelityPromotion';



const FinishOrderPage = () => {
    const [progress, setProgress] = useState(0);
    const [ validationPayment, setValidationPayment ] = useState( false )
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    const navigate = useNavigate()
    const [ currentAccount, setCurrentAccount ] = useState('')
    const [ username, setUsername ] = useState('')

    const location = useLocation()

    const { fidelityCode, useFidelityPromotionRecived } = location.state || { fidelityCode : '', useFidelityPromotionRecived : false }


    const paymentValidationSimulation = async () => {
        for( let i = 0; i < 110; i += 10 ) {
            setProgress(i)
            await sleep(200)
        }

        if( useFidelityPromotionRecived ) {
            let tmpUsername = JSON.parse( sessionStorage.getItem("currentAccount")).name
            let tmpIdUser = await getIdUser( tmpUsername )
            console.log(" TMP ID USER: ", tmpIdUser, tmpUsername)
            await useFidelityPromotion(tmpIdUser, fidelityCode)

        }
        setValidationPayment( true )

        return
        setTimeout(() => {
            navigate('/home')
        }, 1000)
    }

    const finishValdiation = async () => {
        let tmpShoppingCart = JSON.parse( sessionStorage.getItem("shoppingCart"))
        let tmpTotal = JSON.parse( sessionStorage.getItem('orderTotalCost'))
        let tmpOrders = JSON.parse( localStorage.getItem("orders") )
        let maxIdOrder = 0
        let idUser = await getIdUser( username )

        //console.log(" FINISH VALIDATION: ", idUser)
        await setNewOrder( idUser, tmpShoppingCart, tmpTotal)
        await addNewBuyPoint( idUser )
    
        sessionStorage.setItem('shoppingCart', JSON.stringify( []) )

    }

    const handleGoToOrderList = () => {
        navigate('/orders')
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

    useEffect(() => {
        let tmpAccount = JSON.parse(sessionStorage.getItem("currentAccount"))
        setCurrentAccount(tmpAccount)
        setUsername(tmpAccount.name)

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