import styles from './Layout.module.css';

import BottomMenu from '/src/component/BottomMenu';
import { Outlet } from 'react-router-dom';



const Layout = () => {
    return (
        <div className={styles.LayoutDivMain}>
            <header>

            </header>
            <main>
                <Outlet />
            </main>

            <BottomMenu/>

            
        </div>
    )
};


export default Layout;  