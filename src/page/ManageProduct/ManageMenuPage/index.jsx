import { useEffect, useState } from 'react';
import styles from './ManageMenuPage.module.css';
import LabelComp from '/src/component/LabelComp';
import getUnityListApi from '../../../function/Data/Get/getUnityListApi';
import ButtonComp from '../../../component/ButtonComp';


const ManageMenuPage = () => {

    const [ unityList, setUnityList ] = useState([])
    const [ categoryList, setCategoryList ] = useState([])

    const [ categoryIdSelect, setCategoryIdSelect ] = useState('')
    const [ unityIdSelect, setUnityIdSelect ] = useState('')

    const handleGetUnityList = async() =>{
        const response = await getUnityListApi()
        setUnityList( response )

    }

    const handleSetUnityId = ( unityId ) => {
        //console.log(" UNITY SELECT: ", unityId)
        setUnityIdSelect( unityId )
    }

    useEffect(() => {
        handleGetUnityList()
    }, [])

    return(
        <div className={styles.manageMenuMainDiv}>
            <LabelComp
                text={'Gerenciar Cardapio'}
            />

            <div className={ styles.manageMenuDiv}>
                <LabelComp
                    nameClass={ styles.informationLabel}
                    text={'Escolha a unidade para editar o cardapio'}
                />


                <div className={ styles.unityListDiv }>
                    { unityList && unityList.map((item, i) => (
                        <ButtonComp
                            key={i}
                            text={item.name}
                            onClickButton={ () => handleSetUnityId( item.id )}
                        />
                    ))}
                </div>

            </div>
        </div>
    )
}


export default ManageMenuPage;