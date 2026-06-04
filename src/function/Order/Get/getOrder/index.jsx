import api from "../../../Api";


const getOrder = async ( idUser ) => {

    const response = await api.get(
        `http://localhost:3000/orders?id_cliente=${idUser}`
    )
    console.log(" getORder: ", response.data)
    return response.data
}

export default getOrder;