import { env } from "cloudflare:workers";
import { jwt } from "hono/jwt";

export const authMiddleware = () => {
  
  return jwt({
    secret: env.JWT_SECRET, 
    alg: "HS256",
  });
} 
