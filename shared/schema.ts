import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Content Types
export const contentTypes = [
  "blog",
  "social",
  "product",
  "email"
] as const;

export const toneStyles = [
  "casual",
  "formal",
  "humorous", 
  "motivational",
  "technical"
] as const;

export const wordCountOptions = [
  "short",
  "long"
] as const;

export const platformOptions = [
  "website",
  "instagram",
  "facebook",
  "linkedin",
  "twitter",
  "email"
] as const;

// Content schema for generation requests
export const contentGenerations = pgTable("content_generations", {
  id: serial("id").primaryKey(),
  contentType: text("content_type").notNull(),
  toneStyle: text("tone_style").notNull(),
  wordCount: text("word_count").notNull(),
  platform: text("platform").notNull(),
  keywords: text("keywords").notNull(),
  callToAction: text("call_to_action"),
  generateHashtags: boolean("generate_hashtags").default(false),
  includeMetaDescription: boolean("include_meta_description").default(false),
  checkPlagiarism: boolean("check_plagiarism").default(false),
  generatedContent: jsonb("generated_content"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const contentGenerationSchema = createInsertSchema(contentGenerations).omit({
  id: true,
  generatedContent: true,
  createdAt: true
}).extend({
  contentType: z.enum(contentTypes),
  toneStyle: z.enum(toneStyles),
  wordCount: z.enum(wordCountOptions),
  platform: z.enum(platformOptions),
  keywords: z.string().min(3, "Please enter at least 3 characters for keywords"),
  callToAction: z.string().optional(),
  generateHashtags: z.boolean().default(false),
  includeMetaDescription: z.boolean().default(false),
  checkPlagiarism: z.boolean().default(false),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type ContentGenerationRequest = z.infer<typeof contentGenerationSchema>;
export type ContentGeneration = typeof contentGenerations.$inferSelect;

// Content generation response from AI
export type GeneratedContent = {
  title: string;
  body: string;
  metaDescription?: string;
  hashtags?: string[];
  plagiarismScore?: number;
};
