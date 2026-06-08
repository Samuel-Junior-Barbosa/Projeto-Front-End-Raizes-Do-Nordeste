import styles from './CreateProductPage.module.css';
import LabelComp from '/src/component/LabelComp';

const CreateProductPage = () => {


    return( 
        <div className={styles}>
            <LabelComp
                text={'Criar um novo produtos'}
            />

        </div>
    )
}


export default CreateProductPage;