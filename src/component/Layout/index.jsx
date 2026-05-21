import styles from './Layout.module.css';

import BottomMenu from '/src/component/BottomMenu';
import { Outlet } from 'react-router-dom';
import SideMenu from '/src/component/SideMenu';
import { useEffect, useState } from 'react';


const Layout = () => {
    const [ showSideMenu, setShowSideMenu ] = useState( true )

    useEffect(() => {
        //console.log(" CHANGE SHOW MENU BUTTON: ", showSideMenu)
    }, [ showSideMenu ])

    return (
        <div className={styles.LayoutDivMain}>
            <header>

            </header>
            <main
                className={ styles.LayoutDiv}
            >
                <SideMenu

                    menuStatus={ showSideMenu }
                    setHidden={ setShowSideMenu }
                />
                <Outlet />
            </main>

            <BottomMenu
                controlSideMenuState = { showSideMenu }
                controlSideMenu={ setShowSideMenu }
            />

            
        </div>
    )
};


export default Layout;  