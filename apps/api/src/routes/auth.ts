import { Hono } from "hono";
import { authController } from "../controllers/auth.controller";

const authRouter = new Hono();

authRouter.post("register", authController.registerUser);
authRouter.post("login",authController.loginUser)
authRouter.post("refresh",authController.refreshToken)
authRouter.post("logout",authController.logout)
export default authRouter;