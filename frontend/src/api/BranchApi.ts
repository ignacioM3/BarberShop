import { isAxiosError } from "axios";
import api from "../lib/axios";
import { branchSchema,  getBranchListSchema } from "../types";

export async function getAllBranchsApi() {
  try {
    const url = "/branch/get-branchs";
    const { data } = await api(url);
    const response = getBranchListSchema.safeParse(data);

    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getBarbersOutBranch() {
  try {
    const url = "/branch/get-barbers"
    const {data} = await api(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}


export async function removeBarberToBranch({ branchId, barberId }: { branchId: string; barberId: string }){
  try {
    const url = `/branch/${branchId}/remove-barber/${barberId}`
    const {data} = await api.delete(url)
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function addBarberToBranch({ branchId, barberId }: { branchId: string; barberId: string }){
  try {
    const url = `/branch/${branchId}/add-barber`
    const {data} = await api.post(url, {
      id: barberId
    })
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function getBranchById(branchId: string){
  try {
    const url = `/branch/info/${branchId}`
   const {data} = await api(url);

   const response = branchSchema.safeParse(data);
   if (response.success) {
    console.log(response.data)
    return response.data;
  }
  } catch (error) {
      if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function deleteBranchByIdApi(branchId: string){
  try {
    const url = `/branch/${branchId}`;
    const {data} = await api.delete<string>(url);
    console.log(data)
    return data
  } catch (error) {
    if(isAxiosError(error) && error.response){
      throw new Error(error.response.data.error);
    }
  }
}