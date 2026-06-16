import api from "../../../Api"


    const getLastAccountId = async () => {
        let lastAccountId = 1
        
        let userData = await api.get(
            `/accountData?_sort=-accountId`
        )

        if( userData.data ) {
            lastAccountId = Number(userData.data[0]?.accountId ?? 1)
        }

        return lastAccountId 
    }


    export default getLastAccountId;