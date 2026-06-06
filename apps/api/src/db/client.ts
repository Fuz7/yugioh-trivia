import { drizzle } from "drizzle-orm/d1";


export const createDB =  (D1:D1Database)=> drizzle(D1)