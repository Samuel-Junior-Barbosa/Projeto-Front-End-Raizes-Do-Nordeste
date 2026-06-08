import axios from "axios";
import api from "../../../Api";


const setNewAddress = async ( idUser, city, street, neighborhood, number, uf ) => {
   let response;
    let addressData = {
        'accountId' : idUser,
        'cidade' : city,
        'bairro' : neighborhood,
        'rua' : street,
        'numero' : number,
        'uf' : uf
    }


    console.log(" tmpAddressData: ", addressData)
    response = await api.post(`/addresses`, addressData )

    return response
}


export default setNewAddress;