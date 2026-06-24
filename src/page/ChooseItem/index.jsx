import { useEffect, useState } from 'react';
import styles from './ChooseItem.module.css';

import { useLocation, useNavigate } from "react-router-dom";
import ButtonComp from '../../component/ButtonComp';

const ChooseItem = () => {

    const location = useLocation()
    const navigate = useNavigate()

    const [ productQuantity, setProductQuantity ] = useState(1)
    const { unityId, id, produto, precovenda, ingredientes } = location.state || { unityId : 0, id : 0, produto : '', precovenda : '', ingredientes : [] }
    
    const handleGoBack = () => {
        navigate( -1 )
    }

    const handleAddItemOnCar = () => {
        //console.log(" ADICIONANDO ITEM AO CARRINHO ID:", id)
        //console.log(" ADICIONANDO ITEM AO CARRINHO produto: ", produto)
        //console.log(" ADICIONANDO ITEM AO CARRINHO precovenda: ", precovenda)
        //console.log(" ADICIONANDO ITEM AO CARRINHO productQuantity: ", productQuantity)
        let added = false        
        let tmp_cart_list = JSON.parse(sessionStorage.getItem("shoppingCart"))
        //console.log(" TMP CART LIST ADD ITEM: ", tmp_cart_list)

        if( tmp_cart_list.unityId !== 0 && tmp_cart_list.unityId != unityId ) {
            alert(" Não é possivel fazer pedidos de unidades diferentes. Faça 1 pedido em 1 unidade depois faça outro na proxima unidade que deseja.")
            return
        }

        if( !tmp_cart_list.products ) {
            tmp_cart_list.unityId= unityId
            tmp_cart_list.products = [{
                'id': id,
                'produto' : produto,
                'precovenda' : precovenda,
                'quantidade' : productQuantity
            }]
            added = true

        }

        for( let i = 0; i < tmp_cart_list.products.length; i ++ ) {
            if( tmp_cart_list.products[i].id === id ) {
                tmp_cart_list.products[i].quantidade += productQuantity
                added = true
            }
        }

        if( !added ) {
            tmp_cart_list.unityId = unityId
            tmp_cart_list.products.push({
                'id': id,
                'produto' : produto,
                'precovenda' : precovenda,
                'quantidade' : productQuantity
            })
            added = true
        }

        sessionStorage.setItem("shoppingCart", JSON.stringify(tmp_cart_list))
  

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
                <img src={`/assets/pratos/unidades/${unityId}/${id}-512px.jpg`} />
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