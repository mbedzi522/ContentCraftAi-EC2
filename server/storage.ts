import { 
  type User, 
  type InsertUser, 
  type ContentGeneration,
  type ContentGenerationRequest,
  type GeneratedContent,
  users,
  contentGenerations
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Content generation methods
  saveContentGeneration(generation: ContentGenerationRequest & { generatedContent: GeneratedContent }): Promise<ContentGeneration>;
  getContentGeneration(id: number): Promise<ContentGeneration | undefined>;
  getRecentContentGenerations(limit: number): Promise<ContentGeneration[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result.length > 0 ? result[0] : undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async saveContentGeneration(generation: ContentGenerationRequest & { generatedContent: GeneratedContent }): Promise<ContentGeneration> {
    const result = await db.insert(contentGenerations).values({
      contentType: generation.contentType,
      toneStyle: generation.toneStyle,
      wordCount: generation.wordCount,
      platform: generation.platform,
      keywords: generation.keywords,
      callToAction: generation.callToAction || null,
      generateHashtags: generation.generateHashtags,
      includeMetaDescription: generation.includeMetaDescription,
      checkPlagiarism: generation.checkPlagiarism,
      generatedContent: generation.generatedContent
    }).returning();
    
    return result[0];
  }

  async getContentGeneration(id: number): Promise<ContentGeneration | undefined> {
    const result = await db.select().from(contentGenerations).where(eq(contentGenerations.id, id));
    return result.length > 0 ? result[0] : undefined;
  }

  async getRecentContentGenerations(limit: number): Promise<ContentGeneration[]> {
    return await db.select()
      .from(contentGenerations)
      .orderBy(desc(contentGenerations.createdAt))
      .limit(limit);
  }
}

// Switch from MemStorage to DatabaseStorage for persistent storage
export const storage = new DatabaseStorage();
