import api from "../../../Api";




const getUnityDataById = async( unityId ) => {

    const response = await api.get(
        `/listOfUnits/${unityId}`
    )

    return response.data
}

export default getUnityDataById;