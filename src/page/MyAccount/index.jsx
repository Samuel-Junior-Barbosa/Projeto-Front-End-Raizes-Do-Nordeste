import styles from './MyAccount.module.css';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LabelComp from '/src/component/LabelComp'
import ButtonComp from '/src/component/ButtonComp'
import PromoWindowComp from '../../component/PromoWindowComp';



const MyAccountPage = () => {
    const navigate = useNavigate()

    const [ currentAccount, setCurrentAccount ] = useState('')
    const [ showPromoWindow, setShowPromoWindow ] = useState(false)

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

    useEffect(() => {
        let tmpAccountData = JSON.parse( sessionStorage.getItem('currentAccount'))

        if( !tmpAccountData.name ) {
            navigate('/login')
            return
        }

        setCurrentAccount( tmpAccountData )

    }, [])
    return (
        <div>
            <LabelComp
                text={'Minha conta'}
            />    

            <div className={styles.accountDiv}
            >
                <label> Olá, senhor(a) {currentAccount.name}</label>
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