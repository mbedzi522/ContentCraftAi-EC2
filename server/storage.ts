import { 
  type User, 
  type InsertUser, 
  type ContentGeneration,
  type ContentGenerationRequest,
  type GeneratedContent 
} from "@shared/schema";

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contentGenerations: Map<number, ContentGeneration>;
  userCurrentId: number;
  generationCurrentId: number;

  constructor() {
    this.users = new Map();
    this.contentGenerations = new Map();
    this.userCurrentId = 1;
    this.generationCurrentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveContentGeneration(generation: ContentGenerationRequest & { generatedContent: GeneratedContent }): Promise<ContentGeneration> {
    const id = this.generationCurrentId++;
    const timestamp = new Date();
    
    const contentGeneration: ContentGeneration = {
      id,
      contentType: generation.contentType,
      toneStyle: generation.toneStyle,
      wordCount: generation.wordCount,
      platform: generation.platform,
      keywords: generation.keywords,
      callToAction: generation.callToAction || null,
      generateHashtags: generation.generateHashtags,
      includeMetaDescription: generation.includeMetaDescription,
      checkPlagiarism: generation.checkPlagiarism,
      generatedContent: generation.generatedContent,
      createdAt: timestamp
    };
    
    this.contentGenerations.set(id, contentGeneration);
    return contentGeneration;
  }

  async getContentGeneration(id: number): Promise<ContentGeneration | undefined> {
    return this.contentGenerations.get(id);
  }

  async getRecentContentGenerations(limit: number): Promise<ContentGeneration[]> {
    return Array.from(this.contentGenerations.values())
      .sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
