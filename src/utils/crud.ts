import { customAxios } from "@/service"
import { cardType } from "@/types"

export const curdUtils = {
    getData: async () => {
        const {data} = await customAxios.get('')
        return data
    },
    createData: async ({date, description,photo,time,title,id}:cardType) => {
        const {data} = await customAxios.post('', {date, description,photo,time,title,id})
        return data
    }
}