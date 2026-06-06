import type { RegisterUser, User } from "@app/shared";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";

export const userRepository = {
  async findByEmail(db: DrizzleD1Database, email: string) {
    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    return users[0] ?? null;
  },

  async create(
    db: DrizzleD1Database,
    user: Omit<RegisterUser, "confirmPassword">,
  ) {
    const result = await db
      .insert(usersTable)
      .values({
        email: user.email,
        name: user.name,
        password: user.password,
      })
      .returning();

    return result[0];
  },
};
