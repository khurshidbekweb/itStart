import { customAxios } from "@/service"

export const curdUtils = {
    getData: async () => {
        const {data} = await customAxios.get('')
        return data
    }
}