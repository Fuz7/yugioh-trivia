import api from "../../utils/axios";

export async function getMe() {
  const { data: result } = await api.get("/api/users/me", {});
  return result;
}
