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
        /*
        if( !JSON.parse(sessionStorage.getItem('shoppingCart')) ) {
            sessionStorage.setItem('shoppingCart', '[]')
        }
            */
        

        let tmpData = JSON.parse(sessionStorage.getItem('currentAccount'))
        
        if( !tmpData ) {
            tmpData = {
                "name" : '',
                "askedToUserLgpdTerm" : false,
                "askedToUserCookies" : false
            }
            sessionStorage.setItem('currentAccount', JSON.stringify( tmpData ))
        }
        




    }, [])  



    return (
        <div className={styles.menuUnityDivMain}>
            <LabelComp 
                text={" Escolha uma unidade"}
            />
            
            <div className={ styles.menuUnityDiv }>
                { unityList.map((item, i) => (
                    <ButtonComp
                        key = {i}
                        text={item.name}
                        onClickButton={ () => {
                            navigate('/choose-unity-menu', {
                                state : {'unityIdRecived' : item.unityId }
                            })
                        }}
                        urlImage={`/assets/unidades/${item.unityId}-256px.jpg`}
                    />
                
                ))}
            </div>


        </div>
    );

};


export default MenuUnity;