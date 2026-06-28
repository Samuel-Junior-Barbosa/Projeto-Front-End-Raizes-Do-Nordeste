import styles from './Layout.module.css';

import BottomMenu from '/src/component/BottomMenu';
import { Outlet } from 'react-router-dom';
import SideMenu from '/src/component/SideMenu';
import { useEffect, useState } from 'react';
import CookieWindow from '../CookieWindow';
import ButtonComp from '../ButtonComp';
import menuIcone from '/assets/barra-de-menu-480px.png';


const Layout = () => {
    const [ hiddenSideMenu, setHiddenSideMenu ] = useState( true )
    const [ showCookiesWindow, setShowCookiesWindow ] = useState( false )
    const [ windowWidth, setWindowWidth ] = useState(0)
    const [ windowHeight, setWindowHeight ] = useState(0)

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
        //console.log(" TMP DATA: ", tmpData)
        try {
            if( tmpData.lgpdConcentiment.askedToUserCookies === false ) {
                setShowCookiesWindow( true )
            }

            else {
                setShowCookiesWindow( false )
            }
        } catch {
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




        //console.log(" TMP DATA: ", tmpData)
        let tmpWindowWidth = window.innerWidth
        let tmpWindowHeight = window.innerHeight
        setWindowWidth( tmpWindowWidth )
        setWindowHeight( tmpWindowHeight  )
        //console.log(" WIDTH: ", tmpWindowWidth, windowWidth)
        //console.log(" HEIGHT: ", tmpWindowHeight, windowHeight)
        if( tmpWindowWidth >= 1000 ) {
            setHiddenSideMenu(true)
        }
    }, [])


    useEffect(() => {
        
        const getWindowSize = () => {
            setWindowWidth( window.innerWidth );
            setWindowHeight( window.innerHeight );
        };
        window.addEventListener("resize", getWindowSize);
        return () => window.removeEventListener("resize", getWindowSize);
    }, []);

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
                { (windowWidth >= 500 && windowHeight > 500) && (
                    <>
                    <ButtonComp
                        icon={menuIcone}
                        onClickButton={ handleShowMenu }
                        nameClass={ styles.buttomShowSideMenu }
                    />
                    </>
                )}
                
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