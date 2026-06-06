import type { Context } from "hono";
import type { AppContext } from "../types/config";

export const usersController = {
  getUser(c: Context<AppContext>) {
    const { exp, ...user } = c.get("jwtPayload") as any;
    return c.json(user);
  },
};
export default usersController;
