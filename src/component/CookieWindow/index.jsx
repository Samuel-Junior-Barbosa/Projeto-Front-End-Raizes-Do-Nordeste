
import setLgpdConcentiment from '../../function/Account/Set/setLgpdConcentiment';
import ButtonComp from '../ButtonComp';
import styles from './CookieWindow.module.css';


const CookieWindow = ( {setControlFrame = undefined}) => {

    const typeConcentiment = 5

    const handleAskedToUser = async ( response ) => {
        let tmpData = JSON.parse( sessionStorage.getItem("currentAccount"))

        if( response === true || response === false ) {
            tmpData.lgpdConcentiment = response
        }

        else  {
            alert(` Resposta inesperada ${response}`)
            return 
        }

        sessionStorage.setItem("currentAccount", JSON.stringify(tmpData) )

        if( tmpData.accountId ) {
            await setLgpdConcentiment( Number(tmpData.accountId), typeConcentiment, response )
        }
        
        if( setControlFrame != undefined) {

            
            setControlFrame( false )
        }
        

    }
    return (
        <div className={ styles.cookieWindowMainDiv}>
            <div>
                <label> Ao continuar, você concorda com o uso de cookies para melhorar sua experiência de compra </label>
            </div>
            <div>
                <ButtonComp 
                    text={"Concordar"}
                    onClickButton={ () => handleAskedToUser( true )}
                />
                <ButtonComp 
                    text={"Discordar"}
                    onClickButton={ () => handleAskedToUser( false )}
                />

            </div>
        </div>
    )
}

export default CookieWindow;