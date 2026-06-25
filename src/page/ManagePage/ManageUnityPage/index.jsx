import { useEffect, useState } from 'react';
import styles from './ManageUnityPage.module.css';
import LabelComp from '/src/component/LabelComp';
import getUnityListApi from '../../../function/Data/Get/getUnityListApi';
import getUnityDataById from '../../../function/Data/Get/getUnityDataById';

import ButtonComp from '../../../component/ButtonComp';
import { useNavigate } from 'react-router-dom';
import alterUnityInformation from '../../../function/Data/Set/alterUnityInformation';
import createNewUnity from '../../../function/Data/Set/createNewUnity';


const ManageUnityPage = () => {

    const [ unityList, setUnityList ] = useState([])
    const [ categoryList, setCategoryList ] = useState([])
    const [ productList, setProductList ] = useState([])

    const [ categoryIdSelect, setCategoryIdSelect ] = useState('')
    const [ unityIdSelect, setUnityIdSelect ] = useState('')

    const [ unitySelected, setUnitySelected ] = useState({})

    const [ showUnityList, setShowUnityList ] = useState( true )
    const [ showEditUnity, setShowEditUnity ] = useState( false )
    const [ showCreateUnity, setShowCreateUnity ] = useState( false )

    const [ unityName, setUnityName ] = useState('')
    const [ unityStatus, setUnityStatus ] = useState(true)
    const [ cidade, setCidade ] = useState('')
    const [ bairro, setBairro ] = useState('')
    const [ rua, setRua ] = useState('')
    const [ numero, setNumero ] = useState('')
    const [ uf, setUf ] = useState('')

    const navigate = useNavigate()

    const handleResetValues = () => {
        setUnityName('')
        setUnityStatus(true)
        setCidade('')
        setBairro('')
        setRua('')
        setNumero('')
        setUf('')
        setUnitySelected(undefined)
    }

    const handleGetUnityList = async() =>{
        const response = await getUnityListApi(true)
        setUnityList( response )
    }


    const handleSelectUnity = async ( unityId ) => {
        //console.log(" UNITY SELECT1: ", unityId)
        
        setUnityIdSelect( unityId )
        const response = await getUnityDataById( unityId )
        
        //console.log(" UNITY SELECT2 response: ", response)

        setUnitySelected( response )
        setUnityName( response.name )
        setUnityStatus( response.status )
        setCidade( response.address.cidade )
        setBairro( response.address.bairro )
        setRua( response.address.rua )
        setNumero( response.address.numero )
        setUf( response.address.uf )

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

        await alterUnityInformation( unityIdSelect, unityName, cidade, bairro, rua, numero, uf, unityStatus)

        setShowEditUnity( false )
        setShowUnityList( true )
        handleResetValues()
        alert(" Alterado com sucesso")
        return
    }

    const handleCancelEditUnity = () => {
        setShowEditUnity( false )
        setShowUnityList( true )
        handleResetValues()
    }

    const handleShowCreateUnity = () => {
        setShowUnityList( false )
        setShowCreateUnity( true )
    }

    const handleCancelCreateUnity = () => {
        setShowUnityList( true )
        setShowCreateUnity( false )
    }


    const handleCreateNewUnity = async () => {
        const confirmWindow = confirm(" Deseja realmente criar essa unidade?")
        if( !confirmWindow ) {
            return
        }

        let openingHours = {
            "0" : ["domingo-feira", "fechado", "fechado"],
            "1" : ["segunda-feira", "09:00", "18h"],
            "2" : ["terca-feira", "09:00", "18h"],
            "3" : ["quarta-feira", "09:00", "18h"],
            "4" : ["quinta-feira", "09:00", "18h"],
            "5" : ["sexta-feira", "09:00", "18h"],
            "6" : ["sabado-feira", "09:00", "18h"]
        };

        await createNewUnity( unityName, cidade, bairro, rua, numero, uf, unityStatus, openingHours )
        handleResetValues()
        
        setShowCreateUnity( false )
        setShowUnityList( true )

        alert(" Unidade criado com sucesso!")

        

    }


    useEffect(() => {
        handleGetUnityList()
    }, [])

    useEffect(() => {

        if( !showUnityList ) {
            return
        }
        
        handleGetUnityList()

    }, [ showUnityList ])


    useEffect(() => {
        if( !unitySelected || !unitySelected.address || !unitySelected.name ) {
            return
        }

        //console.log(" ADDRESS: ", unitySelected)
        
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
                    <>
                        <LabelComp
                            nameClass={ styles.informationLabel}
                            text={'Escolha a unidade para editar as informações'}
                        />
                        <div className={ styles.unityListDiv }>
                            { unityList && unityList.map((item, i) => (
                                <ButtonComp
                                    key={i}
                                    text={item.name}
                                    nameClass={ item.status ? "" : styles.inativeStatus}
                                    onClickButton={ () => handleSelectUnity( item.unityId )}
                                />
                            ))}
                        </div>
                        <div className={ styles.buttonDiv }>
                                <ButtonComp 
                                    text={'Criar nova unidade'}
                                    onClickButton={ handleShowCreateUnity }
                                />
                        </div>
                    </>
                    
                )}

                { showEditUnity && (
                    <div className={ styles.editUnityDiv}>
                        <LabelComp
                            nameClass={ styles.informationLabel}
                            text={'Informações dessa unidade'}
                        />
                        <div className={ styles.labelId }>
                            <label> ID: </label>
                            <input
                                type={'text'}
                                value={unitySelected.unityId}
                                readOnly={true}
                            />
                        </div>
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
                                minLength={0}
                                maxLength={2}
                                value={uf}
                                onChange={(e) => setUf(e.target.value.trim().toUpperCase())}
                            />
                        </div>
                        <div>
                            <label> STATUS: </label>
                            <select
                                defaultValue={ unityStatus }
                                onChange={ (e) => setUnityStatus( e.target.value )}
                            >
                                <option
                                    key={0}
                                    value={true}
                                >
                                    ATIVO
                                </option>
                                <option
                                    key={1}
                                    value={false}
                                >
                                    INATIVO
                                </option>
                            </select>
                        </div>
                        <div>
                            <ButtonComp 
                                text={"Salvar"}
                                onClickButton={ handleSaveAlteration }
                            />
                            <ButtonComp 
                                text={"Cancelar"}
                                onClickButton={ handleCancelEditUnity }
                            />

                        </div>
                    </div>
                )}
                
                {showCreateUnity && (
                    <div className={ styles.createUnityDiv}>
                        <LabelComp
                            nameClass={ styles.informationLabel}
                            text={'Preencha as informações'}
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
                                maxLength={2}
                                minLength={0}
                                onChange={(e) => setUf(e.target.value.trim().toUpperCase())}
                            />
                        </div>
                        <div>
                            <label> STATUS: </label>
                            <select
                                defaultValue={ unityStatus }
                                onChange={ (e) => setUnityStatus( e.target.value )}
                            >
                                <option
                                    key={0}
                                    value={true}
                                >
                                    ATIVO
                                </option>
                                <option
                                    key={1}
                                    value={false}
                                >
                                    INATIVO
                                </option>
                            </select>
                        </div>

                        <div>
                            <ButtonComp 
                                text={"Salvar"}
                                onClickButton={ handleCreateNewUnity }
                            />
                            <ButtonComp 
                                text={"Cancelar"}
                                onClickButton={ handleCancelCreateUnity }
                            />

                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}


export default ManageUnityPage;