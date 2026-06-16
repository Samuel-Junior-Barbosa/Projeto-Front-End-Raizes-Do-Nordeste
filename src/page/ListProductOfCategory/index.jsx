import styles from './ListProductOfCategory.module.css';

import { useEffect, useLayoutEffect, useState } from "react";
import ListProduct from "../../component/ListProduct";
import searchIcon from '/src/assets/search_icone2.svg'
import { useLocation, useNavigate } from 'react-router-dom';
import getProductListOfCategoryByUnity from '../../function/Data/Get/getProductListOfCategoryByUnity';

const ListProductOfCategory = () => {

    const [ productList, setProductList ] = useState([])
    const [ inputFoodSearchValue, setInputFoodSearchValue ] = useState('')
    const [ productSelected, setProductSelected ] = useState([])
    const [ searchItemStatus, setSearchItemStatus ] = useState(false)
    const [ searchItem, setSearchItem ] = useState([])

    const location = useLocation()
    const navigate = useNavigate()

    const { unityIdRecived, categoryIdRecived } = location.state || { unityIdRecived : null, categoryIdRecived : null }

    // Função responsavel por simular a pesquisa do item no banco de dados
    const handleSearchFood = async () => {
        //console.log(" INPUT : ", inputFoodSearchValue)
        if( inputFoodSearchValue == '' || !inputFoodSearchValue || inputFoodSearchValue === undefined ) {
            //console.log(" OBTENDO LISTA DE PRODUTOS...")
            await getProductList()
            setSearchItemStatus(false)
            setSearchItem([])
            return
        }
        setSearchItemStatus(true)   

        let tmp_list_found = []
        for( let i = 0; i < productList.length; i ++ ) {
            let tmp_product_name = productList[i].produto.toUpperCase()    
            //console.log(" SEARCH FOOD: ", productList[i])
            //console.log(" SEARCH FOOD: ", inputFoodSearchValue, productList[i].produto.toUpperCase().indexOf(inputFoodSearchValue))
            if( tmp_product_name.indexOf(inputFoodSearchValue.toUpperCase()) >= 0 ) {
                //console.log(" SEARCH FOOD: ", productList[i])
                tmp_list_found.push( productList[i] )
            }
            
        }
        //console.log(" ITEM FOUND LIST: ", tmp_list_found)
        setSearchItem( tmp_list_found )
        
        //console.log(" ITEM NÃO ENCONTRADO")

    }

    // Simulação de uma API retornando dados do banco
    /*
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
                    'precovenda' : '01.00',
                    'id' : 1
                }, {
                    'produto' : 'Buchada de bode',
                    'ingredientes' : ['Vísceras', 'bucho de bode (ou carneiro)'],
                    'precovenda' : '02.00',
                    'id' : 2
                }, {
                    'produto' : 'Sarapatel',
                    'ingredientes' : ['Carne suína', 'vísceras'],
                    'precovenda' : '03.00',
                    'id' : 3
                }
            ]
        }


        else if( typeProduct == 'corn' ) {
            data.status = 0
            data.content = [{
                    'produto' : 'Cuscuz',
                    'ingredientes' : ['flocão ou farinha de milho'],
                    'precovenda' : '04.00',
                    'id' : 4
                }, {
                    'produto' : 'Pamonha',
                    'ingredientes' : ['Milho verde fresco'],
                    'precovenda' : '05.00',
                    'id' : 5
                }, {
                    'produto' : 'Bolo de milho',
                    'ingredientes' : ['milho-verde', 'leite de coco', 'ovos', 'açúcar', 'óleo e fubá'],
                    'precovenda' : '06.00',
                    'id' : 6
                }
            ]
        }

        else if( typeProduct == 'drink' ) {
            data.status = 0
            data.content = [{
                    'produto' : 'Café Forte',
                    'ingredientes' : ['Café em pó'],
                    'precovenda' : '07.00',
                    'id' : 7
                }, {
                    'produto' : 'Caldo de cana',
                    'ingredientes' : ['Cana de açucar'],
                    'precovenda' : '08.00',
                    'id' : 8
                }, {
                    'produto' : 'Cajuína',
                    'ingredientes' : ['suco clarificado esterilizado do caju'],
                    'precovenda' : '09.00',
                    'id' : 9
                }
            ]
        }
        
        return data

    }
        */

    // Função responsavel por chamar a API de consulta
    const getProductList = async () => {
        //const response = await getProductListApi( PlateType )
        //console.log(" categoryIdRecived: ", unityIdRecived, categoryIdRecived)
        const response = await getProductListOfCategoryByUnity( unityIdRecived, categoryIdRecived )
        if( response ) {
            //console.log(" RESPONSE: ", response)
            setProductList( response )
        }
    }

    // Responsavel por abrir a tela de escolha do item, mostrando os ingredientes e pedindo
    //     quantidade desejada
   const handleChooseFood = (productData) => {

        let data = {
            unityId: unityIdRecived,
            id : productData.id, 
            produto : productData.produto,
            precovenda : productData.precovenda,
            ingredientes : productData.ingredientes
        }
        navigate('/choose-item', {state : data})
    }

    const handleKeydownSearchFood = ( key ) => {
        if( key === 'Enter' || key === 'EnterNumpad' ) {
            handleSearchFood()
        }
        return
    }

    // Sempre que carregar a pagina, será chamada a feito a consulta dos itens no banco de dados
    useLayoutEffect(() => {
        getProductList()
    }, [])

    // Quando um item for selecionado, esse useEffect será responsavel por chamar a pagina de
    //    de escolha do item
    useEffect(() => {
        //console.log(" ITEM SELECTED: ", productSelected)
        if( Array.isArray(productSelected) && productSelected.length > 0) {
            //console.log(" GO TO CHOSSE PAGE: ")
            handleChooseFood( productSelected[0] )
            setProductSelected([])
            
        }
    }, [productSelected])

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
                    onChange={ (e) => (
                        setInputFoodSearchValue(e.target.value.toUpperCase())
                    )}
                    onKeyDown={ (e) => handleKeydownSearchFood( e.key ) }
                />
            </div>
            

            <div>
                { productList.length > 0 && (

                    ( searchItemStatus === false && (
                        <ListProduct
                            productListData = {  productList }
                            setProductListData={ setProductList }
                            nameClass={styles.ListProductComp}
                            itemChoosedState={setProductSelected}
                            unityId={unityIdRecived}
                        />

                    ))
                )}
                { searchItem.length > 0 && (
                    ( searchItemStatus === true && (
                        <ListProduct
                            productListData = {  searchItem }
                            setProductListData={ setSearchItemStatus }
                            nameClass={styles.ListProductComp}
                            itemChoosedState={setProductSelected}
                        />

                    )))
                }

                { (productList.length === 0 && searchItem.length === 0 ) && (
                    <label> Nenhum item encontrado nesse cardapio</label>
                )}
            </div>
                                            
        </div>
    )
}


export default ListProductOfCategory;