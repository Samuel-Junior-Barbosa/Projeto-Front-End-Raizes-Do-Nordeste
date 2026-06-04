
import { useNavigate } from 'react-router-dom';
import styles from './SideMenu.module.css';
import { useEffect, useState } from 'react';

const SideMenu = ({nameClass = '', menuStatus=true, setShowSideMenu=undefined}) => {

    const navigate = useNavigate()
    const [ currentNameClass, setCurrentNameClass ] = useState()
    const [ menuStatusState, setMenuStatusState ] = useState( menuStatus )

    const options = [
        {'name' : 'Cardapio', url : '/home'},
        {'name' : 'Pedidos', url : '/orders'},
        {'name' : 'minha-conta', url : '/my-account'},
        {'name' : 'sair', url : '/logout'},

        
    ]

    const handleChooseOption = ( option ) => {
        handleHiddinSideMenu()

        let tmpClass = ' .' + styles.SideMenuDiv;

        if( nameClass ) {
            tmpClass += ' .' + nameClass
        }
        
        

        for( let i = 0; i < options.length; i ++ ) {
            if( options[i].name === option ) {
                navigate(options[i].url)
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

        //console.log(" currentNameClass: ", currentNameClass)
    }
    useEffect(() => {
        handleHiddinSideMenu()
    }, [menuStatus])

    return(
        <div className={currentNameClass }>
            <ul className={ styles.SideMenuList }>
                { options.map(( option, index) => (
                    <li
                        key={index}
                        onClick={ (e) => handleChooseOption(option.name) }
                    >
                        {option.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SideMenu;