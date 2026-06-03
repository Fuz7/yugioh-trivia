import type { Context } from "hono";

const getUser = (c:Context) => {
  const payload = c.get("jwtPayload")
  return c.json(payload)
}

const usersController = {
  getUser,
}

export default usersController

