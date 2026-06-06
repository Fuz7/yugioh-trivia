import { env } from "cloudflare:workers";
import { jwt } from "hono/jwt";

export const authMiddleware = () => {
  
  return jwt({
    secret: env.JWT_ACCESS_SECRET, 
    alg: "HS256",
    cookie:'accessToken'
  });

} 
