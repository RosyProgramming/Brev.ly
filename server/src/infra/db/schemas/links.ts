import { randomUUID } from "node:crypto";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";

export const links = pgTable('links', {
    id: text('id')
        .primaryKey()
        .$defaultFn(() => randomUUID()),
    originalUrl: text('original_url').notNull(),
    shortUrl: varchar('short_url', { length: 50 }).notNull().unique(),
    accessCount: integer('access_count').default(0).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
})