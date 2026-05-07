import styles from './ListProductOfCategory.module.css';

import { useEffect, useState } from "react";
import ListProduct from "../../component/ListProduct";
import searchIcon from '/src/assets/search_icone2.svg'
import { useLocation } from 'react-router-dom';

const ListProductOfCategory = () => {

    const [ productList, setProductList ] = useState([])
    const [ inputFoodSearchValue, setInputFoodSearchValue ] = useState('')

    const location = useLocation()

    const { PlateType } = location.state || { PlateType : "" }

    const handleSearchFood = async () => {
        console.log(" INPUT : ", inputFoodSearchValue)
        if( inputFoodSearchValue == '' || !inputFoodSearchValue || inputFoodSearchValue === undefined ) {
            console.log(" OBTENDO LISTA DE PRODUTOS...")
            await getProductList()
            return
        }
        
        for( let i = 0; i < productList.length; i ++ ) {
            let tmp_product_name = productList[i].produto.toUpperCase()
            //console.log(" SEARCH FOOD: ", productList[i])
            //console.log(" SEARCH FOOD: ", inputFoodSearchValue, productList[i].produto.toUpperCase().indexOf(inputFoodSearchValue))
            if( tmp_product_name.indexOf(inputFoodSearchValue.toUpperCase()) >= 0 ) {
                //console.log(" SEARCH FOOD: ", productList[i])
                setProductList( [productList[i]] )
                return
            }
        }

        console.log(" ITEM NÃO ENCONTRADO")
        setProductList([])
        
        
    }

    // Simulação de uma API retornando dados do banco
    const getProductListApi = async( typeProduct ) => {
        let data = {
            'status' : 90,
            'content' : []
        }

        if( typeProduct == 'meat') {
            data.status = 0
            data.content = [{
                    'produto' : 'Carne de sol',
                    'ingredientes' : ['Carne bovina salgada e seca'],
                    'precovenda' : '00.000',
                    'id' : 1
                }, {
                    'produto' : 'Buchada de bode',
                    'ingredientes' : ['Vísceras', 'bucho de bode (ou carneiro)'],
                    'precovenda' : '00.0000',
                    'id' : 2
                }, {
                    'produto' : 'Sarapatel',
                    'ingredientes' : ['Carne suína', 'vísceras'],
                    'precovenda' : '00.000',
                    'id' : 3
                }
            ]
        }


        else if( typeProduct == 'corn' ) {
            data.status = 0
            data.content = [{
                    'produto' : 'Cuscuz',
                    'ingredientes' : ['flocão ou farinha de milho'],
                    'precovenda' : '00.000',
                    'id' : 4
                }, {
                    'produto' : 'Pamonha',
                    'ingredientes' : ['Milho verde fresco'],
                    'precovenda' : '00.0000',
                    'id' : 5
                }, {
                    'produto' : 'Bolo de milho',
                    'ingredientes' : ['milho-verde', 'leite de coco', 'ovos', 'açúcar', 'óleo e fubá'],
                    'precovenda' : '00.000',
                    'id' : 6
                }
            ]
        }

        else if( typeProduct == 'drink' ) {
            data.status = 0
            data.content = [{
                    'produto' : 'Café Forte',
                    'ingredientes' : ['Café em pó'],
                    'precovenda' : '00.000',
                    'id' : 7
                }, {
                    'produto' : 'Caldo de cana',
                    'ingredientes' : ['Cana de açucar'],
                    'precovenda' : '00.0000',
                    'id' : 8
                }, {
                    'produto' : 'Cajuína',
                    'ingredientes' : ['suco clarificado esterilizado do caju'],
                    'precovenda' : '00.000',
                    'id' : 9
                }
            ]
        }

        return data

    }

    const getProductList = async () => {
        const response = await getProductListApi( PlateType )
        if( response.status === 0 ) {
            console.log(" RESPONSE: ", response)
            setProductList( response.content )
        }
    }



    useEffect(() => {
        getProductList()
    }, [])

    return (
        <div className={styles.ListProductOfCategory}>

            <div className={styles.searchDiv}>
                <img
                    className={styles.icon_img}
                    src={searchIcon}
                    onClick={handleSearchFood}
                />
                <input
                    placeholder={"PESQUISAR PELO PRATO"}
                    className={styles.inputSearchFood}
                    value={inputFoodSearchValue}
                    onChange={ (e) => setInputFoodSearchValue(e.target.value.toUpperCase())}
                />
            </div>

            { productList.length > 0 ? (
                <ListProduct
                    productList = { productList }
                    nameClass={styles.ListProductComp}
                />

                ) : (
                    <label> Nenhum item encontrado nesse cardapio</label>
                )
            }
        </div>
    )
}


export default ListProductOfCategory;