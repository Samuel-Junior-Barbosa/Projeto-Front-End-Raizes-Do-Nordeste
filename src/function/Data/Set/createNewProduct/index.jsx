import api from "../../../Api"
import createMenuForUnity from "../createMenuForUnity"


const createNewProduct = async (unityId, name, value, description, categoryId, ing, status) => {
    if ( status === 'false') {
        status = false
    }

    else if( status === 'true' ) {
        status = true
    }
        
    let result = 0
    unityId = String( unityId )
    let menuData = await api.get(
        `/menuForUnity?unityId=${unityId}`
    )
    console.log(' createNewProduct menuData: ', menuData.data, unityId)
    if( !menuData.data.length ) {
        await createMenuForUnity( unityId )
        menuData = await api.get(
            `/menuForUnity?unityId=${unityId}`
        )
    }

    menuData = menuData.data[0]

    let menuId = menuData.id
    let maxId = 1
    
    let productList = menuData.productList
    if( productList.length ) {
        console.log(" CREATE PRODUCT LIST LENGTH: ", productList.length)
        for( let i = 0; i < productList.length; i ++ ) {
            if( productList[i].id > maxId ) {
                maxId = productList[i].id
            }
        }
    }




    let data = {
        'produto' : name,
        'description' : description,
        "ingredientes" : ing,
        "precovenda" : value,
        'id' : maxId + 1,
        "categoryId" : categoryId,
        'status' : status

    }
    productList.push( data )
    const response = await api.patch(
        `/menuForUnity/${menuId}`, {
            'productList' : productList
        }
    )

    if( response.status !== 200 ) {
        result = response.status
    }
    
    return result
}

export default createNewProduct;