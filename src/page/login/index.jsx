import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ButtonComp from "../../component/ButtonComp";
import styles from "./login.module.css";

import LabelComp from '/src/component/LabelComp'
import { useEffect, useState } from "react";

const loginPage = () => {

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const beforePage = location.key !== 'default'

    const [loginAccountData, setLoginAccountData ]  = useState([])
    

    const simulationLoginApi = ( user, pass ) => {
        let data = {
            'status' : 0,
            'content' : { 
                'data' : [],
                'logged' : false
            }
        }

        console.log(" API LOGIN: ", user, pass)

        for( let i = 0; i < loginAccountData.length; i ++ ) {
            if( user === loginAccountData[i].name && pass === loginAccountData[i].password) {
                data.content.logged = true
                data.content.data = loginAccountData[i]
                return data
            }
        }

        return data

    }

    const handleLogin = () => {
        //console.log(" LOGIN... ", username, password)
        const response = simulationLoginApi( username, password )
        if( response.status === 0 && response.content.logged === true ) {
            //console.log(" LOGIN FOUND: ", response)
            sessionStorage.setItem('currentAccount', JSON.stringify( response.content.data ) )
            
            if( beforePage ) {
                //console.log(" RETURN PAGE")
                setTimeout(() => {
                    navigate( -1 )
                }, 10)
                return
            }
            //console.log(" GO TO HOME PAGE")
            navigate('/home')
            return
        }

        //console.log(" DATA LOGIN: ", response)
    }


    const handlePasswordKeydown = ( key ) => {
        if( key === 'Enter' || key === 'EnterNumpad' ) {
            handleLogin()
        }



    }

    useEffect(() => {
        const mockDataLoginAccountData = [
            {
                'name': 'admin',
                'password' : 'admin',
            },
            {
                'name' : 'clienteteste',
                'password' : '123'
            }
        ]

        if( Array.isArray(JSON.parse( localStorage.getItem('mockData'))) && JSON.parse( localStorage.getItem('mockData')).length <= 0  ) {
            console.log(" UPDATE MOCK DATA")
            localStorage.setItem('mockData', JSON.stringify( mockDataLoginAccountData ))
        }

        let tmpMockData = JSON.parse(localStorage.getItem("mockData"))
        //console.log(" tmpMOckData: ", tmpMockData)
        setLoginAccountData( tmpMockData )
    }, [])

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
                    text={'ENTRAR'}
                    onClickButton={ handleLogin }
                />
                <ButtonComp
                    text={'Esqueci minha senha'}
                />
                <ButtonComp
                    text={'Criar conta'}
                />
            </div>

        </div>
    );
}

export default loginPage;