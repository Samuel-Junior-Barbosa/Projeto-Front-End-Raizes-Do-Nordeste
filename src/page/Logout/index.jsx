import { useEffect } from 'react';
import styles from './Logout.module.css';
import LabelComp from '/src/component/LabelComp';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {

    const navigate = useNavigate()

    useEffect(() => {
        let tmpAccountTemplate = {
            'name' : '',
            'lgpdConcentiment' : {
                'systemAuthentication' : false,
                'placingOrders' : false,
                'participationInTheLoyaltyProgram' : false,
                'askedToUserLgpdTerm' : false,
                'askedToUserCookies' : false,
            }
        }
        sessionStorage.setItem('currentAccount', JSON.stringify( tmpAccountTemplate ))
        setTimeout(() => {
            navigate('/home')
        }, 800)
    }, [])

    return (
        <div>
            <LabelComp
                text={"Desconectado com sucesso."}
            />
        </div>
    );
}


export default LogoutPage;