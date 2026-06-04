import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ButtonComp from "../../component/ButtonComp";
import styles from "./login.module.css";

import LabelComp from '/src/component/LabelComp'
import { useEffect, useState } from "react";

import simulationLoginApi from "/src/function/Account/loginApi";

const loginPage = () => {

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const beforePage = location.key !== 'default'

    
    const handleLogin = async () => {
        console.log(" LOGIN... ", username, password)
        const response = await simulationLoginApi( username, password )
        console.log(" HANDLE LOGIN: ", response)
        if( response.status === 0 && response.content.logged === true ) {
            console.log(" LOGIN FOUND: ", response)
            sessionStorage.setItem('currentAccount', JSON.stringify( response.content.data ) )
            
            if( beforePage ) {
                //console.log(" RETURN PAGE", location, navigate)
                setTimeout(() => {
                    //console.log(" RETURNING....")
                    navigate( -2 )
                }, 500)
                
            }

            else {
                navigate('/home')
            }
            //console.log(" GO TO HOME PAGE")
            
        }

        //console.log(" DATA LOGIN: ", response)
    }


    const handlePasswordKeydown = ( key ) => {
        if( key === 'Enter' || key === 'EnterNumpad' ) {
            handleLogin()
        }
    }


    return(
        <div
            className={ styles.loginMainDiv }
        >
            <LabelComp
                text={'LOGIN'}
            />

            <div className={styles.loginDiv}
            >
                
                <label> Usuario: </label>
                <input
                    type={"text"}
                    value={username}
                    onChange={ (e) => setUsername(
                            e.target.value.trim().toLowerCase()
                    )}
                />
                <label> Senha: </label>
                <input
                    type={"password"}
                    value={password}
                    onChange={ (e) => setPassword(
                        e.target.value.trim()
                    )}
                    onKeyDown={ (e) => handlePasswordKeydown(e.key)}
                />
            </div>


            <div className={styles.loginFunctionButtonDiv}>
                <ButtonComp
                    text={'Entrar'}
                    onClickButton={
                        handleLogin
                    }
                />
                <ButtonComp
                    text={'Criar conta'}
                    onClickButton={ () => {
                        navigate('/create-account')
                    }}
                />


            </div>
            <label className={ styles.forgetPasswordAlert}>
                Em caso de esquecimento da senha, entre em contato conosco para poder ajudar
            </label>
        </div>
    );
}

export default loginPage;