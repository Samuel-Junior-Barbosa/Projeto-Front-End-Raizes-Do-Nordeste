import { useEffect, useLayoutEffect, useState } from "react";
import ListProduct from "../../component/ListProduct";
import LabelComp from '/src/component/LabelComp'
import styles from './ReviewCart.module.css'
import ButtonComp from "../../component/ButtonComp";
import { useNavigate } from "react-router-dom";

const ReviewCart = () => {

    const [ productList, setProductList ] = useState([])

    const navigate = useNavigate()

    let tmp_cart_list = []
    tmp_cart_list = JSON.parse(sessionStorage.getItem("shoppingCart"))
    if( !tmp_cart_list ) {
        sessionStorage.setItem('shoppingCart', '[]')
        tmp_cart_list = []
    }


    const handleFinishShop = () => {
        sessionStorage.setItem("orderTotalCost", sumProduct)
        let current_acount = JSON.parse( sessionStorage.getItem('currentAccount'));
        if( sumProduct <= 0 ) {
            alert(" Nenhum item selecionado no carrinho")
            return
            
        }
        
        else if( current_acount.name === "" ) {
            
            navigate('/login')
            return
        }

        navigate('/choose-place')
        
    }

    useEffect(() => {

        let tmp_sum = 0
        for(let i = 0; i < tmp_cart_list.length; i ++ ) {
            tmp_sum += tmp_cart_list[i].precovenda * tmp_cart_list[i].quantidade
        }
        setProductList( tmp_cart_list )

    }, [])
    


    let sumProduct = 0
    if( tmp_cart_list.length ) {
        sumProduct = JSON.parse(sessionStorage.getItem("shoppingCart")).reduce((acumulador, produto) => {
            return acumulador + (
                produto.precovenda * produto.quantidade
            )
        }, 0)
    }
    
    return (
        <div>
            <LabelComp
                text={'Carrinho de compras'}
                nameClass={styles.titleLabel}
            />
            <ListProduct
                productListData={ productList }
                setProductListData={ setProductList }
                nameClass={styles.productListDiv}
                chooseQuantity={ true }
            />

            <div
                className={ styles.bottomButton}
            >
                <LabelComp
                    nameClass={ styles.bottomLabel }
                    text={'Total: R$' + sumProduct}
                />
                <ButtonComp
                    nameClass={ styles.finishShopButton}
                    text={"Finalizar pedido"}
                    onClickButton={ handleFinishShop }
                />
            </div>
        </div>
    );
}



export default ReviewCart;