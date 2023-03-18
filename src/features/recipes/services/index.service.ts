import axiosInstance from "@/shared/axios";
import type { AxiosError, AxiosResponse } from "axios";
import type { GetRecipeInformation } from "../lib/interfaces";

export const getSimilarRecipes = async (id: string) => {
  const response = await axiosInstance.get(`/recipes/${id}/similar`);
  return response.data;
};

export interface ErrorResponse {
  error: string;
}

export const getRecipeInformation = async (
  id: string
): Promise<GetRecipeInformation | ErrorResponse> => {
  try {
    const response: AxiosResponse<GetRecipeInformation> =
      await axiosInstance.get(`/recipes/${id}/information`);
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    return { error: error.message };
  }
};
