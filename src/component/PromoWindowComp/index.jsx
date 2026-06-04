import styles from './PromoWindowComp.module.css';
import LabelComp from '/src/component/LabelComp'
import ButtonComp from '../ButtonComp';
import { useEffect, useState } from 'react';
import getFidelityPromo from '../../function/Buy/getFidelityPromo';

const PromoWindowComp = ({setControlFrame = undefined}) => {
    const [ fidelityTodayPromo, setFidelityTodayPromo ] = useState(undefined)

    const handleGetPromoToday = async () => {
        const fidelityResponse = await getFidelityPromo('today')
        if( !fidelityResponse ) {
            return
        }

        setFidelityTodayPromo( fidelityResponse )
    }

    const handleNotShowPromoWindow = () => {
        sessionStorage.setItem('showPromoWindow', JSON.stringify(false))
        setControlFrame( false )
    }


    const handleCloseWindow = () => {
        if( !setControlFrame ) {
            return
        }

        setControlFrame( false )
    }


    useEffect(() => {
        handleGetPromoToday()
    }, [])

    return (
        <div className={ styles.promoWindow}>
            <LabelComp 
                nameClass={ styles.promoWindowLabelTitle}
                text={"Promoção do dia"}
                
            />
            <div className={styles.promoWindowLabelDiv}>
                <label>
                    { fidelityTodayPromo && (
                        fidelityTodayPromo.description
                    )}
                </label>
            </div>

            <div className={ styles.promoWindowButtonDiv }>
                <ButtonComp
                    text={"Ok"}

                    onClickButton={ handleCloseWindow }
                />

                <ButtonComp
                    text={"não mostrar novamente"}
                    onClickButton={ handleNotShowPromoWindow }
                />
            </div>

        </div>
    )
}

export default PromoWindowComp;