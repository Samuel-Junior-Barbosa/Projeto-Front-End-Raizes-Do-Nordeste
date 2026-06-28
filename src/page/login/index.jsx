import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ButtonComp from "../../component/ButtonComp";
import styles from "./login.module.css";

import LabelComp from '/src/component/LabelComp'
import { useEffect, useRef, useState } from "react";

import simulationLoginApi from "/src/function/Account/Get/loginApi";

const loginPage = () => {

    const firstInputFocus = useRef(null)
    const secondInputFocus = useRef(null)

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const beforePage = location.key !== 'default'

    
    const handleLogin = async () => {
        //console.log(" LOGIN... ", username, password)
        const response = await simulationLoginApi( username, password )
        //console.log(" HANDLE LOGIN: ", response)
        if( response.status === 0 && response.content.logged === true ) {
            //console.log(" LOGIN FOUND: ", response)
            sessionStorage.setItem('currentAccount', JSON.stringify( response.content.data ) )
            
            if( beforePage ) {
                //console.log(" RETURN PAGE", location, navigate)
                setTimeout(() => {
                    //console.log(" RETURNING....")
                    //console.log(" ROUTES: ", location)
                    navigate( -1 )
                }, 100)
                
            }

            else {
                navigate('/home')
            }
            //console.log(" GO TO HOME PAGE")
            
        }
        else {
            alert("Informações incorretas, tente novamente")
        }

        //console.log(" DATA LOGIN: ", response)
    }

    const handleChangeInput = ( key ) => {
        //console.log(" KEY PRESSED: ", key)
        if( key === 'Enter' || key === 'NumpadEnter' ) {
            secondInputFocus.current?.focus()
        }
    }

    const handlePasswordKeydown = ( key ) => {
        if( key === 'Enter' || key === 'NumpadEnter' ) {
            handleLogin()
        }
    }


    return(
        <div
            className={ styles.loginMainDiv }
        >
            <LabelComp
                nameClass={ styles.loginTitle }
                text={'LOGIN'}
            />

            <div className={styles.loginDiv}
            >
                
                <label> Usuario: </label>
                <input
                    ref={ firstInputFocus }
                    type={"text"}
                    value={username}
                    onChange={ (e) => setUsername(
                            e.target.value.trim().toLowerCase()
                    )}
                    onKeyDown={ (e) => handleChangeInput( e.key )}
                />
                <label> Senha: </label>
                <input
                    ref={ secondInputFocus }
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