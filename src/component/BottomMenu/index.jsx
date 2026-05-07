
import ButtonComp from '../ButtonComp';
import styles from './BottomMenu.module.css';
import menuIcone from '/src/assets/barra-de-menu.png';
import shopping_car from '/src/assets/shopping-carts_64px.png';
import settingsIcon from '/src/assets/engrenagem.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const BottomMenu = () => {

    const [ productQuantityOnList, setProductQuantityOnList ] = useState(0);
    const navigate = useNavigate()

    const handleGoToMenuPage = () => {
        navigate('/home')

    }

    const handleGoToCar = () => {
        //navigate('/cart')
        navigate('/home')
    }

    const handleGoToConfiguration = () => {
        //navigate('/configuration')
        navigate('/home')

    }
    let tmp_cart_list = JSON.parse(localStorage.getItem("shoppingCart"))
    let tmp_count = 0
    let tmp_total = 0
    for( let i = 0; i < tmp_cart_list.length; i ++ ) {
        tmp_count += tmp_cart_list[i].quantidade
    }

    tmp_total = tmp_count

    useEffect(() => {

        setProductQuantityOnList( tmp_total )
        //console.log(" LSITA DE PRODUTOS ESCOLHIDOS: ", )
        console.log(" QUANTIDADE DE PRODUTOS ESCOLHIDOS: ", tmp_total)

    }, [tmp_total])


    return (
        <div className={styles.BottomMenuDivMain}>
            <ButtonComp 
                nameClass={styles.bottomMenuButton}
                icon={menuIcone}
                onClickButton={ handleGoToMenuPage }
            />

            <ButtonComp 
                nameClass={styles.bottomMenuButton}
                icon={shopping_car}
                onClickButton={ handleGoToCar }
            />

            { (productQuantityOnList > 0) && (
                <label
                    className={styles.countProductCart}
                >
                    {productQuantityOnList}
                </label>
            )}

            <ButtonComp 
                nameClass={styles.bottomMenuButton}
                icon={settingsIcon}
                onClickButton={ handleGoToConfiguration }
            />
        </div>
    )
};

export default BottomMenu;