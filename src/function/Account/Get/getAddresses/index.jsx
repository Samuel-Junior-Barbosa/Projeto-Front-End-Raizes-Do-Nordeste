import api from '/src/function/Api';
import getAccountData from '/src/function/Data/Get/getAccountData';



const getAddresses = async ( idUser ) => {
    let response;    
    
    response = await api.get(
        `/addresses?accountId=${idUser}`
    )
    
    return response.data

};

export default getAddresses;