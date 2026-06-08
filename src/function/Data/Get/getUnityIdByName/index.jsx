import api from "../../../Api";




const getUnityIdByName = async( unityName ) => {

    const response = await api.get(
        `/listOfUnits?name=${unityName}`
    )

    return response.data
}

export default getUnityIdByName;