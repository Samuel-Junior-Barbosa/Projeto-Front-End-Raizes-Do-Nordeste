import api from "../../../Api";




const getProductListOfUnity = async( unityId, listInative = false ) => {
    unityId = String( unityId ) 
    
    let response = await api.get(
            `/menuForUnity?unityId=${unityId}`
        )
    console.log(" getProductListOfUnity: ", unityId, response.data[0].productList)

    if( !response.data[0] ) {
        return []
    }


    let productList = [];
    if( listInative ) {
        productList = response.data[0].productList
    }

    else {
        for( let i = 0; i < response.data[0].productList.length; i ++ ) {
            productList.push( response.data[0].productList[i] )
        }
    }
    
    console.log(" getProductListOfUnity 2: ", productList)
    return productList
}

export default getProductListOfUnity;