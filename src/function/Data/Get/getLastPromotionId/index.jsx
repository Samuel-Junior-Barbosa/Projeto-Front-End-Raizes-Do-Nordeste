import api from "../../../Api"


const getLastPromotionId = async () => {
    let lastPromotionId = 1
    
    let promotionData = await api.get(
        `/discountCoupon?_sort=-promotionId`
    )

    if( promotionData.data ) {
        lastPromotionId = Number(promotionData.data[0]?.promotionId ?? 1)
    }

    return lastPromotionId 
}


export default getLastPromotionId;