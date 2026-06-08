import api from '../../../Api';
import getAccountData from '../../../Data/Get/getData';



const getAddresses = async ( idUser ) => {
    let response;    
    
    response = await api.get(
        `/addresses?accountId=${idUser}`
    )
    
    return response.data

};

export default getAddresses;