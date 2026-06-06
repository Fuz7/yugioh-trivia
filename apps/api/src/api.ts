import { Hono } from "hono";
import usersRouter from "./routes/users";
import type { AppContext, Bindings } from "./types/config";
import authRouter from "./routes/auth";

const api = new Hono<AppContext>();

api.get("/", (c) => c.text("Hello Hono API 🚀"));
api.route("/users", usersRouter);
api.route("/auth", authRouter);
export default api;
