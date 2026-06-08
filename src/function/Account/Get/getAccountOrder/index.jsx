import axios from "axios";
import api from "../../../Api";

const getAccountOrder = async ( idUser ) => {
    const response = await api.get(
        `/orders`
    )

    const orderData = response.data
    //console.log(" ORDER DATA: ", orderData)
    return orderData
}


export default getAccountOrder;