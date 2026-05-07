import { useEffect, useState } from 'react';
import styles from './ChooseItem.module.css';

import { useLocation, useNavigate } from "react-router-dom";
import ButtonComp from '../../component/ButtonComp';

const ChooseItem = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const [ productQuantity, setProductQuantity ] = useState(1)
    const { id, produto, precovenda, ingredientes } = location.state || { id : 0, produto : '', precovenda : '', ingredientes : [] }
    
    const handleGoBack = () => {
        navigate( -1 )
    }

    const handleAddItemOnCar = () => {
        console.log(" ADICIONANDO ITEM AO CARRINHO ID:", id)
        console.log(" ADICIONANDO ITEM AO CARRINHO produto: ", produto)
        console.log(" ADICIONANDO ITEM AO CARRINHO precovenda: ", precovenda)
        console.log(" ADICIONANDO ITEM AO CARRINHO productQuantity: ", productQuantity)
        let added = false        
        let tmp_cart_list = JSON.parse(localStorage.getItem("shoppingCart"))
        for( let i = 0; i < tmp_cart_list.length; i ++ ) {
            if( tmp_cart_list[i].id === id ) {
                tmp_cart_list[i].quantidade += productQuantity
                added = true
            }
        }

        if( !added ) {
            tmp_cart_list.push({
                'id': id,
                'produto' : produto,
                'precovenda' : precovenda,
                'quantidade' : productQuantity
            })            
            added = true
        }

        localStorage.setItem("shoppingCart", JSON.stringify(tmp_cart_list))
  

        handleGoBack()
        
    }



    useEffect(() => {
        //console.log(" produto: ", produto)
        //console.log(" precovenda: ", precovenda)
        //console.log(" ingredientes: ", ingredientes)

        //import img_data from (`/src/assets/pratos/${id}`)
    }, [])

    return (
        <div className={styles.ChooseItemDivMain}>
            <div className={styles.foodImageDiv}>
                <img src={`/src/assets/pratos/${id}-512px.jpg`} />
                {/* <label> Imagem do prato</label> */}
            </div>
            <label className={styles.productName}> PRODUTO: {produto} </label>
            <label className={styles.description}> DESCRIÇÃO: { Array.isArray(ingredientes) && (
                ingredientes.map((item, i) => (
                item
            )))}</label>
            <label className={styles.saleValue}> Por: R${precovenda}</label>
            
            <div className={styles.productQuantity}>
                <label > Quantidade: </label>
                <input
                    min={1}
                    max={1000}
                    type={'number'}
                    value={ productQuantity }
                    onChange={ (e) => setProductQuantity(Number(e.target.value))}
                />
            </div>

            <ButtonComp
                text={"Adicionar ao pedido"}
                onClickButton={ handleAddItemOnCar }
                nameClass={styles.ChooseButtonAction}
            />

            <ButtonComp
                text={"Voltar"}
                onClickButton={ handleGoBack }
                nameClass={styles.ChooseButtonAction}
            />


        </div>
    )
}

export default ChooseItem;