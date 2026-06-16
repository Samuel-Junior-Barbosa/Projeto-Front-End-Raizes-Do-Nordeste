import axios from "axios";
import api from "/src/function/Api";


const setNewAddress = async ( idUser, city, street, neighborhood, number, uf ) => {
    let response;
    let lastAddress = await api.get(
        '/addresses?_sort=-addressId'
    )
    
    let maxId = Number(lastAddress.data[0]?.addressId?? 1)

    let addressData = {
        'accountId' : idUser,
        'addressId' : maxId + 1,
        'cidade' : city,
        'bairro' : neighborhood,
        'rua' : street,
        'numero' : number,
        'uf' : uf
    }

    

    //console.log(" tmpAddressData: ", addressData)
    response = await api.post(`/addresses`, addressData )

    return response
}


export default setNewAddress;