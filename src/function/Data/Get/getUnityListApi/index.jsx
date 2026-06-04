import api from "../../../Api";




const getUnityListApi = async() => {

    const response = await api.get(
        `http://localhost:3000/listOfUnits`
    )

    return response.data
}

export default getUnityListApi;