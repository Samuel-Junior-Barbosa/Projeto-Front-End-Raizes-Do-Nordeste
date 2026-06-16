import api from "../../../Api"
import getLastAccountId from "../../Get/getLastAccountId"
import createMenuForUnity from "../createMenuForUnity"


const createNewUser = async ( name, password, email, lgpdAuthenticationTerm=false, lgpdOrderQueryTern=false, lgpdFidelityTerm=false, status= true ) => {
    let result = 0
    let lastAccountId = await getLastAccountId()


    let data = {
        'accountId' : lastAccountId + 1,
        'name' : name,
        'password' : password,
        "lgpdConcentiment" : {
            'systemAuthentication' : lgpdAuthenticationTerm,
            'placingOrders' : lgpdOrderQueryTern,
            'participationInTheLoyaltyProgram' : lgpdFidelityTerm
        },
        "buyPoint" : 0,
        'shoppingCart' : [],
        "administrator" : false,
        'status' : status,

    }
    
    const response = await api.post(
        `/accountData`, data
    )

    
    return result
}

export default createNewUser;