import getAccountData from '../../../Data/Get/getAccountData';



const getBuyPoint = async ( idUser ) => {
    
    const response = await getAccountData( idUser )
    //console.log(" GET POIN RESPONSE: ", response.name, response.buyPoint, idUser)
    let point = Number(response.buyPoint)
    return point

};

export default getBuyPoint;