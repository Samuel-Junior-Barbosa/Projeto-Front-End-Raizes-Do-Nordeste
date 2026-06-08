
import { useNavigate } from 'react-router-dom';
import styles from './SideMenu.module.css';
import { useEffect, useState } from 'react';

const SideMenu = ({nameClass = '', menuStatus=true, setShowSideMenu=undefined}) => {

    const navigate = useNavigate()
    const [ currentNameClass, setCurrentNameClass ] = useState()
    const [ menuStatusState, setMenuStatusState ] = useState( menuStatus )
    const [ currentAccount, setCurrentAccount ] = useState([])

    //let currentAccount = JSON.parse( sessionStorage.getItem('currentAccount' ))

    const options = [
        {'name' : 'Cardapio', url : '/home'},
        {'name' : 'Pedidos', url : '/orders'},
        {'name' : 'minha-conta', url : '/my-account'},
        {'name' : 'sair', url : '/logout'},
    ]

    const adminOptions = [
        {'name' : 'Cardapio', url : '/home'},
        {'name' : 'Pedidos', url : '/orders'},
        {'name' : 'Cadastro de produtos / Cardapio', url : '/manage-menu'},
        {'name' : 'Gerenciar promoção / Descontos ', url : '/manage-promotion-discount'},
        {'name' : 'minha-conta', url : '/my-account'},
        {'name' : 'sair', url : '/logout'},
    ]

    const handleChooseOption = ( option ) => {
        handleHiddinSideMenu()

        let tmpClass = ' .' + styles.SideMenuDiv;

        if( nameClass ) {
            tmpClass += ' .' + nameClass
        }
        
        
        if( currentAccount.administrator === true ) {
            for( let i = 0; i < adminOptions.length; i ++ ) {
                if( adminOptions[i].name === option ) {
                    navigate(adminOptions[i].url)
                }
                
            }
        } else {
            for( let i = 0; i < options.length; i ++ ) {
                if( options[i].name === option ) {
                    navigate(options[i].url)
                }
                
            }
        }
        
    }

    const handleHiddinSideMenu = () => {
        let tmpClass = styles.SideMenuDiv
        if( nameClass ) {
            tmpClass += ' ' + nameClass
        }
        //console.log(" HIDDIN MENU: ", menuStatus)
        //console.log(" tmpClass MENU: ", tmpClass)
        if( menuStatusState === true ) {
            tmpClass += ' ' + styles.hiddenSideMenu

            setMenuStatusState( false )
            setCurrentNameClass(  tmpClass )
            
            if( setShowSideMenu ) {
                setShowSideMenu( false )
            }
            
        }

        else {
            tmpClass += ' ' + styles.showingSideMenu
            setCurrentNameClass( tmpClass )
            setMenuStatusState( true )
            if( setShowSideMenu ) {
                setShowSideMenu( true )
            }

        }

        //currentAccount = JSON.parse( sessionStorage.getItem('currentAccount' ))
        //console.log(" CURRENT ACCOUNT: ", currentAccount)
        //console.log(" currentNameClass: ", currentNameClass)
    }


    const handleGetAccountData = () => {
        let tmpAccount = JSON.parse( sessionStorage.getItem('currentAccount') )
        setCurrentAccount( tmpAccount )

    }
    useEffect(() => {
        handleHiddinSideMenu()
    }, [menuStatus])

    
    useEffect(() => {   
        handleGetAccountData()
    }, [])

    

    return(
        <div className={ currentNameClass }>
            <ul className={ styles.SideMenuList }>
                { 
                    currentAccount.administrator  ?
                    (
                        adminOptions.map(( option, index) => (
                                <li
                                    key={index}
                                    onClick={ (e) => handleChooseOption(option.name) }
                                >
                                    {option.name}
                                </li>
                            )
                        )
                    ) : (
                        options.map(( option, index) => (
                                <li
                                    key={index}
                                    onClick={ (e) => handleChooseOption(option.name) }
                                >
                                    {option.name}
                                </li>
                            )
                        )
                    )
                }
            </ul>
        </div>
    );
}

export default SideMenu;