import api from "../../../Api";




const getProductListOfUnity = async( unityId ) => {
    unityId = String( unityId ) 
    
    const response = await api.get(
        `/menuForUnity?unityId=${unityId}`
    )
    //console.log(" getProductListOfUnity: ", unityId, response.data[0].productList)

    if( !response.data[0] ) {
        return []
    }
    let productList = response.data[0].productList
    
    //console.log(" getProductListOfUnity 2: ", productList)
    return productList
}

export default getProductListOfUnity;