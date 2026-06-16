import axios from "axios";
import api from "/src/function/Api";
import getAccountData from "../../../Data/Get/getAccountData";


const setLgpdConcentiment = async ( accountId, typeConcentiment, response) => {
    
    let tmpData = await getAccountData( accountId )

    if( typeConcentiment === 1 ) {
        tmpData.lgpdConcentiment.systemAuthentication = response
    }
    else if( typeConcentiment === 2 ) { 
        tmpData.lgpdConcentiment.placingOrders = response
    }
    else if( typeConcentiment === 3 ) {
        tmpData.lgpdConcentiment.participationInTheLoyaltyProgram = response
    }
    else if( typeConcentiment === 4 ) {
        tmpData.lgpdConcentiment.askedToUserLgpdTerm = response
    }
    else if( typeConcentiment === 5 ) {
        tmpData.lgpdConcentiment.askedToUserCookies = response
    }
    console.log(" setLgpdConcentiment: ", tmpData)

    await api.patch(
        `/accountData/${tmpData.id}`, {
            'lgpdConcentiment' : tmpData.lgpdConcentiment
        }
    )

    return response
}


export default setLgpdConcentiment;