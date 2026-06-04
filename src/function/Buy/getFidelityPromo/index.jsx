import api from "../../Api";


const getFidelityPromo = async ( code ) => {


    const response = await api.get(
        `http://localhost:3000/fidelity?code=${code}`
    )

    return response.data[0]
}


export default getFidelityPromo;