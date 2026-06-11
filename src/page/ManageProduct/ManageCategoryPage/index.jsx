import { useEffect, useState } from 'react';
import styles from './ManageCategoryPage.module.css';
import LabelComp from '/src/component/LabelComp';
import ButtonComp from '/src/component/ButtonComp';
import getUnityListApi from '../../../function/Data/Get/getUnityListApi';
import getUnityDataById from '../../../function/Data/Get/getUnityDataById';
import getCategoryListByUnityId from '../../../function/Data/Get/getCategoryListByUnityId';
import alterCategoryInformation from '../../../function/Data/Set/alterCategoryInformation';
import removeCategoryOfUnity from '../../../function/Data/Set/removeCategoryOfUnity';
import createNewCategory from '../../../function/Data/Set/createNewCategory';

const ManageCategoryPage = () => {
    const [ categoryList, setCategoryList ] = useState([])
    const [ unityList, setUnityList ] = useState([])

    const [ unitySelected, setUnitySelected ] = useState(undefined)
    const [ categorySelected, setCategorySelected ] = useState( undefined )

    const [ showUnityList, setShowUnityList ] = useState( true )
    const [ showCategoryList, setShowCategoryList ] = useState( false )
    const [ showCreateCategory, setShowCreateCategory ] = useState( false )
    const [ showEditCategory, setShowEditCategory ] = useState( false )

    const [ categoryName, setCategotyName ] = useState('')
    const [ categoryStatus, setCategoryStatus ] = useState( true )

    const handleResetValues = () => {
        setCategotyName('')
        setCategoryStatus( true )
    }

    const handleGetUnityList = async () => {
        const response = await getUnityListApi()
        setUnityList( response )
    }

    const handleGetCategoryList = async () => {
        if( !unitySelected.unityId ) {
            return
        }
        const response = await getCategoryListByUnityId( unitySelected.unityId, true )
        console.log(" GET CATEGORY LIST: ", unitySelected,  response)
        setCategoryList( response )
    }


    const handleSelectUnity = async ( unityId ) => {
        //console.log(" UNITY SELECT: ", unityId)
        
        const response = await getUnityDataById( unityId )
        console.log(" UNITY SELECT response: ", response)
        setUnitySelected( response )

        setShowUnityList( false )
        setShowCategoryList( true )
    }

    const handleSelectCategory = async( id ) => {
        //  console.log(" CATEGORY SELECT: ", id)
        
        
        let response;

        for( let i = 0; i < categoryList.length; i ++ ) {
            //console.log(" FOR LOOP: ", categoryList[i])
            if( String(categoryList[i].categoryId) == id ) {
                response = categoryList[i]
                break
            }
        }
        //console.log(" CATEGORY SELECT response: ", response, response.name)
        setCategorySelected( response )

        setCategotyName( response.name )
        setCategoryStatus( response.status)

        setShowCategoryList( false )
        setShowEditCategory( true )
    
    }

    const handleSaveCategoryAlteration = async () => {
        const confirmWindow = confirm("Deseja realmente alterar essas informações?")
        if( !confirmWindow ) {
            return
        }

        //console.log(" CATEGORY SELECTED: ", categorySelected)
        //console.log(" categoryName: ", categoryName)
        const response = await alterCategoryInformation( unitySelected.unityId, categorySelected.categoryId, categoryName, categoryStatus)
        alert("Alteração realizada com sucesso")
        return

    }

    const handleCancelEditCategory = () => {
        handleResetValues()
        setShowCategoryList( true )
        setShowEditCategory(false)
        
    }

    const handleRemoveCategory = async () => {
        const confirmWindow = confirm(" Deseja realmente deletar essa categoria?")
        if( !confirmWindow ) {
            return
        }

        await removeCategoryOfUnity( unitySelected.unityId, categorySelected.categoryId)

        alert("Removido com sucesso!")

        setShowEditCategory(false)
        setShowCategoryList(true)
        
    }

    const handleShowCreateCategory = async () => {
        setShowCategoryList( false )
        setShowEditCategory( false )
        setShowUnityList( false )
        setShowCreateCategory( true )
    }

    const handleCancelShowCategory = () => {
        setShowCategoryList( false )
        setShowUnityList( true )
    }

    const handleCreateCategory = async () => {
        const confirmWindow = confirm(" Deseja realmente criar essa categoria?")
        if( !confirmWindow ) {
            return
        }

        await createNewCategory(unitySelected.unityId, categoryName, categoryStatus)
        alert(" Categoria criada com sucesso!")
        setCategotyName('')
        setShowCreateCategory( false )
        setShowCategoryList( true )
    }

    const handleCancelCreateCategory = () => {
        handleResetValues()
        setShowCreateCategory( false )
        setShowCategoryList( true )
    }

    useEffect(() => {
        handleGetUnityList()
    }, [])

    useEffect(() => {
        if( !showCategoryList ) {
            return
        }

        handleGetCategoryList()
    }, [showCategoryList])

    return( 
        <div className={styles.manageCategoryMainDiv}>
            <LabelComp
                text={'Gerenciar Categorias'}
            />

            <div className={ styles.manageCategoryDiv}>
                
                { showUnityList && (
                    <>
                        <LabelComp
                            text={'Escolha a unidade'}
                        />
                        <div className={ styles.unityCategoryList }>
                            { unityList && unityList.map((item, i) => (
                                <ButtonComp
                                    key={i}
                                    text={item.name}
                                    onClickButton={ () => handleSelectUnity(item.unityId)}
                                />
                            ))}
                        </div>
                    </>
                )}
                { showCategoryList && (
                    <>
                        <LabelComp
                            text={'Escolha a categoria'}
                        />
                        <div className={ styles.unityCategoryList }>
                            { categoryList && categoryList.map((item, i) => (
                                <ButtonComp
                                    key={i}
                                    text={item.name}
                                    nameClass={ item.status ? "" : styles.inativeStatus }
                                    onClickButton={ () => handleSelectCategory(item.categoryId)}
                                />
                            ))}
                        </div>
                        <div className={ styles.buttonDiv }>
                            <ButtonComp
                                text={"Criar"}
                                onClickButton={ handleShowCreateCategory }
                            />
                            <ButtonComp
                                text={"Voltar"}
                                onClickButton={ handleCancelShowCategory }
                            />

                        </div>
                    </>
                )}
                { showCreateCategory && (
                    <>
                        <LabelComp
                            text={'Criar nova categoria'}
                        />
                        <div className={ styles.createCategoryDiv}>
                            <div>
                                <label>
                                    NOME:
                                </label>
                                <input
                                    type={'text'}
                                    value={categoryName}
                                    onChange={(e) => setCategotyName(e.target.value.toUpperCase())}
                                />
                            </div>
                            <div>
                                <label>
                                    STATUS:
                                </label>
                                <select
                                    defaultValue={ categoryStatus }
                                    onChange={ (e) => setCategoryStatus( e.target.value )}
                                >
                                    <option value={true}>
                                        ATIVO
                                    </option>
                                    <option value={false}>
                                        INATIVO
                                    </option>

                                </select>
                            </div>
                        </div>
                        
                        <div className={ styles.buttonDiv }>
                            <ButtonComp
                                text={"Criar"}
                                onClickButton={ handleCreateCategory }
                            />
                            <ButtonComp
                                text={"Voltar"}
                                onClickButton={ handleCancelCreateCategory }
                            />
                        </div>
                    </>
                )}
                { showEditCategory && (
                    <>
                        <LabelComp
                                text={'Edite a categoria'}
                        />
                        <div className={ styles.editCategoryDiv}>
                            <div>
                                <label>
                                    NOME:
                                </label>
                                <input
                                    value={ categoryName }
                                    onChange={(e) => setCategotyName(e.target.value.toUpperCase())}
                                />
                            </div>
                            <div>
                                <label>
                                    STATUS:
                                </label>
                                <select
                                    defaultValue={ categoryStatus }
                                    onChange={ (e) => setCategoryStatus( e.target.value )}
                                >
                                    <option value={true}>
                                        ATIVO
                                    </option>
                                    <option value={false}>
                                        INATIVO
                                    </option>

                                </select>
                            </div>
                            <div className={ styles.bottomButtons}>
                                <ButtonComp
                                    text={"Salvar"}
                                    onClickButton={ handleSaveCategoryAlteration }
                                />
                                <ButtonComp
                                    text={"Remover"}
                                    onClickButton={ handleRemoveCategory }
                                />
                                <ButtonComp
                                    text={"Cancelar"}
                                    onClickButton={ handleCancelEditCategory }
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>


        </div>
    )
}


export default ManageCategoryPage;