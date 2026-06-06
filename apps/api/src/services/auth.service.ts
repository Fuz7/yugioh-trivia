import type { LoginUser, PayloadUser, RegisterUser, User } from "@app/shared";
import { userRepository } from "../repository/user.repository";
import type { DrizzleD1Database } from "drizzle-orm/d1";

async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: 200_000,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  );

  // store as "salt:hash" — both hex-encoded
  const toHex = (buf: ArrayBuffer) =>
    [...new Uint8Array(buf)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

  return `${toHex(salt.buffer)}:${toHex(hashBuffer)}`;
}

async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const [saltHex, hashHex] = stored.split(":");
  const salt = new Uint8Array(
    saltHex.match(/.{2}/g)!.map((b) => parseInt(b, 16)),
  );

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const hashBuffer = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt,
      iterations: 200_000,
      hash: "SHA-256",
    },
    keyMaterial,
    256,
  );

  const toHex = (buf: ArrayBuffer) =>
    [...new Uint8Array(buf)]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

  return toHex(hashBuffer) === hashHex;
}

export const authService = {
  async register(db: DrizzleD1Database, data: RegisterUser):Promise<PayloadUser> {
    const { email, name, password, confirmPassword } = data;

    if (!email || !name || !password || !confirmPassword) {
      throw new Error("All fields are required");
    }
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const existingUser = await userRepository.findByEmail(db, email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await userRepository.create(db, {
      email,
      name,
      password: hashedPassword,
    });

    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    };
  },

  async login(db: DrizzleD1Database, data: LoginUser): Promise<PayloadUser> {
    const { email, password } = data;

    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }
    const user = await userRepository.findByEmail(db, email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const valid = await verifyPassword(password, user.password);

    if (!valid) {
      throw new Error("Invalid email or password");
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  },
};
