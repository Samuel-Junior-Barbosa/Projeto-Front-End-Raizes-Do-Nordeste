import  styles from './RegisterUser.module.css';
import LabelComp from '/src/component/LabelComp';





const RegisteruserPage = () => {

    return (
        <div className={ styles.RegisterUserMainDiv }>

            <LabelComp
                text={"Cadastro de usuario"}
            />
            
            <div className={ styles.RegisterUserDiv }>
                <label> Nome completo: </label>
                <input
                    type={'text'}
                />

                <label> Numero de telefone: </label>
                <input
                    type={'text'}
                />
                <label> E-Mail: </label>
                <input
                    type={'text'}
                />

                <label> Senha: </label>
                <input
                    type={'text'}
                />

                <label> confirme a senha: </label>
                <input
                    type={'text'}
                />


            </div>
        </div>
    );
}


export default RegisteruserPage;