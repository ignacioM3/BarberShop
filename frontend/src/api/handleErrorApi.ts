import { AxiosError } from "axios";

export function handleApiError(error: unknown): never {
  if (error instanceof AxiosError && error.response) {
    const errorMessage =
      error.response.data?.error ||
      (Array.isArray(error.response.data?.errors)
        ? error.response.data.errors.map((err: any) => err.msg).join(", ")
        : "Ocurrió un error inesperado");

    throw new Error(errorMessage);
  }

  throw new Error("Error de conexión con el servidor");
}
