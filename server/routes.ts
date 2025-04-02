import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contentGenerationSchema } from "@shared/schema";
import { generateContent } from "./gemini";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Content generation endpoint
  app.post("/api/generate-content", async (req, res) => {
    try {
      // Validate request body against schema
      const validatedData = contentGenerationSchema.parse(req.body);
      
      // Generate content using Gemini AI
      const generatedContent = await generateContent(validatedData);
      
      // Save the generation to storage
      const savedGeneration = await storage.saveContentGeneration({
        ...validatedData,
        generatedContent
      });
      
      // Return the generated content
      res.json({
        success: true,
        generation: savedGeneration
      });
    } catch (error) {
      console.error("Content generation error:", error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validationError.details
        });
      }
      
      // Handle Gemini/Google API errors
      const err = error as any;
      if (err.status === 429 || (err.message && err.message.includes("quota"))) {
        return res.status(429).json({
          success: false,
          message: "Rate limit exceeded. Please try again later."
        });
      }
      
      res.status(500).json({
        success: false,
        message: "Failed to generate content. Please try again."
      });
    }
  });

  // Get recent content generations (could be used for history feature)
  app.get("/api/recent-generations", async (req, res) => {
    try {
      const recentGenerations = await storage.getRecentContentGenerations(10);
      res.json({
        success: true,
        generations: recentGenerations
      });
    } catch (error) {
      console.error("Error fetching recent generations:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch recent generations"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
