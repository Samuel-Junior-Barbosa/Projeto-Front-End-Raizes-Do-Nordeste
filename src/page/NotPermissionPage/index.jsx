import styles from './NotPermissionPage.module.css';
import { useNavigate } from 'react-router-dom';
import ButtonComp from '../../component/ButtonComp';
import LabelComp from '/src/component/LabelComp'

const NotPermissionPage = () => {
    
    const navigate = useNavigate()

    return(
        <div className={styles.notPermissionMainDiv}>
            <LabelComp 
                text={"Você não tem permissão para acessar a pagina"}
            />

            <ButtonComp 
                text={"Voltar para a pagina inicial"}
                onClickButton={() => navigate('/home')}
            />
        </div>
    )
}

export default NotPermissionPage;