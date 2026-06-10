import styles from './ChooseUnityMenu.module.css';

import { useEffect, useState } from "react";
import ListProduct from "../../component/ListProduct";
import ButtonComp from "../../component/ButtonComp";
import LabelComp from '/src/component/LabelComp';
import PromoWindowComp from '/src/component/PromoWindowComp';
import { useLocation, useNavigate } from 'react-router-dom';
import getUnityListApi from '../../function/Data/Get/getUnityListApi';
import getCategoryListByUnityId from '../../function/Data/Get/getCategoryListByUnityId';

const ChooseUnityMenu = () => {

    const [ productList, setProductList ] = useState([])
    const [ categoryList, setCategoryList ] = useState([])
    const [ showPromoWindow, setShowPromoWindow ] = useState(true)

    const [ unityId, setUnityId ] = useState(0)

    const navigate = useNavigate()
    const location = useLocation()

    const { unityIdRecived } = location.state || { unityIdRecived : null }


    // Função para simular uma requisição de uma api
    const getCategoryList = async() => {


        const response = await getCategoryListByUnityId( unityIdRecived )

        if( response ) {
            //console.log(" SALVANDO RESPONSE: ", response)
            setCategoryList( response )
        }
    }





    useEffect(() => {

        //console.log(" STATE: ", unityIdRecived )
        if( unityIdRecived ) {
            setUnityId( Number(unityIdRecived) )
        }
        
        let tmpShowPromoWindow = JSON.parse( sessionStorage.getItem('showPromoWindow'))

        if( tmpShowPromoWindow === false || tmpShowPromoWindow === true ) {
            setShowPromoWindow( tmpShowPromoWindow )
        }
        

        getCategoryList()
        if( !JSON.parse(sessionStorage.getItem('shoppingCart')) ) {
            sessionStorage.setItem('shoppingCart', '[]')
        }
        
        if( !JSON.parse(sessionStorage.getItem('currentAccount')) ) {
            let tmpData = {
                name : '',
            }
            sessionStorage.setItem('currentAccount', JSON.stringify( tmpData ))
        }

    }, [])  

    return (
        <div className={styles.ChooseUnityMenuMainDiv}>
            { categoryList.length ? categoryList.map((item, i) => (
                <ButtonComp
                    key = {i}
                    text={item.name}
                    onClickButton={ () => {
                        navigate(`/list-product-of-category`, {
                            state : {
                                'unityIdRecived' : unityIdRecived,
                                'categoryIdRecived' : item.categoryId
                                
                            }
                        })
                    }}
                    urlImage={`/src/assets/categorias/unidades/${unityIdRecived}/${item.categoryId}-256px.jpg`}
                />
            )) : (
                <div className={styles.categoryEmptyListDiv}>
                    <LabelComp 
                        text={"Nenhuma categoria encontrada"}
                    />
                </div>
            )}

            { showPromoWindow && (
                <PromoWindowComp
                    setControlFrame = { setShowPromoWindow }
                />
            )}
        </div>
    );

};


export default ChooseUnityMenu;