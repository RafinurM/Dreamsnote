export const URL =
  import.meta.env.VITE_DREAMERS_API || 'https://api.dreamsnote.ru';

import type { IDream } from "../types/dreams";
import type { RegisterFormSchema } from "./zod-schema";
export interface IUserResponse {
  user?: unknown;
  success?: boolean;
  data?: unknown;
}
// export const URL = import.meta.env.VITE_DREAMERS_API || "http://localhost:3000"; dev

export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};
export const setAccessToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};
export const removeAccessToken = () => {
  localStorage.removeItem("accessToken");
};

export const checkResponse = async <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const getDreamsApi = async (): Promise<IDream[]> => {
  const response = await fetch(`${URL}/dreams`);
  const data = await checkResponse<{ data?: IDream[]; success?: boolean }>(response);
  return Array.isArray(data) ? data : data?.data ?? [];
};

export const getDreamByIdApi = async (id: number) => {
  const response = await fetch(`${URL}/dreams/${id}`);
  const data = await checkResponse<{ data?: IDream; success?: boolean }>(response);
  return data ? data.data : null;
};

export const createDreamApi = async (payload: Partial<IDream>) => {
  const response = await fetch(`${URL}/dreams`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await checkResponse(response);
  return data;
};

export const likeDreamApi = async (userId: number, dreamId: number) => {
  const res = await fetch(`${URL}/dreams/${dreamId}/like`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Failed to like dream");
  }
  return res.json();
};

export const registerUserApi = async (data: RegisterFormSchema) => {
  const response = await fetch(`${URL}/auth/register`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return response;
};

export const loginUserApi = async (data: {
  name: string;
  password: string;
}) => {
  const response = await fetch(`${URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response;
};

export const forgotPasswordApi = async (data: { email: string }) => {
  const response = await fetch(`${URL}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};
