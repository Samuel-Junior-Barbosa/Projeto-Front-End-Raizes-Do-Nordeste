import { useEffect, useState } from 'react';
import styles from './ManageUnityPage.module.css';
import LabelComp from '/src/component/LabelComp';
import getUnityListApi from '../../../function/Data/Get/getUnityListApi';
import getUnityDataById from '../../../function/Data/Get/getUnityDataById';

import ButtonComp from '../../../component/ButtonComp';
import { useNavigate } from 'react-router-dom';
import alterUnityInformation from '../../../function/Data/Set/alterUnityInformation';


const ManageUnityPage = () => {

    const [ unityList, setUnityList ] = useState([])
    const [ categoryList, setCategoryList ] = useState([])
    const [ productList, setProductList ] = useState([])

    const [ categoryIdSelect, setCategoryIdSelect ] = useState('')
    const [ unityIdSelect, setUnityIdSelect ] = useState('')

    const [ unitySelected, setUnitySelected ] = useState({})

    const [ showUnityList, setShowUnityList ] = useState( true )
    const [ showEditUnity, setShowEditUnity ] = useState( false )

    const [ unityName, setUnityName ] = useState('')
    const [ cidade, setCidade ] = useState('')
    const [ bairro, setBairro ] = useState('')
    const [ rua, setRua ] = useState('')
    const [ numero, setNumero ] = useState('')
    const [ uf, setUf ] = useState('')

    const navigate = useNavigate()



    const handleGetUnityList = async() =>{
        const response = await getUnityListApi()
        setUnityList( response )
    }


    const handleSelectUnity = async ( unityId ) => {
        console.log(" UNITY SELECT: ", unityId)
        setUnityIdSelect( unityId )
        const response = await getUnityDataById( unityId )
        console.log(" UNITY SELECT response: ", response)
        setUnitySelected( response )

        setShowUnityList( false )
        setShowEditUnity( true )
        
    }

    const handleSetNumber = ( number ) => {
        //console.log( " setting number: ", number, Number( number ))
        if( Number( number ) ) {
            setNumero( number )
        }


    }

    const handleSaveAlteration = async () => {
        const confirmWindow = confirm('Deseja realmente alterar essas informações?')
        if( !confirmWindow ) {
            return
        }

        await alterUnityInformation( unityIdSelect, unityName, cidade, bairro, rua, numero, uf)

        alert(" Alterado com sucesso")
        return
    }

    const handleGoBack = () => {
        setShowEditUnity( false )
        setShowUnityList( true )
    }

    useEffect(() => {
        handleGetUnityList()
    }, [])

    useEffect(() => {
        if( !unitySelected || !unitySelected.address ) {
            return
        }

        console.log(" ADDRESS: ", unitySelected)
        
        setUnityName( unitySelected.name)
        setCidade(unitySelected.address.cidade)
        setBairro(unitySelected.address.bairro)
        setRua(unitySelected.address.rua)
        setNumero(unitySelected.address.numero)
        setUf(unitySelected.address.uf)
        
    }, [unitySelected])

    return(
        <div className={styles.manageMenuMainDiv}>
            <LabelComp
                text={'Gerenciar Unidades'}
            />

            <div className={ styles.manageMenuDiv}>
                
                { showUnityList && (
                    <div className={ styles.unityListDiv }>
                        <LabelComp
                            nameClass={ styles.informationLabel}
                            text={'Escolha a unidade para editar as informações'}
                        />

                        { unityList && unityList.map((item, i) => (
                            <ButtonComp
                                key={i}
                                text={item.name}
                                onClickButton={ () => handleSelectUnity( item.id )}
                            />
                        ))}
                    </div>
                )}

                { showEditUnity && (
                    <div className={ styles.editUnityDiv}>
                        <LabelComp
                            nameClass={ styles.informationLabel}
                            text={'Informações dessa unidade'}
                        />

                        <div>
                            <label>Nome: </label>
                            <input
                                type={'text'}
                                value={unityName}
                                onChange={(e) => setUnityName(e.target.value.toUpperCase())}
                            />
                        </div>
                        <div>
                            <LabelComp 
                                nameClass={ styles.labelCompAddress }
                                text={"Endereço"}
                            />
                        </div>
                        <div>
                            <label> Cidade: </label>
                            <input
                                type={'text'}
                                value={cidade}
                                onChange={(e) => setCidade(e.target.value.toUpperCase())}
                            />
                        </div>
                        <div>
                            <label> bairro: </label>
                            <input
                                type={'text'}
                                value={bairro}
                                onChange={(e) => setBairro(e.target.value.toUpperCase())}
                            />
                        </div>
                        <div>
                            <label> rua: </label>
                            <input
                                type={'text'}
                                value={rua}
                                onChange={(e) => setRua(e.target.value.toUpperCase())}
                            />
                        </div>
                        <div>
                            <label> numero: </label>
                            <input
                                type={'text'}
                                value={numero}
                                onChange={(e) => handleSetNumber(e.target.value)}
                            />
                        </div>
                        <div>
                            <label> UF: </label>
                            <input
                                type={'text'}
                                value={uf}
                                onChange={(e) => setUf(e.target.value.trim().toUpperCase())}
                            />
                        </div>

                        <div>
                            <ButtonComp 
                                text={"Salvar"}
                                onClickButton={ handleSaveAlteration }
                            />
                            <ButtonComp 
                                text={"Cancelar"}
                                onClickButton={ handleGoBack }
                            />

                        </div>
                    </div>
                )}
                

            </div>
        </div>
    )
}


export default ManageUnityPage;