import { customAxios } from "@/service"
import { cardUpload } from "@/types"

export const curdUtils = {
    getData: async () => {
        const {data} = await customAxios.get('')
        return data
    },
    createData: async ({date, description,photo,time,title,id}:cardUpload) => {
        const {data} = await customAxios.post('', {date, description,photo,time,title,id})
        return data
    },
    updateData: async ({date, description,photo,time,title,id}:cardUpload) => {
        const {data} = await customAxios.patch(`${id}`, {date, description,photo,time,title,id})
        return data
    },
    deleteData: async (id:string) => {
        const {data} = await customAxios.delete(`${id}`)
        return data
    },
}