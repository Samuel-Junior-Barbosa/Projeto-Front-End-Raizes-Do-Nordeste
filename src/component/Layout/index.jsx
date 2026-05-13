import styles from './Layout.module.css';

import BottomMenu from '/src/component/BottomMenu';
import { Outlet } from 'react-router-dom';
import SideMenu from '/src/component/SideMenu';
import { useState } from 'react';


const Layout = () => {
    const [ showSideMenu, setShowSideMenu ] = useState( false )

    return (
        <div className={styles.LayoutDivMain}>
            <header>

            </header>
            <main>
                <SideMenu
                    nameClass= { showSideMenu ? styles.showingSideMenu : styles.hiddenSideMenu}
                />
                <Outlet />
            </main>

            <BottomMenu
                controlSideMenu={ setShowSideMenu }
            />

            
        </div>
    )
};


export default Layout;  