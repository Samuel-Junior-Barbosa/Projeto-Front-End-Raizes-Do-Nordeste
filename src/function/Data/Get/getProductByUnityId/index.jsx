import api from "../../../Api";




const getProductByUnityId = async( unityId, productId ) => {

    const unityData = await api.get(
        `/menuForUnity?unityId=${unityId}`
    )

    let productList = unityData.data[0].productList
    let productData = undefined
    //console.log(" productList1: ", productList)
    for( let i = 0; i < productList.length; i ++ ) {
        //console.log(" productList2: ", i, " ", productList[i])
        //console.log(" productList3: ",  String(productList[i].id) === String(productId))
        if( String(productList[i].id) === String(productId) ) {
            //console.log(" FOUND ")
            productData = productList[i]
            break
        }
    }

    return productData
}

export default getProductByUnityId;