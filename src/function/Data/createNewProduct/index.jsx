

const createNewProduct = (name, value, description, categoryId, ing, unityId) => {
    let result = 0
    
    let data = {
        'produto' : name,
        "ingredientes" : ing,
        "precovenda" : value,
        "categoryId" : categoryId
    }

    const response = await api.post(
        `/menuForUnity/unityId=${unityId}/productList`
    )
    if( response.status !== 200 ) {
        result = response.status
    }
    
    return result
}

export default createNewProduct;