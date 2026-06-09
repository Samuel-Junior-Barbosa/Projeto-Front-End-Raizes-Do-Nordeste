import styles from './ManageProductPage.module.css';
import LabelComp from '/src/component/LabelComp';

const ManageProductPage = () => {


    return( 
        <div className={styles}>
            <LabelComp
                text={'Gerenciar produtos'}
            />
            
            <div className={ styles.categoryProductList }>
                { productList && productList.map((item, i) => (
                    <ButtonComp
                        key={i}
                        text={item.name}
                        onClickButton={ () => handleSelectProduct()}
                    />
                ))}
            </div>
        </div>
    )
}


export default ManageProductPage;