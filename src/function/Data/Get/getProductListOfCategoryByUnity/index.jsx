import api from "../../../Api";




const getProductListOfCategoryByUnity = async( unityId, categoryId, listInative = false ) => {
    unityId = String( unityId ) 
    categoryId = String( categoryId )
    const response = await api.get(
        `/menuForUnity?unityId=${unityId}`
    )
    //console.log(" getProductListOfCategoryByUnity: ", unityId, response.data[0].productList)

    let productList = []

    if( listInative ) {
        for( let i = 0; i < response.data[0].productList.length; i ++ ) {
            //console.log(" getProductListOfCategoryByUnity 2: ", response.data[0].productList[i])
            if( response.data[0].productList[i].categoryId == categoryId ) {
                productList.push( response.data[0].productList[i] )
            }
        }
    }
    else {
        for( let i = 0; i < response.data[0].productList.length; i ++ ) {
        //console.log(" getProductListOfCategoryByUnity 2: ", response.data[0].productList[i])
            if( response.data[0].productList[i].status === false ){
                continue
            }
            if( response.data[0].productList[i].categoryId == categoryId ) {
                productList.push( response.data[0].productList[i] )
            }
            
        }
    }
    

    //console.log(" getProductListOfCategoryByUnity 3: ", productList)
    return productList
}

export default getProductListOfCategoryByUnity;