import api from "../../../Api";




const alterProductInformation = async( unityId, productId, nome, descricao, ingredientes, precovenda, categoryId, status ) => {

    const alterData = {
        'produto' : nome,
        'description' : descricao,
        'ingredientes' : ingredientes,
        'precovenda' : precovenda,
        'categoryId' : categoryId,
        'status' : status
    }

    let menuData = await api.get(
        `/menuForUnity?unityId=${unityId}`
    )
    menuData = menuData.data[0]

    let productList = menuData.productList

    //console.log(" PRODUCT LIST DATA: ", productList)
    let idMenu = menuData.id

    for( let i = 0; i < productList.length; i ++ ) {
        if( productList[i].id === productId ) {
            productList[i].produto     = nome
            productList[i].description = descricao
            productList[i].ingredientes= ingredientes
            productList[i].precovenda  = precovenda
            productList[i].categoryId  = categoryId
            productList[i].status      = status
        }
        break
    }
    

    const response = await api.patch(
        `/menuForUnity/${idMenu}`, {
            'productList' : productList
        }
    )

    //console.log(" get Category list: ", unityId, response.data[0].category)
    return response
}

export default alterProductInformation;