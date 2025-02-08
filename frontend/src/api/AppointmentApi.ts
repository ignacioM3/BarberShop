import { isAxiosError } from "axios";
import api from "../lib/axios";
import { createAppointmentApiType, deleteAppointmentApiType } from "../types";

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
    console.log(data)
    return data;

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function createAppointmentApi ({branchId, formData}: {branchId: string, formData: createAppointmentApiType}){
  try {
    console.log(formData)
    const url = `/appointment/${branchId}/create-appointment`;
    const {data} = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updateStatusAppointmentApi({appointmentId, status} : {appointmentId: string, status: string}){
  try {
    const url = `/appointment/${appointmentId}/update-status`;
    const {data} = await api.post<string>(url, {status});
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteAppointmentApi(appointmentId: deleteAppointmentApiType){
  try {
    const url = `/appointment/${appointmentId}/delete`;
    const {data} = await api.delete<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getAppointmentByDayApi({branchId, appointmentId}: {branchId: string, appointmentId: string}){
  try {
    const url = `/appointment/${branchId}/week/${appointmentId}`;
    const {data} = await api(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}