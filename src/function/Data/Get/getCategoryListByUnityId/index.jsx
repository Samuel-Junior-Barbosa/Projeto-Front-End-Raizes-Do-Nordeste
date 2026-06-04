import api from "../../../Api";




const getCategoryListByUnityId = async( unityId ) => {

    const response = await api.get(
        `http://localhost:3000/menuForUnity?unityId=${unityId}`
    )
    //console.log(" get Category list: ", unityId, response.data[0].category)
    return response.data[0].category
}

export default getCategoryListByUnityId;