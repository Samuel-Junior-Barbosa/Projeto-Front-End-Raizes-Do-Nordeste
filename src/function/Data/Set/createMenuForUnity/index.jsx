import api from "../../../Api";




const createMenuForUnity = async( unityId ) => {

    unityId = String(unityId)
    let tmpMenuData = await api.get(
        `/menuForUnity?unityId=${unityId}`
    )

    
    tmpMenuData = tmpMenuData.data
    console.log('tmpMenuData: ', tmpMenuData, unityId)
    if( tmpMenuData.length ) {
        return 1
    }

    //console.log(" CATEGORIES2: ", categories)
    const response = await api.post(
        `/menuForUnity`, {
            'unityId' : unityId,
            'category' : [],
            'productList' : []
        }
    )

    //console.log(" get Category list: ", unityId, response.data[0].category)
    return response
}

export default createMenuForUnity;