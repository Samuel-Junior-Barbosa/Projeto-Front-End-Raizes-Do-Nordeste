import styles from './ChooseUnityMenu.module.css';

import { useEffect, useState } from "react";
import ListProduct from "../../component/ListProduct";
import ButtonComp from "../../component/ButtonComp";
import LabelComp from '/src/component/LabelComp';
import PromoWindowComp from '/src/component/PromoWindowComp';
import { useLocation, useNavigate } from 'react-router-dom';
import getUnityListApi from '../../function/Data/Get/getUnityListApi';
import getCategoryListByUnityId from '../../function/Data/Get/getCategoryListByUnityId';
import getAccountData from '../../function/Data/Get/getAccountData';
import getIdUser from '../../function/Account/Get/getIdUser';
import getUnityDataById from '../../function/Data/Get/getUnityDataById';
import dayjs from 'dayjs';

const ChooseUnityMenu = () => {

    const [ productList, setProductList ] = useState([])
    const [ categoryList, setCategoryList ] = useState([])
    const [ unityData, setUnityData ] = useState({})
    const [ showPromoWindow, setShowPromoWindow ] = useState(true)
    const [ initDay, setInitDay ] = useState('')
    const [ endDay, setEndDay  ] = useState('')


    const todayDate = new Date();
    const day = String(todayDate.getDate()).padStart(2, '0')
    const month = String(todayDate.getDate() + 1).padStart(2, '0')
    const year = todayDate.getFullYear()
    const week = todayDate.toLocaleDateString('pt-BR', {weekday : 'long'});

    const indexWeek = dayjs().day()

    const [ unityId, setUnityId ] = useState(0)

    const navigate = useNavigate()
    const location = useLocation()

    const { unityIdRecived } = location.state || { unityIdRecived : null }

    const handleGetUnityData = async ( unityId ) => {
        const response = await getUnityDataById( unityId )
        setUnityData( response )
        //  console.log(" handleGetUnityData: ", response.openingHours[indexWeek])
        setInitDay( response.openingHours[indexWeek][1] )
        setEndDay( response.openingHours[indexWeek][2] )
    }

    // Função para simular uma requisição de uma api
    const getCategoryList = async() => {


        const response = await getCategoryListByUnityId( unityIdRecived )

        if( response ) {
            //console.log(" SALVANDO RESPONSE: ", response)
            setCategoryList( response )
        }
    }


    const handleVerifyPromo = async () => {

        let tmpAccountData = JSON.parse( sessionStorage.getItem('currentAccount') )
        if( !tmpAccountData ) {
            
        }
        //console.log(" tmpAccountData1: ", tmpAccountData.lgpdConcentiment.participationInTheLoyaltyProgram)
        if( !tmpAccountData.lgpdConcentiment.participationInTheLoyaltyProgram ) {
            setShowPromoWindow( true )
            
        } else {
            setShowPromoWindow( false )
        }
            

        //console.log(" tmpAccountData2: ", tmpAccountData)
        /*
        let tmpShowPromoWindow = JSON.parse( sessionStorage.getItem('showPromoWindow'))
        if( tmpShowPromoWindow === false || tmpShowPromoWindow === true ) {
            setShowPromoWindow( tmpShowPromoWindow )
        }
        */
        
        



    }



    useEffect(() => {

        //console.log(" STATE: ", unityIdRecived )
        if( unityIdRecived ) {
            setUnityId( Number(unityIdRecived) )
        }
        handleGetUnityData( unityIdRecived )

        

        getCategoryList()
        /*
        if( !JSON.parse(sessionStorage.getItem('shoppingCart')) ) {
            sessionStorage.setItem('shoppingCart', '[]')
        }
            */
        
        if( !JSON.parse(sessionStorage.getItem('currentAccount')) ) {
            let tmpData = {
                name : '',
            }
            sessionStorage.setItem('currentAccount', JSON.stringify( tmpData ))
        }

        handleVerifyPromo()

    }, [])  

    return (
        <div className={styles.ChooseUnityMenuMainDiv}>
            <LabelComp
                nameClass={ styles.ChooseUnityMenuTitle }
                text={"Escolha uma categoria do cardapio"}
            />
            { unityData && (
                <label
                    className={styles.hourTitle}
                > Aberto hoje das: {initDay} até ás: {endDay}</label>
            )}
            

            <div className={ styles.ChooseUnityMenuDiv}>            
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
                        urlImage={`/assets/categorias/unidades/${unityIdRecived}/${item.categoryId}-256px.jpg`}
                    />
                )) : (
                    <div className={styles.categoryEmptyListDiv}>
                        <LabelComp 
                            text={"Nenhuma categoria encontrada"}
                        />
                    </div>
                )}
            </div>
            { showPromoWindow && (
                <PromoWindowComp
                    setControlFrame = { setShowPromoWindow }
                />
            )}
        </div>
    );

};


export default ChooseUnityMenu;