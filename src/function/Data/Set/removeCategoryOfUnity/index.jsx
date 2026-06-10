import api from "../../../Api";




const removeCategoryOfUnity = async( unityId, categoryId ) => {


    let categories = await api.get(
        `/menuForUnity?unityId=${unityId}`
    )
    
    categories = categories.data[0]
    let idCategory = categories.id
    categories = categories.category
    let index = -1
    //console.log(" CATEGORIES1: ", categories)
    //console.log(" 1C: ", categoryId)
    for( let i = 0; i < categories.length; i ++ ) {
        if( String(categories[i].categoryId) === String(categoryId) ) {
            index = i
        }
    }

    if( index >= 0 ) {
        categories.splice(index, 1)
    }

    //console.log(" CATEGORIES2: ", categories)
    const response = await api.patch(
        `/menuForUnity/${idCategory}`, {
            'category' : categories
        }
    )

    //console.log(" get Category list: ", unityId, response.data[0].category)
    return response
}

export default removeCategoryOfUnity;