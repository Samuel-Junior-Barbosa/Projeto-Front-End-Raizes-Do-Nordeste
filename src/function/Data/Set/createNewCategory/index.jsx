import api from "../../../Api";
import createMenuForUnity from "../createMenuForUnity";




const createNewCategory = async( unityId, categoryName ) => {


    let categories = await api.get(
        `/menuForUnity?unityId=${unityId}`
    )
    
    categories = categories.data[0]

    if( !categories ) {
        await createMenuForUnity( unityId )
    }
    
    let idCategory = categories.id
    categories = categories.category
    let newId = 1

    for( let i = 0; i < categories.length; i ++ ) {
        if( Number(categories[i].categoryId) > newId ) {
            newId = Number(categories[i].categoryId)
        }
    }

    categories.push({
        'name' : categoryName,
        'categoryId' : newId+1
    })

    //console.log(" CATEGORIES2: ", categories)
    const response = await api.patch(
        `/menuForUnity/${idCategory}`, {
            'category' : categories
        }
    )

    //console.log(" get Category list: ", unityId, response.data[0].category)
    return response
}

export default createNewCategory;