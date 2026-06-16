import  styles from './RegisterUser.module.css';
import LabelComp from '/src/component/LabelComp';
import ButtonComp from '/src/component/ButtonComp';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import createNewUser from '../../function/Data/Set/createNewUser';
import validEmailUsed from '../../function/Account/Valid/validEmailUsed';




const RegisteruserPage = () => {
    const navigate = useNavigate()

    const [ accountName, setAccountName ] = useState('')
    const [ accountPassword, setAccountPassword ] = useState('')
    const [ accountPasswordConfirm, setAccountPasswordCofirm ] = useState('')
    const [ accountEmail, setAccountEmail ] = useState('')
    const [ accountNumber, setAccountNumber ] = useState('')
    const [ lgpdTerm, setLgpdTerm ] = useState( false )
    const [ lgpdAuthenticationTerm, setAuthenticationTerm ] = useState( false )
    const [ lgpdOrderQueryTern, setLgpdOrderQueryTern ] = useState( false )
    const [ lgpdFidelityTerm, setLgpdFidelityTerm ] = useState( false )

    const handleAcceptLgpdTerm = ( e ) => {
        //console.log(" LGPD: ", lgpdTerm, lgpdFidelityTerm)
        setLgpdTerm( e )
        setLgpdOrderQueryTern( e )
        setAuthenticationTerm( e )
    }

    const handleCreateAccount = async () => {
        if( !lgpdTerm ) {
            alert(" Antes de criar a conta, aceite nossos termos de privacidade")
            return
        }

        
        if( (!accountPassword || !accountPasswordConfirm) || ( accountPassword.length < 8) ) {
            console.log(" CURRENT PASSWORD: ", accountPassword, accountPassword.length)
            alert(" Digite uma senha valida! no minimo 8 caracter")
            return 
        }


        if( accountPassword != accountPasswordConfirm ) {
            alert(" A senha está diferente da senha confirmada. Verifique ambas e tente novamente")
            return 
        }

        let response = await validEmailUsed( accountEmail )
        if( response ) {
            alert("O email inserido já existe, tente usar outro email")
            return
        }

        await createNewUser( accountName, accountPassword, accountEmail, lgpdAuthenticationTerm, lgpdOrderQueryTern, lgpdFidelityTerm,  )
        alert(" Conta criada com sucesso!")
        navigate(-1)
    }

    const handleCancelCreateAccount = () => {
        navigate(-1)
    }


    return (
        <div className={ styles.RegisterUserMainDiv }>

            <LabelComp
                text={"Cadastro de usuario"}
            />
            
            <div className={ styles.RegisterUserDiv }>

                <div className={ styles.inputInfo}>
                    <label className={styles.labelInformation}> Nome completo: </label>
                    <input
                        type={'text'}
                        onChange={(e) => setAccountName(e.target.value)}
                    />
                </div>

                <div className={ styles.inputInfo}>
                    <label className={styles.labelInformation}> Numero de telefone: </label>
                    <input
                        type={'text'}
                        onChange={(e) => setAccountNumber(e.target.value)}
                    />
                </div>
                <div className={ styles.inputInfo}>
                    <label className={styles.labelInformation}> E-Mail: </label>
                    <input
                        type={'text'}
                        onChange={(e) => setAccountEmail(e.target.value)}
                    />
                </div>

                <div className={ styles.inputInfo}>
                    <label className={styles.labelInformation}> Senha: </label>
                    <input
                        type={'password'}
                        value={ accountPassword }
                        onChange={(e) => setAccountPassword(e.target.value)}
                    />
                </div>

                <div className={ styles.inputInfo}>
                    <label className={styles.labelInformation}> confirme a senha: </label>
                    <input
                        type={'password'}
                        value={ accountPasswordConfirm}
                        onChange={(e) => setAccountPasswordCofirm(e.target.value)}
                    />
                </div>

                <div className={ styles.lgpdDiv }>

                    <div>
                        <label> Você concorda que seus dados possam ser utilizados para: <br/>
                        - participação no programa de fidelidade <br />
                        - aplicara descontos com base nas compras realizadas <br />

                        Eu concordo <br />
                        <input
                            type={'checkbox'}
                            value={lgpdFidelityTerm}
                            onChange={ (e) => setLgpdFidelityTerm( e.target.checked ) }
                        />
                        </label>                        
                    </div>
                    <div>
                        <label> Você concorda que seus dados possam ser utilizados para: <br/>
                        - Autenticação no sistema  <br />
                        - realização de pagamento <br />
                        - realização de pedidos <br /> 
                        Ao continuar, você concorda com nossa Politica de Privacidade: <br /> 
                        <label> Eu concordo</label> <br />
                        <input
                            type={'checkbox'}
                            value={lgpdTerm}
                            onChange={ (e) => handleAcceptLgpdTerm( e.target.checked ) }
                            required
                        /> 
                        </label>
                    </div>


                </div>
            </div>


            <div className={ styles.bottomButton }>
                <ButtonComp 
                    text={"Criar"}
                    onClickButton= { handleCreateAccount }
                />

                <ButtonComp 
                    text={"Cancelar"}
                    onClickButton= { handleCancelCreateAccount }
                />
            </div>
        </div>
    );
}


export default RegisteruserPage;