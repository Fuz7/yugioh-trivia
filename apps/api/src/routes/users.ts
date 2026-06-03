import { Hono } from "hono";
import { authMiddleware } from "../middleware/auth";
import usersController from "../controllers/users.controller";

const usersRouter = new Hono();

usersRouter.use("*", authMiddleware());
usersRouter.get("/me", usersController.getUser);

export default usersRouter;