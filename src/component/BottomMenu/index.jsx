
import ButtonComp from '../ButtonComp';
import styles from './BottomMenu.module.css';
import menuIcone from '/assets/barra-de-menu-480px.png';
import shopping_car from '/assets/shopping-carts_120px.png';
import settingsIcon from '/assets/menu.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const BottomMenu = ({controlSideMenuState = false, controlSideMenu = undefined, controlHiddenScroll=document.documentElement}) => {

    const [ productQuantityOnList, setProductQuantityOnList ] = useState(0);
    const navigate = useNavigate()

    const [ showSideMenu, setShowSideMenu ] = useState( controlSideMenuState )
    const [ hidden, setHidden ] = useState(false)

    const handleGoToMenuPage = () => {
        if( !controlSideMenu ) {
            return
        }

        if( showSideMenu ) {
            setShowSideMenu( false )
            controlSideMenu( false )
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
    if( !tmp_cart_list ) {
        let tmp_template_cart = { 
            "unityId" : 0,
            "products" : []
        }
        sessionStorage.setItem('shoppingCart', JSON.stringify( tmp_template_cart))
        tmp_cart_list = tmp_template_cart
    }
    let tmp_count = 0
    let tmp_total = 0
    
    
    if( tmp_cart_list.products ) {
        //console.log(" tmp_cart_list: ", tmp_cart_list.products)
        for( let i = 0; i < tmp_cart_list.products.length; i ++ ) {
            tmp_count += tmp_cart_list.products[i].quantidade
        }
    }
    
    
    tmp_total = tmp_count

    useEffect(() => {

        setProductQuantityOnList( tmp_total )
        //console.log(" LSITA DE PRODUTOS ESCOLHIDOS: ", )
        //console.log(" QUANTIDADE DE PRODUTOS ESCOLHIDOS: ", tmp_total)

    }, [tmp_total])



    useEffect(() => {
        let lastScroll = 0;
        const handleScroll = () => {
            const windowWidth = window.innerWidth;
            const windowHeight= window.innerHeight
            
            if( windowWidth >= 660 && windowHeight >= 660) {
                //console.log(" windowWidth: ", windowWidth) ||
                console.log(" windowHeight: ", windowHeight)
                setHidden( false )
                return
            }


            const currentScroll = controlHiddenScroll.scrollTop;
            console.log(" CURRENT SCROLL: ", currentScroll)
            if( currentScroll > lastScroll && currentScroll > 30 ) {
                setHidden( true );
            } else {
                setHidden( false )
            }
            lastScroll = currentScroll <= 0 ? 0 : currentScroll;
        }

        controlHiddenScroll.addEventListener( 'scroll', handleScroll)
        return () => controlHiddenScroll.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className={styles.BottomMenuDivMain}
            style={{
                bottom: hidden ? '-50%' : '0'
            }}
        >
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
            <div className={ styles.cartButtonDiv }>
                { (productQuantityOnList > 0) && (
                    <label
                        className={styles.countProductCart}
                    >
                        {productQuantityOnList}
                    </label>
                )}
                <ButtonComp
                    nameClass={styles.bottomMenuButtonCartButton}
                    idValue={styles.shoppingCarButton}
                    icon={shopping_car}
                    onClickButton={ handleGoToCar }
                />
                
            </div>
        </div>
    )
};

export default BottomMenu;