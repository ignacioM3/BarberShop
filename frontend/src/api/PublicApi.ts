import api from "../lib/axios";
import { handleApiError } from "./handleErrorApi";

export async function getAllBranchPublicApi(){
    try {
        const url = '/public/branchs';
        const { data } = await api(url)
        return data
    } catch (error) {
        handleApiError(error)
    }
}