import { BASE_URL_SERVER } from "@/constants";
import axios from "axios";

export const customAxios = axios.create({
    baseURL: BASE_URL_SERVER,
    timeout: 10000
})