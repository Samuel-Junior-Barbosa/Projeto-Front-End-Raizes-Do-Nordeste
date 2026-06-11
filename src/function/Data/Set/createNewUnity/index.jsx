import api from "../../../Api";
import createMenuForUnity from "../createMenuForUnity";




const createNewUnity = async( unityName, city, neiborhood, street, number, uf, status  ) => {

    if ( status === 'false') {
        status = false
    }

    else if( status === 'true' ) {
        status = true
    }
        

    let tmpLastUnity = await api.get(
        `/listOfUnits?_sort=-unityId`
    )
    let lastUnity = tmpLastUnity.data[0];

    let lastId = 1
    //console.log(" response: ", lastUnity, tmpLastUnity.data)
    if( lastUnity.unityId ) {
        lastId = Number(lastUnity?.unityId ?? 1);
    }

    lastId += 1
    

    let newUnityData = {
        'unityId' : lastId,
        'name' : unityName,
        'address' : {
            'cidade' : city,
            'bairro' : neiborhood,
            'rua' : street,
            'numero' : number,
            'uf' : uf,
        },
        'status' : status
    }

    //console.log(" CATEGORIES2: ", categories)
    const response = await api.post(
        `/listOfUnits`, newUnityData
    )

    //console.log(" get Category list: ", unityId, response.data[0].category)
    return response
}

export default createNewUnity;