import api from "../lib/axios";
import {
  branchSchema,
  FormDataCreateBranchApi,
} from "../types";
import { handleApiError } from "./handleErrorApi";

export async function getAllBranchsApi() {
  try {
    const url = "/branch/get-branchs";
    const { data } = await api(url);
  return data
  } catch (error) {
    handleApiError(error);
  }
}

export async function getBarbersOutBranch() {
  try {
    const url = "/branch/get-barbers";
    const { data } = await api(url);
    return data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function removeBarberToBranch({
  branchId,
  barberId,
}: {
  branchId: string;
  barberId: string;
}) {
  try {
    const url = `/branch/${branchId}/remove-barber/${barberId}`;
    const { data } = await api.delete(url);
    return data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function addBarberToBranch({
  branchId,
  barberId,
}: {
  branchId: string;
  barberId: string;
}) {
  try {
    const url = `/branch/${branchId}/add-barber`;
    const { data } = await api.post(url, {
      id: barberId,
    });
    return data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function getBranchById(branchId: string) {
  try {
    const url = `/branch/info/${branchId}`;
    const { data } = await api(url);

    const response = branchSchema.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    handleApiError(error);
  }
}

export async function deleteBranchByIdApi(branchId: string) {
  try {
    const url = `/branch/${branchId}`;
    const { data } = await api.delete<string>(url);
    console.log(data);
    return data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function createBranchApi(form: FormDataCreateBranchApi) {
  try {
    const url = `/branch/create-branch`;
    const { data } = await api.post<string>(url, form);
    return data;
  } catch (error) {
    handleApiError(error);
  }
}


export async function updateBranchApi({dataForm, branchId}: {dataForm: FormDataCreateBranchApi, branchId: string}){
  try {
    const url = `/branch/${branchId}/edit`
    const {data} = await api.put<string>(url, dataForm)
    return data
  } catch (error) {
    handleApiError(error);
  }
}
