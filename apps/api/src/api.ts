import { Hono } from "hono";
import usersRouter from "./routes/users";

type Bindings = {
  JWT_SECRET: string;
  DB: D1Database;
};

const api = new Hono<{ Bindings: Bindings }>();

api.get("/", (c) => c.text("Hello Hono API 🚀"));
api.route("/users", usersRouter);

export default api;