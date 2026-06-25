
import getAccountData from "/src/function/Data/Get/getAccountData";
import getBuyPoint from "/src/function/Account/Get/getBuyPoints";
import api from "/src/function/Api";




const removeBuyPoint = async ( idUser, value = 1 ) => {

    const response = await getBuyPoint( idUser )
    const accountData = await getAccountData( idUser )

    
    let point = response - value
    //console.log(" ADD BUYPOINT: ", response, point, value)
    await api.patch(
        `/accountData/${accountData.id}`,
        { 'buyPoint' : point }
    )
    return
}


export default removeBuyPoint;