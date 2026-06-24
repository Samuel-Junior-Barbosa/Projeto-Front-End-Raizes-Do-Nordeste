
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
        {'name' : 'Meus Pedidos', url : '/orders'},
        {'name' : 'minha-conta', url : '/my-account'},
        {'name' : 'sair', url : '/logout'},
    ]

    const adminOptions = [
        {'name' : 'Cardapio', url : '/home'},
        {'name' : 'Meus Pedidos', url : '/orders'},
        {'name' : 'Atualizar Pedidos', url : '/manage-user-orders'},
        {'name' : 'Cadastro de Unidades', url : '/manage-unity'},
        {'name' : 'Cadastro de Categorias', url : '/manage-category'},
        {'name' : 'Cadastro de Produtos', url : '/manage-product'},
        {'name' : 'Gerenciar promoção / Descontos ', url : '/manage-promotion-discount'},
        {'name' : 'minha-conta', url : '/my-account'},
        {'name' : 'sair', url : '/logout'},
    ]
    const attendantOptions = [
        {'name' : 'Cardapio', url : '/home'},
        {'name' : 'Meus Pedidos', url : '/orders'},
        {'name' : 'Atualizar Pedidos', url : '/manage-user-orders'},
        {'name' : 'minha-conta', url : '/my-account'},
        {'name' : 'sair', url : '/logout'},
    ]

    const handleChooseOption = ( option ) => {
        handleHiddinSideMenu()

        let tmpClass = ' .' + styles.SideMenuDiv;
        let tmpOptions = [];

        if( nameClass ) {
            tmpClass += ' .' + nameClass
        }
        
        try {
            if( currentAccount.administrator === true ) {
                tmpOptions = [...adminOptions ]
            } 
            else if ( currentAccount.attendant === true) {
                tmpOptions = [...attendantOptions ]
            }
            else {
                tmpOptions = [...options ]
            }
        } catch {
            tmpOptions = [...options ]
        }
        //console.log(" TMP OPTIONS: ", tmpOptions)
        for( let i = 0; i < tmpOptions.length; i ++ ) {
            if( tmpOptions[i].name === option ) {
                navigate(tmpOptions[i].url)
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
            handleGetAccountData()
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
                    currentAccount.administrator && (
                        adminOptions.map(( option, index) => (
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
                 { currentAccount.attendant && (
                        attendantOptions.map(( option, index) => (
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

                { !currentAccount.administrator && !currentAccount.attendant  && (
                        options.map(( option, index) => (
                                <li
                                    key={index}
                                    onClick={ (e) => handleChooseOption(option.name) }
                                >
                                    {option.name}
                                </li>
                            )
                        )
                )}
            </ul>
        </div>
    );
}

export default SideMenu;