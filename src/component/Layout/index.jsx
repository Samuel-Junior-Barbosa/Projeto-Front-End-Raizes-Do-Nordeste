import styles from './Layout.module.css';

import BottomMenu from '/src/component/BottomMenu';
import { Outlet } from 'react-router-dom';
import SideMenu from '/src/component/SideMenu';
import { useEffect, useState } from 'react';
import CookieWindow from '../CookieWindow';
import ButtonComp from '../ButtonComp';
import menuIcone from '/src/assets/barra-de-menu-480px.png';


const Layout = () => {
    const [ hiddenSideMenu, setHiddenSideMenu ] = useState( true )
    const [ showCookiesWindow, setShowCookiesWindow ] = useState( false )

    const handleShowMenu = () => {
        if( hiddenSideMenu ) {
            setHiddenSideMenu ( false )
        }
        else { 
            setHiddenSideMenu( true )
        }
    }

    useEffect(() => {
        let tmpData = JSON.parse( sessionStorage.getItem("currentAccount") )

        if( !tmpData.accountId ) {
            tmpData = {
                "name" : '',
                "lgpdConcentiment" : {
                    "systemAuthentication": false,
                    "placingOrders": false,
                    "participationInTheLoyaltyProgram": false,
                    "askedToUserLgpdTerm" : false,
                    "askedToUserCookies" : false
                }
            }
            sessionStorage.setItem('currentAccount', JSON.stringify(tmpData) )
        }


        if( tmpData.lgpdConcentiment.askedToUserCookies === false ) {
            setShowCookiesWindow( true )
        }

        else {
            setShowCookiesWindow( false )
        }
        //console.log(" TMP DATA: ", tmpData)
        let windowWidth = window.innerWidth 
        if( windowWidth >= 1000 ) {
            setHiddenSideMenu(true)
        }
    }, [])

    return (
        <div className={styles.LayoutDivMain}>
            <header>
            </header>
            <main
                className={ styles.LayoutDiv}
            >
                
                <SideMenu

                    menuStatus={ hiddenSideMenu }
                    setHidden={ setHiddenSideMenu }
                />

                <Outlet />
                { showCookiesWindow && (
                    <CookieWindow
                        setControlFrame={ setShowCookiesWindow }
                    />
                )}
                <ButtonComp
                    icon={menuIcone}
                    onClickButton={ handleShowMenu }
                    nameClass={ styles.buttomShowSideMenu }
                />
            </main>

            <BottomMenu
                controlSideMenuState = { hiddenSideMenu }
                controlSideMenu={ setHiddenSideMenu }
                controlHiddenScroll={ document.documentElement.childNodes[2]}
            />

            
        </div>
    )
};


export default Layout;  