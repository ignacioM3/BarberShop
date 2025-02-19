import { isAxiosError } from "axios";
import api from "../lib/axios";
import { CreateBarberForm } from "../types";




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