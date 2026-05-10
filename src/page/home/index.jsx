import styles from './home.module.css';

import { useEffect, useState } from "react";
import ListProduct from "../../component/ListProduct";
import ButtonComp from "../../component/ButtonComp";
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [ productList, setProductList ] = useState([])
    const [ categoryList, setCategoryList ] = useState([])
    const navigate = useNavigate()

    // API simulada para obter dados ficticios
    const getProductListApi = async () => {
        const data = {
            'status': 0,
            'content': [
                {
                    'produto' : 'Carne de sol',
                    'precovenda' : '00.000',
                    'ingredientes' : ['Carne bovina', 'salgada', 'seca'],
                    'img' : '',
                }, {
                    'produto' : 'Buchada de bode',
                    'precovenda' : '00.000',
                    'ingredientes' : ['Vísceras e bucho de bode (ou carneiro)'],
                    'img' : '',
                }, {
                    'produto' : 'Sarapatel:',
                    'precovenda' : '00.000',
                    'ingredientes' : ['Carne suína','vísceras'],
                    'img' : '',
                }
                
            ]
        }
        return data
    }

    // Função para obter dados do banco de dados
    //    No momento, só simulação
    const getProductList = async () => {
        const response = await getProductListApi()
        
        if( response.status === 0 ) {
            setProductList( response.content )
        }

    }

    // Função para simular uma api retornando dados
    const getCategoryListApi = async () => {
        const data = {
            'status' : 0,
            'content' : {
                'CARNES' : 'meat',
                'MILHOS' : 'corn',
                'BEBIDAS' : 'drink',
            }
        }

        return data
    }


    // Função para simular uma requisição de uma api
    const getCategoryList = async() => {
        const response = await getCategoryListApi()
        if( response.status === 0 ) {
            console.log(" SALVANDO RESPONSE: ", response.content)
            setCategoryList( response.content)
        }
    }



    useEffect(() => {
        getCategoryList()
        if( !sessionStorage.getItem('shoppingCart') ) {
            sessionStorage.setItem('shoppingCart', '[]')
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
        </div>
    );

};


export default Home;