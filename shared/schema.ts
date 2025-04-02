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
  "email",
  "trading",
  "tiktok"
] as const;

export const toneStyles = [
  "casual",
  "formal",
  "humorous", 
  "motivational",
  "technical",
  "viral",
  "trendy"
] as const;

export const wordCountOptions = [
  "short",
  "medium",
  "long"
] as const;

export const platformOptions = [
  "website",
  "blog",
  "instagram",
  "facebook",
  "linkedin",
  "twitter",
  "tiktok",
  "email",
  "ecommerce",
  "trading",
  "investment"
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
  includeMetaKeywords: boolean("include_meta_keywords").default(false),
  includeSeoTitle: boolean("include_seo_title").default(false),
  generateTrendingTags: boolean("generate_trending_tags").default(false),
  checkPlagiarism: boolean("check_plagiarism").default(false),
  includeTradingInsights: boolean("include_trading_insights").default(false),
  includeViralAnalysis: boolean("include_viral_analysis").default(false),
  seoOptimization: boolean("seo_optimization").default(false),
  trendingAnalysis: boolean("trending_analysis").default(false),
  marketTrends: boolean("market_trends").default(false),
  riskAnalysis: boolean("risk_analysis").default(false),
  timeframeRecommendation: boolean("timeframe_recommendation").default(false),
  viralPotential: boolean("viral_potential").default(false),
  demographicAnalysis: boolean("demographic_analysis").default(false),
  trendingTags: boolean("trending_tags").default(false),
  targetAudience: text("target_audience"),
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
  includeMetaKeywords: z.boolean().default(false),
  includeSeoTitle: z.boolean().default(false),
  generateTrendingTags: z.boolean().default(false),
  checkPlagiarism: z.boolean().default(false),
  includeTradingInsights: z.boolean().default(false),
  includeViralAnalysis: z.boolean().default(false),
  seoOptimization: z.boolean().default(false),
  trendingAnalysis: z.boolean().default(false),
  marketTrends: z.boolean().default(false),
  riskAnalysis: z.boolean().default(false),
  timeframeRecommendation: z.boolean().default(false),
  viralPotential: z.boolean().default(false),
  demographicAnalysis: z.boolean().default(false),
  trendingTags: z.boolean().default(false),
  targetAudience: z.string().optional(),
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
  metaKeywords?: string;
  seoTitle?: string;
  hashtags?: string[];
  plagiarismScore?: number;
  trendingTags?: string[];
  tradingInsights?: {
    marketTrend?: string;
    riskLevel?: string;
    potentialReturn?: string;
    timeframe?: string;
  };
  viralPotential?: number;
  targetDemographic?: string;
};
