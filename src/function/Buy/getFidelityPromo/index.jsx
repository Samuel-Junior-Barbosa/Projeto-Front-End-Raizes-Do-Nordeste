import api from "../../Api";


const getFidelityPromo = async ( code ) => {


    const response = await api.get(
        `/fidelity?code=${code}`
    )

    return response.data[0]
}


export default getFidelityPromo;