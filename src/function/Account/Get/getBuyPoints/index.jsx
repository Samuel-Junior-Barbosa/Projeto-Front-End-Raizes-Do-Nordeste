import getAccountData from '../../../Data/Get/getData';



const getBuyPoint = async ( idUser ) => {
    
    const response = await getAccountData( idUser )
    //console.log(" GET POIN RESPONSE: ", response.name, response.buyPoint, idUser)
    let point = response.buyPoint
    return point

};

export default getBuyPoint;