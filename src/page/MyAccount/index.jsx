import styles from './MyAccount.module.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LabelComp from '/src/component/LabelComp'
import ButtonComp from '/src/component/ButtonComp'
import PromoWindowComp from '../../component/PromoWindowComp';
import getBuyPoint from '../../function/Account/Get/getBuyPoints';
import getFidelityPromo from '../../function/Buy/getFidelityPromo';



const MyAccountPage = () => {
    const navigate = useNavigate()

    const [ currentAccount, setCurrentAccount ] = useState('')
    const [ showPromoWindow, setShowPromoWindow ] = useState(false)
    const [ pointToPromo, setPointToPromo ] = useState( 0 )
    
    const [ fidelityPoint, setFidelityPoint ] = useState( 0 )
    const [ currentPoint, setCurrentPoint ] = useState( 0 )

    const [ statusFidelityPoint, setStatusFidelityPoint ] = useState( false )

    const handleLogout = () => {
        navigate('/logout')
        return
    }

    const handleOrders = () => {
        navigate('/orders')
        return
    }

    const handleGoToPromocoes = () => {
        setShowPromoWindow( true )
        return 
    }

    const handleVerifyFidelity = async () => {
        const tmpCurrentAccount = JSON.parse( sessionStorage.getItem('currentAccount') ) 
        const response = await getBuyPoint( tmpCurrentAccount.accountId )
        const tmpFidelityPoint = await getFidelityPromo( 'today' )

        setFidelityPoint( tmpFidelityPoint.buyPoint )
        setCurrentPoint( response )

        //console.log(" fidelityPoint: ", fidelityPoint)
        //console.log(" response: ", response)
        const result = tmpFidelityPoint.buyPoint - response 
        setPointToPromo( result )
        
        if( result ) {
            setStatusFidelityPoint( true )
        }

        else {
            setStatusFidelityPoint( false )
        }
    }

    useEffect(() => {
        let tmpAccountData = JSON.parse( sessionStorage.getItem('currentAccount'))
        if( !tmpAccountData.name ) {
            navigate('/login')
            return
        }

        setCurrentAccount( tmpAccountData )
        handleVerifyFidelity()
    }, [])
    return (
        <div>
            <LabelComp
                text={'Minha conta'}
            />    

            <div className={styles.accountDiv}
            >
                <label> Olá, senhor(a): ( {currentAccount.name} ) </label>
                <hr/>
                <div>
                    { statusFidelityPoint ? (
                            <label>    Você tem ({ currentPoint }) pontos acumulados. Na sua proxima compra, ganhará um desconto por ter acumulado {fidelityPoint} pontos de fidelidade </label>
                        ) : (
                            <label htmlFor="">Resta { pointToPromo } pontos para conseguir um desconto na proxima compra</label>
                        )
                    }
                </div>                
                <hr/>
                <div className={styles.buttonGrid}>
                    <ButtonComp
                        nameClass={styles.accountButton}
                        text={"Meus pedidos"}
                        onClickButton={ handleOrders}
                    />
                    <ButtonComp
                        nameClass={styles.accountButton}
                        text={"Promoções"}
                        onClickButton={ handleGoToPromocoes }
                    />
                    <ButtonComp
                        nameClass={styles.accountButton}
                        text={"Sair"}
                        onClickButton={ handleLogout }
                    />

                </div>

            </div>

            { showPromoWindow && (
                <PromoWindowComp
                    setControlFrame = { setShowPromoWindow }
                />
            )}


            <label className={ styles.MyAccountFooter}>
                Para ajuda duvidas sobre o pedidos, entre em contato com a loja no numero: (00) 0000000000 
            </label>
        </div>

    );
}


export default MyAccountPage;