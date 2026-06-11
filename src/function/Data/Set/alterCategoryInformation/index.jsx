import api from "../../../Api";




const alterCategoryInformation = async( unityId, categoryId, categoryName, status ) => {
    if ( status === 'false') {
        status = false
    }

    else if( status === 'true' ) {
        status = true
    }
        
    let categories = await api.get(
        `/menuForUnity?unityId=${unityId}`
    )
    
    categories = categories.data[0]
    let idCategory = categories.id
    categories = categories.category

    //console.log(" CATEGORIES1: ", categories)
    //console.log(" 1C: ", categoryId)
    for( let i = 0; i < categories.length; i ++ ) {
        if( String(categories[i].categoryId) === String(categoryId) ) {
            categories[i].name = categoryName
            categories[i].status =  status
            console.log(" 2C: ", categories[i])
        }
    }

    //console.log(" CATEGORIES2: ", categories)
    const response = await api.patch(
        `/menuForUnity/${idCategory}`, {
            'category' : categories,
        }
    )

    //console.log(" get Category list: ", unityId, response.data[0].category)
    return response
}

export default alterCategoryInformation;