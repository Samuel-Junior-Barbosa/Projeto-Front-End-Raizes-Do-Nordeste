import { useEffect, useLayoutEffect, useState } from "react";
import ListProduct from "../../component/ListProduct";
import LabelComp from '/src/component/LabelComp'
import styles from './ReviewCart.module.css'
import ButtonComp from "../../component/ButtonComp";
import { useNavigate } from "react-router-dom";

const ReviewCart = () => {

    const [ productList, setProductList ] = useState([])
    const [ shoppingCartData, setShoppingCartData ] = useState({})

    const navigate = useNavigate()

    let tmp_cart_list = []
    tmp_cart_list = JSON.parse(sessionStorage.getItem("shoppingCart"))
    if( !tmp_cart_list.products || !tmp_cart_list.products.length ) {
        let tmp_template_cart = { 
            "unityId" : 0,
            "products" : []
        }
        sessionStorage.setItem('shoppingCart', JSON.stringify( tmp_template_cart))
    }


    let sumProduct = 0
    let tmpProducts;


    if( tmp_cart_list.products ) {
        tmpProducts = JSON.parse(sessionStorage.getItem("shoppingCart"))
        sumProduct = tmpProducts.products.reduce((acumulador, produto) => {
            return acumulador + (
                produto.precovenda * produto.quantidade
            )
        }, 0)
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
        for(let i = 0; i < tmp_cart_list.products.length; i ++ ) {
            tmp_sum += tmp_cart_list.products[i].precovenda * tmp_cart_list.products[i].quantidade
        }
        setShoppingCartData( tmp_cart_list )
        setProductList( tmp_cart_list.products )

    }, [])
    

    
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
                unityId={ shoppingCartData.unityId }
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