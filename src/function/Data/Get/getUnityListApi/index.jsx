import api from "../../../Api";




const getUnityListApi = async() => {

    const response = await api.get(
        `/listOfUnits`
    )

    return response.data
}

export default getUnityListApi;