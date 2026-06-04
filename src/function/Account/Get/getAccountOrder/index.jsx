import axios from "axios";

const getAccountOrder = async ( idUser ) => {
    const response = await axios.get(
        `http://localhost:3000/orders`
    )

    const orderData = response.data
    console.log(" ORDER DATA: ", orderData)
    return orderData
}


export default getAccountOrder;