import getAccountData from "../../Data/Get/getData";
import getIdUser from '/src/function/Account/Get/getIdUser';

const simulationLoginApi = async ( user, pass ) => {
    const idUser = await getIdUser( user )
    const loginAccountData = await getAccountData( idUser );
    //console.log(" LOGIN DATA: ", loginAccountData)
    let data = {
        'status' : 0,
        'content' : { 
            'data' : [],
            'logged' : false
        }
    }
    
    //console.log(" API LOGIN: ", user, pass)

    
    if( user === loginAccountData.name && pass === loginAccountData.password) {
        data.content.logged = true
        data.content.data = loginAccountData
        return data
    }

    return data

}


export default simulationLoginApi;