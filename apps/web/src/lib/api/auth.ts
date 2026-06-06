import {
  type LoginUser,
  type PayloadUser,
  type RegisterUser,
} from "@app/shared";
import api from "../../utils/axios";

export async function registerUser(data: RegisterUser) {
  const { data: result } = await api.post(`/api/auth/register`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
}
export async function loginUser(data: LoginUser): Promise<PayloadUser> {
  const { data: result } = await api.post(`/api/auth/login`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return result.user;
}
export async function logoutUser() {
  const { data: result } = await api.post(`/api/auth/logout`, "", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return result;
}
