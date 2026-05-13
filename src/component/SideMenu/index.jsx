
import { useNavigate } from 'react-router-dom';
import styles from './SideMenu.module.css';

const SideMenu = ({nameClass = ''}) => {

    const navigate = useNavigate()

    const options = [
        {'name' : 'Pedidos', url : '/orders'},
        {'name' : 'configuração', url : '/home'},
        {'name' : 'minha-conta', url : '/my-account'},
        {'name' : 'sobre', url : '/about'},

        
    ]

    return(
        <div className={styles.SideMenuDiv + ' ' + nameClass}>
            <ul className={ styles.SideMenuList }>
                { options.map(( option, index) => (
                    <li
                        key={index}
                        onClick={ (e) => navigate(option.url) }
                    >
                        {option.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SideMenu;