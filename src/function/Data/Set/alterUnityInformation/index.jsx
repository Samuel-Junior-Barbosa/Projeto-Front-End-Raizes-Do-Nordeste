import api from "../../../Api";




const alterUnityInformation = async( unityId, nome, cidade, bairro, rua, numero, uf ) => {

    const addresAlter = {
        cidade,
        bairro,
        rua,
        numero,
        uf
    }

    const response = await api.patch(
        `/listOfUnits/${unityId}`, {
            'name' : nome,
            address : addresAlter
        }
    )

    //console.log(" get Category list: ", unityId, response.data[0].category)
    return response
}

export default alterUnityInformation;