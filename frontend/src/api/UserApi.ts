import { isAxiosError } from "axios";
import api from "../lib/axios";
import { getUserListSchema, User, UserCreateForm, userSchema, UserUpdateAdmin } from "../types";

export async function getUserList(page: number) {
    try {
      const url = `/users/list-user?page=${page}`
      const { data } = await api(url);
      
      const response = getUserListSchema.safeParse(data);
      if (response.success) {
        return response.data;
      }
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  }
  


  export async function createUserApi(formData: UserCreateForm) {
    try {
      const url = "/users/create-user";
  
      const {data} = await api.post<string>(url, formData);
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        throw new Error(error.response.data.error);
      }
    }
  }
  

  export async function deleteUserApi(id: User['_id']){
    try {
      const url = `/users/${id}`
      const {data} = await api.delete<string>(url)
      return data
    } catch (error) {
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error);
      }
    }
  } 
  

  export async function blockUserById(id: User['_id']) {
    try {
      const url = `/users/block/${id}`
      const {data} = await api.post<string>(url)
      return data
    } catch (error) {
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error);
      }
    }
  }


  
export async function updateUserAdmin(formData: UserUpdateAdmin){
    try {
      const url = `/users/${formData._id}`
      const {data} = await api.put<string>(url, formData)
      return data
    } catch (error) {
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error);
      }
    }
  }

  

export async function getUserById(id: User['_id']){
    try {
      const url = `/users/info/${id}`
      const {data} = await api.get(url)
      
       const response = userSchema.safeParse(data);
         if (response.success) {
          return response.data;
        }
      return data
    } catch (error) {
      if(isAxiosError(error) && error.response){
        throw new Error(error.response.data.error);
      }
    }
  } 