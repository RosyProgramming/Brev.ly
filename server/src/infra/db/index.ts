import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { schema } from './schemas'
import { env } from '@/env'

export const pg = postgres(env.DATABASE_URL)
export const db = drizzle(pg, { schema })