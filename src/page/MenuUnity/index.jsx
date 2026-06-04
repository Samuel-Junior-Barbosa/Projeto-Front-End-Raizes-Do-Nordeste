import styles from './MenuUnity.module.css';

import { useEffect, useState } from "react";
import ListProduct from "../../component/ListProduct";
import ButtonComp from "../../component/ButtonComp";
import LabelComp from '/src/component/LabelComp';
import PromoWindowComp from '/src/component/PromoWindowComp';
import { useLocation, useNavigate } from 'react-router-dom';
import getUnityListApi from '../../function/Data/Get/getUnityListApi';

const MenuUnity = () => {

    const [ unityList, setUnityList ] = useState([])
    

    const navigate = useNavigate()


    // Função para simular uma requisição de uma api
    const handleGetUnityList = async() => {
        const response = await getUnityListApi()
        if( response ) {
            //console.log(" SALVANDO RESPONSE: ", response)
            setUnityList( response )
        }
    }





    useEffect(() => {


        handleGetUnityList()
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
        <div className={styles.menuUnityDivMain}>
            { unityList.map((item, i) => (
                <ButtonComp
                    key = {i}
                    text={item.name}
                    onClickButton={ () => {
                        navigate('/choose-unity-menu', {
                            state : {'unityIdRecived' : item.id }
                        })
                    }}
                    urlImage={`/src/assets/unidades/${item.id}-256px.jpg`}
                />
            
            ))}

            
        </div>
    );

};


export default MenuUnity;