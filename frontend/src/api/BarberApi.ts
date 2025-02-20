import { isAxiosError } from "axios";
import api from "../lib/axios";
import { CreateBarberForm, getBarberListSchema } from "../types";




export async function createBarberApi(formData: CreateBarberForm) {
    try {
      const url = "/users/create-barber";
      const {data} = await api.post<string>(url, formData);
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  }


  export async function getBarberList(page: number){
    try {
      const url = `/users/list-barber?page=${page}`;
      const {data} = await api(url);
  
      const response = getBarberListSchema.safeParse(data);
      if(response.success){
        return response.data
      }
      
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  }