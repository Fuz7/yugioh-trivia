import { Hono } from "hono";
import type { createDB } from "../db/client";

export type Variables = {
  db: ReturnType<typeof createDB>;
};

export type Bindings = {
  JWT_ACCESS_SECRET: string;
  JWT_REFRESH_SECRET: string;
  DB: D1Database;
};
export type AppContext = {
  Bindings: Bindings;
  Variables: Variables;
};

