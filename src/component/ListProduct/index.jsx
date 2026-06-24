import { useEffect, useState } from 'react';
import styles from './ListProduct.module.css'
import { useNavigate } from 'react-router-dom';
import ButtonComp from '../ButtonComp';

const ListProduct = ({productListData, setProductListData=undefined, nameClass='', itemChoosedState = undefined, chooseQuantity=false, unityId=''}) => {
    
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-1)
    }

 
    const handleSelectItem = ( item ) => {
        if( itemChoosedState ) {
            itemChoosedState( [ item ] )
        }
    }

    const handleChangeItemQuantity = (id, value) => {
        let tmpProductList = [ ...productListData ] 

        for( let i = 0; i < tmpProductList.length; i ++ ) {
            //console.log(" productList id, quantity: ", id, value)
            //console.log(" tmpProductList, quantity: ", tmpProductList.length)
            if( tmpProductList[i].id == id ) {
                if( value <= 0 ) {
                    let confirmWindow = confirm(" A quantidade está menor que 1, deseja remover o item da sua lisa de compras? ")
                    if( confirmWindow ) {

                        if( tmpProductList.length > 1 ) {
                            tmpProductList.splice( i, 1 )
                        }

                        else {
                            tmpProductList.pop(0)
                        }
                        break
                        
                    }

                    value = 1

                }
                tmpProductList[i].quantidade = value

                
            }
        }
        
        //console.log( productListData ) 
        let tmpshoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart'))
        tmpshoppingCart .products = tmpProductList
        sessionStorage.setItem("shoppingCart", JSON.stringify(tmpshoppingCart))


        if( setProductListData ) {
            setProductListData( tmpProductList )
        }

    
        return;
    }


    return (
        <ul className={styles.ListProductUl + ' ' + nameClass}>
            { Array.isArray(productListData) && productListData.map((item, i) => (
                <li
                    key={i}
                    onClick={ () => (
                        handleSelectItem(item)
                    )}
                >
                    <div className={styles.foodImageDiv}>
                        <img
                            className={styles.foodImage}
                            src={`${import.meta.env.BASE_URL}assets/pratos/unidades/${unityId}/${item.id}-512px.jpg`}
                        />
                        
                        {/* <label> imagem do prato </label> */}
                        
                    </div>

                    <label
                        className={styles.labelDiv}
                    >
                        {item.produto} <br />
                        R${item.precovenda} <br />
                        { /*item.quantidade && (
                            <label> Quantidade: {item.quantidade}</label>
                        )*/}
                        <label className={styles.ingredienteLabel}>
                            { Array.isArray(item.ingredientes) && item.ingredientes.map((item2, ii) => (
                                ii === item.ingredientes.length -1 ? `${item2}` : `${item2}, `
                            ))}

                        </label>
                    </label>

                    { chooseQuantity && (
                        <div
                            className={ styles.divInputQuantity }
                        >
                            <input
                                className={styles.inputQuantity}
                                type="number"
                                value={ item.quantidade }
                                onChange={ (e) => (
                                    handleChangeItemQuantity(item.id, e.target.value)
                                )}
                            />
                            <button
                                onClick={(e) => (
                                    handleChangeItemQuantity( item.id, item.quantidade + 1)
                                )}
                            >
                                +
                            </button>
                            <button
                                onClick={(e) => (
                                    handleChangeItemQuantity( item.id, item.quantidade - 1)
                                )}
                            >
                                -
                            </button>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    
    )

};

export default ListProduct;