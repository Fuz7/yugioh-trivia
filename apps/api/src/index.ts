import { Hono } from "hono";
import api from "./api";
import { createDB } from "./db/client";
import type { Bindings, Variables } from "./types/config";
import { cors } from "hono/cors";
const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.use("*", async (c, next) => {
  c.set("db", createDB(c.env.DB));
  await next();
});

// Change appropriately when prod
app.use(
  "*",
  cors({
    origin: "*", // dev only
    credentials:true, 
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);
app.route("/api", api);

export default app;
