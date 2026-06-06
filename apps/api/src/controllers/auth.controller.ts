import type { Context } from "hono";
import { authService } from "../services/auth.service";
import { sign, verify } from "hono/utils/jwt/jwt";
import type { AppContext, Bindings, Variables } from "../types/config";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import type { LoginUser, RegisterUser } from "@app/shared";

export const authController = {
  async registerUser(c: Context<AppContext>) {
    try {
      const db = c.get("db");
      const body = await c.req.json<RegisterUser>();
      const user = await authService.register(db, body);

      return c.json(
        {
          message: "User registered successfully",
          user,
        },
        201,
      );
    } catch (err: any) {
      return c.json(
        {
          error: err.message || "Something went wrong",
        },
        400,
      );
    }
  },
  async loginUser(c: Context<AppContext>) {
    try {
      const db = c.get("db");
      const body = await c.req.json<LoginUser>();

      const user = await authService.login(db, body);
      const accessToken = await sign(
        { ...user, exp: Math.floor(Date.now() / 1000) + 60 * 15 },
        c.env.JWT_ACCESS_SECRET,
        "HS256",
      );
      const { rememberMe } = body;
      setCookie(c, "accessToken", accessToken, {
        httpOnly: true,
        // Change to true if not on localhost
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15,
      });

      if (rememberMe) {
        const refreshToken = await sign(
          {
            ...user,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          }, // 30 days
          c.env.JWT_REFRESH_SECRET,
          "HS256",
        );

        setCookie(c, "refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 30,
        });
      }

      return c.json(
        {
          message: "Login successful",
          user,
        },
        200,
      );
    } catch (err) {
      return c.json(
        {
          error: err instanceof Error ? err.message : "Something went wrong",
        },
        400,
      );
    }
  },
  async refreshToken(c: Context<AppContext>) {
    try {
      const refreshToken = getCookie(c, "refreshToken");

      if (!refreshToken) {
        return c.json({ error: "No refresh token" }, 401);
      }

      const payload = await verify(
        refreshToken,
        c.env.JWT_REFRESH_SECRET,
        "HS256",
      );

      if (!payload) {
        return c.json({ error: "Invalid refresh token" }, 401);
      }

      const accessToken = await sign(
        { ...payload, exp: Math.floor(Date.now() / 1000) + 60 * 15 }, // 15 min
        c.env.JWT_ACCESS_SECRET,
        "HS256",
      );

      setCookie(c, "accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 15,
      });

      return c.json({ message: "Token refreshed" }, 200);
    } catch (err) {
      // refresh token is expired or invalid, clear cookies and force login
      deleteCookie(c, "accessToken");
      deleteCookie(c, "refreshToken");

      return c.json({ error: "Session expired" }, 401);
    }
  },
  async logout(c: Context<AppContext>) {
    deleteCookie(c, "accessToken");
    deleteCookie(c, "refreshToken");
    return c.json({ message: "Logged out" }, 200);
  },
};
