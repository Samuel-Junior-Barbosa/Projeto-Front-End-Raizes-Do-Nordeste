import api from "../../../Api";




const getUnityDataById = async( unityId ) => {

    const response = await api.get(
        `/listOfUnits?unityId=${unityId}`
    )

    return response.data[0]
}

export default getUnityDataById;