import api from "../../../Api";




const getCategoryListByUnityId = async( unityId, listInative = false ) => {

    let response;
   
    response = await api.get(
        `/menuForUnity?unityId=${unityId}`
    )    

        

    let result = []

    //console.log(" getCategoryListByUnityId: ", response)
    if( !listInative ) {
        for( let i = 0; i < response.data[0].category.length; i ++ ) {
            if( response.data[0].category[i].status === true ) {
                result.push( response.data[0].category[i] )
            }
        }
    }
    else if( response.data && response.data[0]) {
        result = response.data[0].category
    }


    //console.log(" get Category list: ", unityId, response.data[0].category)
    return result
}

export default getCategoryListByUnityId;