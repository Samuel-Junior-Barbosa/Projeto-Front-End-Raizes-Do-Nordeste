import api from '/src/function/Api';

const validEmailUsed = async ( email ) => {

    let response = await api.get(
        `/accountData?email=${email}`
    )

    if( response.data[0] ) {
        return true
    }

    else {
        return false
    }

}

export default validEmailUsed;