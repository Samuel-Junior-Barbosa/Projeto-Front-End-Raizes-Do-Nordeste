
import ButtonComp from '../ButtonComp';
import styles from './BottomMenu.module.css';
import menuIcone from '/src/assets/barra-de-menu-480px.png';
import shopping_car from '/src/assets/shopping-carts_120px.png';
import settingsIcon from '/src/assets/menu.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const BottomMenu = ({controlSideMenu = undefined}) => {

    const [ productQuantityOnList, setProductQuantityOnList ] = useState(0);
    const navigate = useNavigate()

    const [ showSideMenu, setShowSideMenu ] = useState( false )

    const handleGoToMenuPage = () => {
        if( !controlSideMenu ) {
            return
        }

        if( showSideMenu ) {
            setShowSideMenu( false )
            controlSideMenu(false)
        }

        else {
            setShowSideMenu( true )
            controlSideMenu( true )
        }
        

    }

    const handleGoToCar = () => {
        navigate('/cart')
    }

    const handleGoToConfiguration = () => {
        //navigate('/configuration')
        navigate('/home')

    }
    let tmp_cart_list = JSON.parse(sessionStorage.getItem("shoppingCart"))
    let tmp_count = 0
    let tmp_total = 0
    
    if( tmp_cart_list ) {
        for( let i = 0; i < tmp_cart_list.length; i ++ ) {
            tmp_count += tmp_cart_list[i].quantidade
        }

    }
    
    tmp_total = tmp_count

    useEffect(() => {

        setProductQuantityOnList( tmp_total )
        //console.log(" LSITA DE PRODUTOS ESCOLHIDOS: ", )
        //console.log(" QUANTIDADE DE PRODUTOS ESCOLHIDOS: ", tmp_total)

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
                icon={settingsIcon}
                onClickButton={ handleGoToConfiguration }
            />

            <ButtonComp 
                nameClass={styles.bottomMenuButton}
                idValue={styles.shoppingCarButton}
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
        </div>
    )
};

export default BottomMenu;