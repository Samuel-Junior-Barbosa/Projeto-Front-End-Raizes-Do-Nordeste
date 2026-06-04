import api from "../../../Api";




const getUnityIdByName = async( unityName ) => {

    const response = await api.get(
        `http://localhost:3000/listOfUnits?name=${unityName}`
    )

    return response.data[0]
}

export default getUnityIdByName;