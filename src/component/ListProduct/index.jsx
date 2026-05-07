import { useEffect } from 'react';
import styles from './ListProduct.module.css'
import { useNavigate } from 'react-router-dom';
import ButtonComp from '../ButtonComp';

const ListProduct = ({productList, nameClass=''}) => {
    
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-1)
    }

    const handleChooseFood = (productData) => {
        navigate('/choose-item', {state : productData})
    }



    useEffect(() => {
        //console.log( "PRODUCT LIST: ", productList, typeof(productList), Array.isArray(productList))
    }, [])

    return (
        <ul className={styles.ListProductUl + ' ' + nameClass}>
            { Array.isArray(productList) && productList.map((item, i) => (
                <li
                    key={i}
                >
                    <div className={styles.foodImageDiv}>
                        <img
                            className={styles.foodImage}
                            src={`/src/assets/pratos/${item.id}-512px.jpg`}
                        />
                        
                        {/* <label> imagem do prato </label> */}
                        
                    </div>

                    <label className={styles.labelDiv}
                        onClick={() => {
                            handleChooseFood(item)
                        }}
                    >
                        {item.produto} <br />
                        R${item.precovenda} <br />
                        <label className={styles.ingredienteLabel}>
                            { Array.isArray(item.ingredientes) && item.ingredientes.map((item2, ii) => (
                                ii === item.ingredientes.length -1 ? `${item2}` : `${item2}, `
                            ))}

                        </label>
                    </label>
                </li>
            ))}
        </ul>
    
    )

};

export default ListProduct;