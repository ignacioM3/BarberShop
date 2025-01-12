import { isAxiosError } from "axios";
import api from "../lib/axios";
import { createAppointmentApiType } from "../types";

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

export async function getAppointmentByIdApi (appointmentId: string){
  try {
    const url = `/appointment/${appointmentId}`;
    const {data} = await api(url);
    return data;

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function createAppointmentApi ({branchId, formData}: {branchId: string, formData: createAppointmentApiType}){
  try {
    const url = `/appointment/${branchId}/create-appointment`;
    const {data} = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}