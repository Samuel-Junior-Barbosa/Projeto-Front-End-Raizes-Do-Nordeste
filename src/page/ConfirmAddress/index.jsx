import { useEffect, useRef, useState } from 'react';
import styles from './ConfirmAddress.module.css';
import LabelComp from '/src/component/LabelComp';
import ButtonComp from '../../component/ButtonComp';
import { useNavigate } from 'react-router-dom';
import getAccountData from '../../function/Data/Get/getAccountData';

import getIdUser from '../../function/Account/Get/getIdUser';
import getAddresses from '../../function/Account/Get/getAddresses';
import MarkList from '../../component/MarkList';
import setNewAddress from '../../function/Account/Set/setNewAddress';





const ConfirmAddressPage = () => {

    const navigate = useNavigate()

    const [ currentAccount, setCurrentAccount ] = useState(undefined)
    const [ address, setAddress ] = useState({})
    const [ addressId, setAddressId  ] = useState('')
    
    const cidadeRef = useRef(null)
    const bairroRef = useRef(null)
    const ruaRef = useRef(null)
    const numeroRef = useRef(null)
    const ufRef = useRef(null)

    const [ cidade, setCidade ] = useState('')
    const [ bairro, setBairro ] = useState('')
    const [ rua, setRua ] = useState('')
    const [ numero, setNumero ] = useState('')
    const [ uf, setUf ] = useState('')

    const [ positionSelected, setPositionSelected ] = useState(undefined)
    const [ addNewAddressStatus, setAddNewAddressStatus ] = useState(false)
    const [ addressList, setAddressList ] = useState([])
    const [ addressListData, setAddressListData ] = useState([])
    const username = JSON.parse(sessionStorage.getItem('currentAccount')).name

    const formCom = (
                <div className={ styles.addressDiv}>
                    <label> Cidade: </label>
                    <input
                        ref={cidadeRef}
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value.trim().toUpperCase())}
                        onKeyDown={ (e) => {
                            if( e.key === 'Enter' )  {
                                bairroRef.current?.focus()      
                            }
                        }}
                    />

                    <label> Bairro: </label>
                    <input
                        ref={bairroRef}
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value.trim().toUpperCase())}
                        onKeyDown={ (e) => {
                            if( e.key === 'Enter' )  {
                                ruaRef.current?.focus()
                            }
                        }}
                    />

                    <label> Rua:</label>
                    <input
                        ref={ruaRef}
                        value={rua}
                        onChange={(e) => setRua(e.target.value.trim().toUpperCase())}
                        onKeyDown={ (e) => {
                            if( e.key === 'Enter' )  {
                                numeroRef.current?.focus()
                            }
                        }}
                    />

                    <label> Numero:</label>
                    <input
                        ref={numeroRef}
                        value={numero}
                        onChange={(e) => setNumero(e.target.value.trim().toUpperCase())}
                        onKeyDown={ (e) => {
                            if( e.key === 'Enter' )  {
                                ufRef.current?.focus()
                            }
                        }}
                    />

                    <label> UF:</label>
                    <input
                        ref={ufRef}
                        value={uf}
                        onChange={(e) => setUf(e.target.value.trim().toUpperCase())}
                        onKeyDown={ (e) => {
                            if( e.key === 'Enter' )  {
                                handleSaveNewAddress()
                            }
                        }}
                    />
                </div>
                )

    const handleConfirm = () => {
        let tmpAddress = {
            'id' : addressId,
            'cidade' : cidade,
            'bairro' : bairro,
            'rua' : rua,
            'numero' : numero,
            'uf' : uf
        }


        sessionStorage.setItem("addressSelected", JSON.stringify( tmpAddress ))
        navigate('/choose-payment' )
    }


    const handleAddNewAddress = async () => {
        let confirmWindow = confirm("Deseja realmente adicionar esse novo endereço?")
        if( !confirmWindow ) {
            return
        }

        let tmpIdUser = await getIdUser( username )

        let tmpAddress = {
            'cidade' : cidade,
            'bairro' : bairro,
            'rua' : rua,
            'numero' : numero,
            'uf' : uf
        }

        await setNewAddress( tmpIdUser, cidade, bairro, rua, numero, uf)
    }

    const handleGetCurrentAccountData = async () => {
        let tmpIdUser = await getIdUser( username )
        let tmpAccount = await getAccountData(tmpIdUser)
        let tmpAddressData = await getAddresses( tmpIdUser )
        setAddressListData( tmpAddressData )
        //console.log(" TMP ACCOUNT: ", tmpAccount)
        if( tmpAccount === undefined || tmpAccount === NaN || !tmpAccount ) {
            tmpAccount = {}
        }
        let tmpAddress = []
        for( let i = 0; i < tmpAddressData.length; i ++ ) {
            tmpAddress.push([`${i+1} - ${tmpAddressData[i].cidade} - ${tmpAddressData[i].bairro} - ${tmpAddressData[i].rua} - ${tmpAddressData[i].numero} - ${tmpAddressData[i].uf} ` ])
        }

        setAddressList( tmpAddress)
        setCurrentAccount( tmpAccount )
        return 

    }

    const handleSaveNewAddress = () => {
        /*
        const confirmWindow = confirm("Deseja realmente criar o novo endereço? ")
        if( !confirmWindow ) {
            return
        }
            */


        handleAddNewAddress()
        setAddNewAddressStatus( false )

    }

    const handleGoBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        handleGetCurrentAccountData()
    }, [])

    useEffect(() => {
        if( addNewAddressStatus ) {
            return
        }
        handleGetCurrentAccountData()
    }, [addNewAddressStatus])

    useEffect(() => {
        if( positionSelected === undefined || positionSelected === null  ) {
            return
        }

        let tmpAddress = addressListData[positionSelected]
        setCidade( tmpAddress.cidade )
        setBairro( tmpAddress.bairro )
        setRua( tmpAddress.rua )
        setNumero( tmpAddress.numero )
        setUf( tmpAddress.uf )
        setAddressId( tmpAddress.id )

        //console.log(" tmpAddress: ", tmpAddress.id, tmpAddress.cidade, tmpAddress.bairro, tmpAddress.rua)

        
    }, [positionSelected])

    return (
        <div className={ styles.confirmAddressMainDiv }>
            <LabelComp
                text={"Confirme o endereço de entrega"}
            />

            <div className={ styles.confirmAddress}>
                
                { addNewAddressStatus ? (
                    <div className={ styles.addNewAddressDiv}>
                        {formCom}
                        <ButtonComp
                            text={"salvar"}
                            onClickButton={ handleSaveNewAddress }
                        />
                    </div>
                ) : (
                    <div className={styles.chooseAddressDiv}>
                        <MarkList
                            list={ addressList }
                            nameClass={ styles.addressList }
                            setContentSelected = { setPositionSelected }
                        />
                        <ButtonComp
                            text={"novo endereço"}
                            onClickButton={() => (
                                setAddNewAddressStatus( true )
                            )}
                        />
                    </div>
                    
                )}
                <div className={ styles.bottomButton }>
                    
                    { addNewAddressStatus === false && 
                        <ButtonComp
                            text={"confirmar"}
                            onClickButton={handleConfirm}
                        />
                    }
                    
                    <ButtonComp
                        text={"voltar"}
                        onClickButton={() => (
                            addNewAddressStatus ? setAddNewAddressStatus( false ) : handleGoBack()
                        )}
                    />
                </div>

            </div>
        </div>
    );
}


export default ConfirmAddressPage;