import { isAxiosError } from "axios";
import api from "../lib/axios";
import {  getBranchListSchema } from "../types";

export async function getAllBranchsApi() {
    try {
        const url = '/branch/get-branchs';
        const {data} = await api(url);
        const response = getBranchListSchema.safeParse(data);
        if(response.success){
            return response.data
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
          }
    }
}