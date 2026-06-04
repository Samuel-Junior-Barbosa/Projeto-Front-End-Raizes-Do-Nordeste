import styles from './home.module.css';

import { useEffect, useState } from "react";
import ListProduct from "../../component/ListProduct";
import ButtonComp from "../../component/ButtonComp";
import LabelComp from '/src/component/LabelComp';
import PromoWindowComp from '/src/component/PromoWindowComp';
import { useNavigate } from 'react-router-dom';
import getUnityListApi from '../../function/Data/Get/getUnityListApi';

const Home = () => {

    const [ productList, setProductList ] = useState([])
    const [ unityList, setUnityList ] = useState([])
    const [ showPromoWindow, setShowPromoWindow ] = useState(true)

    const navigate = useNavigate()

    // Função para simular uma api retornando dados
    const handleGetUnityListApi = async () => {
        let data = {
            'status' : 90,
            'content' : {}
        }

        data.content = await getUnityListApi()
        if( data.content ) {
            data.status = 0
        }
        
        return data
    }


    // Função para simular uma requisição de uma api
    const getCategoryList = async() => {
        const response = await handleGetUnityListApi()
        if( response.status === 0 ) {
            //console.log(" SALVANDO RESPONSE: ", response.content)
            setCategoryList( response.content)
        }
    }





    useEffect(() => {
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
        <div className={styles.homeDivMain}>
            { Object.keys(categoryList).map((item, i) => (
                <ButtonComp
                    key = {i}
                    text={item}
                    onClickButton={ () => {
                        navigate(`/${categoryList[item]}`, {
                            state : {'PlateType' : `${categoryList[item]}` }
                        })
                    }}
                    urlImage={`/src/assets/categorias/${categoryList[item]}-256px.jpg`}
                />
            ))}

            { showPromoWindow && (
                <PromoWindowComp
                    setControlFrame = { setShowPromoWindow }
                />
            )}
        </div>
    );

};


export default Home;