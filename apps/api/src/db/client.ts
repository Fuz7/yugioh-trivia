import { drizzle } from "drizzle-orm/d1";


export const db =  (D1:D1Database)=> drizzle(D1)