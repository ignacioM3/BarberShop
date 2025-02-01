import { isAxiosError } from "axios";
import api from "../lib/axios";
import { getProfitByMonthFormData, getProfitSchema } from "../types";

export async function getProfitByMonth({month, year}: getProfitByMonthFormData){
    try {
        const url = `/profit`
        const {data} = await api(url, {
            params: {
                month,
                year
            }
        })
        const response = getProfitSchema.safeParse(data)
        if (response.success) {
            return response.data;
          }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}


export async function getProfitByYear(year : string){
    try {
        const url = `/profit/by-year`
        const {data} = await api(url, {
            params: {
                year: year 
            }
        })

        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}