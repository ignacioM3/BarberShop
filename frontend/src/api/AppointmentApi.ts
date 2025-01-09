import { isAxiosError } from "axios";
import api from "../lib/axios";

export async function getTodayAppointmentApi (branchId: string){
  try {
    const url = `/appointment/${branchId}/today`;
    const {data} = await api(url);
    return data;

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

