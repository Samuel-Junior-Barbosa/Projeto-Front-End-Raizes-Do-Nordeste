import styles from './ManagePromotionDiscount.module.css';
import LabelComp from '/src/component/LabelComp';

const ManagePromotionDiscount = () => {


    return( 
        <div className={styles}>
            <LabelComp
                text={'Gerenciar promoções'}
            />

        </div>
    )
}


export default ManagePromotionDiscount;