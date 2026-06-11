import api from "../../../Api";




const alterUnityInformation = async( unityId, nome, cidade, bairro, rua, numero, uf, status ) => {
    if ( status === 'false') {
        status = false
    }

    else if( status === 'true' ) {
        status = true
    }
        
    let unityData = await api.get(
        `/listOfUnits?unityId=${unityId}`
    )

    unityData = unityData.data[0]

    const addresAlter = {
        cidade,
        bairro,
        rua,
        numero,
        uf
    }

    const response = await api.patch(
        `/listOfUnits/${unityData.id}`, {
            'name' : nome,
            'address' : addresAlter,
            'status' : status
        }
    )

    //console.log(" get Category list: ", unityId, response.data[0].category)
    return response
}

export default alterUnityInformation;