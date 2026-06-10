import api from "../../../Api";
import createMenuForUnity from "../createMenuForUnity";




const createNewUnity = async( unityName ) => {


    let tmpLastUnity = await api.get(
        `/listOfUnits?_sort=id&_order=desc&_limit=1`
    )
    let lastUnity = tmpLastUnity.data[0]

    let lastId = 1

    if( lastUnity.id ) {
        lastId = lastUnity.id
    }



    let newUnityData = {
        'id' : lastId,
        'name' : categoryName,
        'address' : {}
    }

    //console.log(" CATEGORIES2: ", categories)
    const response = await api.post(
        `/listOfUnits`, newUnityData
    )

    //console.log(" get Category list: ", unityId, response.data[0].category)
    return response
}

export default createNewUnity;