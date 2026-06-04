import { useEffect, useState } from 'react';
import styles from './ConfirmAddress.module.css';
import LabelComp from '/src/component/LabelComp';
import ButtonComp from '../../component/ButtonComp';
import { useNavigate } from 'react-router-dom';





const ConfirmAddressPage = () => {

    const navigate = useNavigate()

    const [ currentAccount, setCurrentAccount ] = useState({})
    const [ address, setAddress ] = useState({})

    const [ cidade, setCidade ] = useState('')
    const [ bairro, setBairro ] = useState('')
    const [ rua, setRua ] = useState('')
    const [ numero, setNumero ] = useState('')
    const [ uf, setUf ] = useState('')

    const handleConfirm = () => {
        let tmpAccount = currentAccount
        let tmpAddress = {
            'cidade' : cidade,
            'bairro' : bairro,
            'rua' : rua,
            'numero' : numero,
            'uf' : uf
        }


        tmpAccount.address = tmpAddress

        console.log(" CURRENT ACCOUNT: ", tmpAccount)

        let tmpMockData = JSON.parse( localStorage.getItem("mockData"))
        for( let i = 0; i < tmpMockData.length; i ++ ) {
            if( tmpMockData[i].name === tmpAccount.name ) {
                tmpMockData[i] = tmpAccount
            }
        }

        sessionStorage.setItem("currentAccount", JSON.stringify(tmpAccount) )
        localStorage.setItem("mockData", JSON.stringify(tmpMockData) )
        navigate('/choose-payment')
    }

    const handleGoBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        let tmpAccount = JSON.parse( sessionStorage.getItem("currentAccount") )
        
        console.log(" tmpAccount: ", tmpAccount)
        if( tmpAccount === undefined || tmpAccount === NaN || !tmpAccount ) {
            tmpAccount = {}
        }
        setCurrentAccount( tmpAccount )

        let tmpAddress = tmpAccount.address

        if( !tmpAddress ) {
            return
        }
        setCidade( tmpAddress.cidade )
        setBairro( tmpAddress.bairro )
        setRua( tmpAddress.rua )
        setNumero( tmpAddress.numero )
        setUf( tmpAddress.uf )
        
        
    }, [])

    return (
        <div className={ styles.confirmAddressMainDiv }>
            <LabelComp
                text={"Confirme o endereço de entrega"}
            />
            <div className={ styles.confirmAddress}>
                <div className={ styles.addressDiv}>
                    <label> Cidade: </label>
                    <input
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value.trim().toUpperCase())}
                    />

                    <label> Bairro: </label>
                    <input
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value.trim().toUpperCase())}
                    />

                    <label> Rua:</label>
                    <input
                        value={rua}
                        onChange={(e) => setRua(e.target.value.trim().toUpperCase())}
                    />

                    <label> Numero:</label>
                    <input
                        value={numero}
                        onChange={(e) => setNumero(e.target.value.trim().toUpperCase())}
                    />

                    <label> UF:</label>
                    <input
                        value={uf}
                        onChange={(e) => setUf(e.target.value.trim().toUpperCase())}
                    />
                </div>

                <div className={ styles.bottomButton }>
                    <ButtonComp
                        text={"confirmar"}
                        onClickButton={handleConfirm}
                    />
                    <ButtonComp
                        text={"voltar"}
                        onClickButton={handleGoBack}
                    />
                </div>

            </div>
        </div>
    );
}


export default ConfirmAddressPage;