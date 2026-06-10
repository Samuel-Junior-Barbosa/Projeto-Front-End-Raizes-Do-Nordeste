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

    const [ nome, setNome ] = useState('')
    const [ newCategoryName, setNewCategoryName ] = useState('')

    const handleGetUnityList = async () => {
        const response = await getUnityListApi()
        setUnityList( response )
    }

    const handleGetCategoryList = async () => {
        if( !unitySelected.id ) {
            return
        }
        const response = await getCategoryListByUnityId( unitySelected.id )
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

        setNome( response.name )

        setShowCategoryList( false )
        setShowEditCategory( true )
    
    }

    const handleSaveCategoryAlteration = async () => {
        const confirmWindow = confirm("Deseja realmente alterar essas informações?")
        if( !confirmWindow ) {
            return
        }

        //console.log(" CATEGORY SELECTED: ", categorySelected)
        //console.log(" NOME: ", nome)
        const response = await alterCategoryInformation( unitySelected.id, categorySelected.categoryId, nome)
        alert("Alteração realizada com sucesso")
        return

    }

    const handleCancelEditCategory = () => {
        setShowCategoryList( true )
        setShowEditCategory(false)
        
    }

    const handleRemoveCategory = async () => {
        const confirmWindow = confirm(" Deseja realmente deletar essa categoria?")
        if( !confirmWindow ) {
            return
        }

        await removeCategoryOfUnity( unitySelected.id, categorySelected.categoryId)

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

    const handleCreateCategory = async () => {
        const confirmWindow = confirm(" Deseja realmente criar essa categoria?")
        if( !confirmWindow ) {
            return
        }

        await createNewCategory(unitySelected.id, newCategoryName)
        alert(" Categoria criada com sucesso!")
        setNewCategoryName('')
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
                                onClickButton={ () => handleSelectUnity(item.id)}
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
                                onClickButton={ () => handleSelectCategory(item.categoryId)}
                            />
                        ))}
                    </div>

                    <div className={ styles.buttonDiv }>
                        <ButtonComp
                            text={"Criar nova categoria"}
                            onClickButton={ handleShowCreateCategory }
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
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value.toUpperCase())}
                            />
                        </div>
                    </div>

                    <div className={ styles.buttonDiv }>
                        <ButtonComp
                            text={"Criar"}
                            onClickButton={ handleCreateCategory }
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
                                Nome:
                            </label>
                            <input
                                value={ nome }
                                onChange={(e) => setNome(e.target.value.toUpperCase())}
                            />
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
    )
}


export default ManageCategoryPage;