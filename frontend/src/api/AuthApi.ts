import { isAxiosError } from "axios";
import api from "../lib/axios";
import {
  ConfirmToken,
  ForgotPasswordForm,
  getBarberListSchema,
  getUserListSchema,
  NewPasswordFormType,
  RequestConfirmationCodeForm,
  User,
  UserCreateForm,
  UserLogged,
  UserLoginForm,
  UserRegistrationForm,
  userSchema,
  UserUpdateAdmin,
} from "../types";

export async function createAccountApi(formData: UserRegistrationForm) {
  try {
    const url = `/auth/create-account`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function authLogin(
  formData: UserLoginForm,
  setCurrentUser: (user: UserLogged) => void
) {
  try {
    const url = "/auth/login";
    const { data } = await api.post<string>(url, formData);
    localStorage.setItem("AUTH_TOKEN", data);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data}`,
      },
    };

    const { data: userData } = await api.get<UserLogged>(
      "/auth/user/perfil",
      config
    );
    setCurrentUser(userData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function requestConfirmationCodeApi(formData: RequestConfirmationCodeForm){
  try {
    const url = `/auth/request-code`;
    const {data} = await api.post<string>(url, formData)
    return data

  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}


export async function confirmAccountApi(formData: ConfirmToken){
  try {
    const url = "/auth/confirm-account"
    const {data} = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function forgotPasswordApi(formData: ForgotPasswordForm){
  try {
    const url = '/auth/forgot-password';
    const {data} = await api.post<string>(url, formData)
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function validateTokenApi(formData: ConfirmToken){
  try {
    const url = "/auth/validate-token";
    const {data} = await api.post<string>(url, formData);
    return data
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function updatePasswordWithTokenApi({formData, token} : {formData: NewPasswordFormType, token: ConfirmToken['token']}){
  try {
    const url = `/auth/update-password/${token}`
    const {data} = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

/* User */


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