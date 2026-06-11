import api from "../../../Api";




const getUnityListApi = async(listUnityInative = false) => {

    let response = undefined;

    if( listUnityInative === true ) {
        response = await api.get(
            `/listOfUnits`
        )
    } else {
        response = await api.get(
            `/listOfUnits?status=true`
        )

    }
    //console.log(" getUnityListApi: ", response)
    return response.data
}

export default getUnityListApi;