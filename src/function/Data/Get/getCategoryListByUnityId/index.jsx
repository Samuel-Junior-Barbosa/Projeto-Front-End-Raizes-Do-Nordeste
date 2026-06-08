import api from "../../../Api";




const getCategoryListByUnityId = async( unityId ) => {

    const response = await api.get(
        `/menuForUnity?unityId=${unityId}`
    )

    let result = []

    if( response.data && response.data[0]) {
        result = response.data[0].category
    }
    

    //console.log(" get Category list: ", unityId, response.data[0].category)
    return result
}

export default getCategoryListByUnityId;