import { useEffect, useState } from 'react';
import styles from './ManageProductPage.module.css';
import LabelComp from '/src/component/LabelComp';
import ButtonComp from '/src/component/ButtonComp';
import getProductListOfUnity from '/src/function/Data/Get/getProductListOfUnity';
import getUnityListApi from '/src/function/Data/Get/getUnityListApi';
import getUnityDataById from '/src/function/Data/Get/getUnityDataById';
import getProductByUnityId from '/src/function/Data/Get/getProductByUnityId';
import getCategoryListByUnityId from '/src/function/Data/Get/getCategoryListByUnityId';
import alterProductInformation from '/src/function/Data/Set/alterProductInformation';
import createNewProduct from '/src/function/Data/Set/createNewProduct';

const ManageProductPage = () => {

    const [ productList, setProductList ] = useState([])
    const [ unityList, setUnityList ] = useState([])
    const [ categoryList, setCategoryList ] = useState([])

    const [ productSelected, setProductSelected ] = useState( undefined )
    const [ unitySelected, setUnitySelected ] = useState( undefined )

    const [ showProductList, setShowProductList ] = useState( false )
    const [ showUnityList, setShowUnityList ] = useState( true )
    const [ showEditProduct, setShowEditProduct ] = useState( false )
    const [ showCreateProduct, setShowCreateProduct ] = useState( false )

    const [ editProductName, setEditProductName ] = useState('')
    const [ editProductDescription, setEditProductDescription ] = useState('')
    const [ editProductSellValue, setEditProductSellValue ] = useState('0')
    const [ editProductImageUrl, setEditProductImageUrl ] = useState('')
    const [ editProductIngredients, setEditProductIngredients ] = useState('')
    const [ editProductCategory, setEditProductCategory ] = useState('0')
    const [ editProductStatus, setEditProductStatus ] = useState( true )

    
    const handleResetEditValues = () => {
        setProductSelected( undefined )
        setEditProductName( '' )
        setEditProductDescription( '' )
        setEditProductIngredients('')
        setEditProductSellValue( '0' )
        setEditProductCategory( '0' )
        setEditProductStatus( true )
    }

    const handleGetCategoryList = async ( id ) => {
        //console.log(" handleGetProductList: ", id)
        const response = await getCategoryListByUnityId( id )
        response.unshift( {'name' : '', 'categoryId' : '0'} )
        setCategoryList( response )

    }
    const handleGetProductList = async ( id ) => {
        //console.log(" handleGetProductList: ", id)
        const response = await getProductListOfUnity( id )
        setProductList( response )

    }

     const handleGetUnityList = async () => {
        const response = await getUnityListApi()
        setUnityList( response )
    }




    const handleSelectUnity = async ( id ) => {
        const response = await getUnityDataById( id )
        //console.log(" unitySelected: ", response)
        setUnitySelected( response )

        setShowUnityList( false )
        setShowProductList( true )
        await handleGetProductList( response.unityId )
        await handleGetCategoryList( response.unityId )

    }

    const handleSelectProduct = async ( id ) => {
        const response = await getProductByUnityId( unitySelected.unityId, id)
        //console.log(" product Selected: ", response)
        setProductSelected( response )

        setShowProductList( false )
        setShowEditProduct( true )

        setEditProductName( response.produto )
        setEditProductDescription( response.description )
        setEditProductSellValue( response.precovenda )
        setEditProductCategory( response.categoryId )
        setEditProductStatus( response.status )
        let tmp_ing = response.ingredientes
        tmp_ing = tmp_ing.join(',')

        setEditProductIngredients( tmp_ing )
        setEditProductImageUrl( `/src/assets/${response.id}-256px.jpg`)

    }

    const handleCancelSelectProduct = () => {
        setProductList([])
        setShowProductList( false ) 
        setShowUnityList( true )
    }

    const handleSetNewValueForSell = ( newValue ) => {
        //if( Number( newValue ) === undefined || Number( newValue ) === NaN || Number( newValue ) === null) {
        if( !Number( newValue )) {
            return
        }

        setEditProductSellValue( newValue )
    }


    const handleSaveAlteration = async () => {
        const confirmWindows = confirm("Deseja realmente alterar esse item?")
        if( !confirmWindows ) {
            return
        }

        let tmpIng = editProductIngredients
        if( !tmpIng ) {
            tmpIng = ''
        }
        tmpIng = tmpIng.split(',')
        for( let i = 0; i < tmpIng.length; i ++ ) {
            tmpIng[i] = tmpIng[i].trim()
        }


        await alterProductInformation( unitySelected.unityId, productSelected.id, editProductName, editProductDescription, tmpIng, editProductSellValue, editProductCategory, editProductStatus )

        setShowEditProduct( false )
        setShowProductList( true )
        handleResetEditValues()
        alert("Alterado com sucesso!")
        

    }

    const handleCancelAlteration = () => {
        handleResetEditValues()
        setShowEditProduct( false )
        setShowProductList( true )
    }

    const handleSepareIngredients = ( ingList ) => {
        let tmpIng = ingList
        if( !tmpIng ) {
            tmpIng = ''
        }
        tmpIng = tmpIng.split(',')
        for( let i = 0; i < tmpIng.length; i ++ ) {
            tmpIng[i] = tmpIng[i].trim()
        }
        return tmpIng
    }

    const handleCreateProduct = async () => {
        const confirmWindow = confirm("Deseja realmente criar esse produto?")
        if( !confirmWindow ) { 
            return
        }
        let tmpIng = handleSepareIngredients( editProductIngredients )
        await createNewProduct( String(unitySelected.unityId), editProductName, editProductSellValue, editProductDescription, editProductCategory, tmpIng, editProductStatus)
        
        handleResetEditValues()
        setShowCreateProduct( false )
        setShowProductList( true )

        alert("Produto criado com sucesso!")


    }

    const handleShowCreateProduct = () => {
        setShowProductList( false )
        setShowCreateProduct( true )
    }

    const handleCancelCreation = () => {
        handleResetEditValues()
        setShowCreateProduct( false )
        setShowProductList( true )
    }
    
    useEffect(() => {
        handleGetUnityList()
    }, [])

    useEffect(() => {
        if( !showProductList || !unitySelected) {
            return
        }

        handleGetProductList( unitySelected.unityId )

    }, [showProductList])

    return( 
        <div className={styles.manageProductPageMainDiv}>
            <LabelComp
                text={'Gerenciar produtos'}
            />

            <div className={ styles.manageProductPageDiv}>    
                { showUnityList && (
                    <>
                        <LabelComp
                            text={'Escolha a unidade'}
                        />
                        <div className={ styles.unityListDiv }>
                            { unityList && unityList.map((item, i) => (
                                <ButtonComp
                                    key={i}
                                    text={item.name}
                                    onClickButton={ () => handleSelectUnity( item.unityId )}
                                />
                            ))}
                        </div>
                    </>
                )}

                { showProductList && (
                    <>
                        <LabelComp
                            text={'Escolha o produto'}
                        />
                        <div className={styles.buttonDiv + " " + styles.createNewProductDivButton}>
                            <ButtonComp
                                text={"Criar novo produto"}
                                onClickButton={ handleShowCreateProduct }
                            />
                            <ButtonComp
                                text={"voltar"}
                                onClickButton={ handleCancelSelectProduct }
                            />
                        </div>
                        <div className={ styles.categoryProductList }>
                            { productList && productList.map((item, i) => (
                                <ButtonComp
                                    key={i}
                                    text={item.produto}
                                    nameClass={ item.status ? "" : styles.inativeStatus}
                                    onClickButton={ () => handleSelectProduct(item.id)}
                                />
                            ))}
                        </div>
                    </>
                )}

                { showEditProduct && (
                    <>
                        <LabelComp
                            text={'Edite o produto'}
                        />
                        <div className={ styles.editProductDiv}>
                            <div>
                                <img
                                    src={`/src/assets/pratos/unidades/${unitySelected.unityId}/${productSelected.id}-512px.jpg`}
                                    className={ styles.imageDiv }
                                >
                                </img>
                            </div>
                            <div className={ styles.labelId }>
                                <label>
                                    ID:
                                </label>
                                <input 
                                    value={ productSelected.id }
                                    readOnly={true}
                                />
                            </div>
                            <div>
                                <label>
                                    NOME: 
                                </label>
                                <input 
                                    value={editProductName}
                                    onChange={ (e) => setEditProductName( e.target.value) }
                                />
                            </div>
                            <div>
                                <label>
                                    DESCRIÇÃO: 
                                </label>
                                <textarea 
                                    value={editProductDescription}
                                    onChange={ (e) => setEditProductDescription( e.target.value) }
                                />
                            </div>
                            <div>
                                <label>
                                    INGREDIENTES: 
                                </label>
                                <textarea 
                                    value={editProductIngredients}
                                    onChange={ (e) => setEditProductIngredients(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>
                                    PREÇO VENDA: 
                                </label>
                                <input 
                                    type={'number'}
                                    value={editProductSellValue}
                                    onChange={ (e) => handleSetNewValueForSell( e.target.value ) }
                                />
                            </div>
                            <div>
                                <label>
                                    CATEGORIA: 
                                </label>
                                <select
                                    defaultValue={ editProductCategory }
                                    onChange={ (e) => setEditProductCategory( e.target.value )}
                                >
                                    { categoryList && categoryList.map((item, i) => (
                                        <option
                                            key={i}        
                                            value={ item.categoryId }
                                        >
                                            { item.name }
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>
                                    STATUS: 
                                </label>
                                <select
                                    defaultValue={ editProductStatus }
                                    onChange={ (e) => setEditProductStatus( e.target.value )}
                                >
                                    <option   
                                        value={ true }
                                        key={0}
                                    >
                                        ATIVO
                                    </option>
                                    <option   
                                        key={1}
                                        value={ false }
                                    >
                                        INATIVO
                                    </option>
                                </select>
                            </div>

                        </div>

                        <div className={ styles.buttonDiv }>
                            <ButtonComp
                                text={"Salvar"}
                                onClickButton={ handleSaveAlteration }
                            />
                            <ButtonComp
                                text={"Cancelar"}
                                onClickButton={ handleCancelAlteration }
                            />

                        </div>
                    </>
                )}

                { showCreateProduct && (
                    <>
                        <LabelComp
                            text={'Criar produto'}
                        />
                        <div className={ styles.createProductDiv }>
                            
                            <div className={ styles.imageDiv }>
                                <img
                                />
                                <label>
                                    Adicione a imagem na pasta da imagem, renomeada com o id do produto + "-256px" <br />
                                    exemplo: "1-256px.jpg"
                                </label>
                            </div>
                            <div>
                                <label>
                                    NOME: 
                                </label>
                                <input 
                                    value={editProductName}
                                    onChange={ (e) => setEditProductName( e.target.value.toUpperCase()) }
                                />
                            </div>
                            <div>
                                <label>
                                    DESCRIÇÃO: 
                                </label>
                                <textarea 
                                    value={editProductDescription}
                                    onChange={ (e) => setEditProductDescription( e.target.value.toUpperCase()) }
                                />
                            </div>
                            <div>
                                <label>
                                    INGREDIENTES: 
                                </label>
                                <textarea 
                                    value={editProductIngredients}
                                    onChange={ (e) => setEditProductIngredients(e.target.value.toUpperCase())}
                                />
                            </div>
                            <div>
                                <label>
                                    PREÇO VENDA: 
                                </label>
                                <input 
                                    type={'number'}
                                    min={'0'}
                                    value={editProductSellValue}
                                    onChange={ (e) => handleSetNewValueForSell( e.target.value ) }
                                />
                            </div>
                            <div>
                                <label>
                                    CATEGORIA: 
                                </label>
                                <select
                                    defaultValue={ editProductCategory }
                                    onChange={ (e) => setEditProductCategory( e.target.value )}
                                >
                                    { categoryList && categoryList.map((item, i) => (
                                        <option
                                            key={i}        
                                            value={ item.categoryId }
                                        >
                                            { item.name }
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>
                                    STATUS: 
                                </label>
                                <select
                                    defaultValue={ editProductStatus }
                                    onChange={ (e) => setEditProductStatus( e.target.value )}
                                >
                                    <option   
                                        value={ true }
                                    >
                                        ATIVO
                                    </option>
                                    <option   
                                        value={ false }
                                    >
                                        INATIVO
                                    </option>
                                </select>
                            </div>

                        </div>

                        <div className={ styles.buttonDiv }>
                            <ButtonComp
                                text={"Criar"}
                                onClickButton={ handleCreateProduct }
                            />
                            <ButtonComp
                                text={"Cancelar"}
                                onClickButton={ handleCancelCreation }
                            />

                        </div>
                    </>
                )}
            </div>
            
        </div>
    )
}


export default ManageProductPage;