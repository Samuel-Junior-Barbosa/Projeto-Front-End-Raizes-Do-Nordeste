import styles from './ManageProductPage.module.css';
import LabelComp from '/src/component/LabelComp';

const ManageProductPage = () => {


    return( 
        <div className={styles}>
            <LabelComp
                text={'Gerenciar produtos'}
            />

        </div>
    )
}


export default ManageProductPage;