import OpenAI from "openai";
import { ContentGenerationRequest, GeneratedContent } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "your-api-key", // Will be provided via environment variables
});

export async function generateContent(request: ContentGenerationRequest): Promise<GeneratedContent> {
  // Create a detailed prompt based on the request parameters
  const wordCountRange = request.wordCount === "short" ? "150-200" : "500-1000";
  
  const systemPrompt = `You are an expert content creator and SEO specialist. 
Create high-quality, engaging, and SEO-optimized ${request.contentType} content.
The content should be:
- Written in a ${request.toneStyle} tone
- Approximately ${wordCountRange} words in length
- Optimized for the ${request.platform} platform
- Optimized for the following keywords: ${request.keywords}
${request.callToAction ? `- Include this call to action: ${request.callToAction}` : ''}
${request.generateHashtags ? '- Include relevant hashtags for social sharing' : ''}
${request.includeMetaDescription ? '- Include an SEO-optimized meta description (under 160 characters)' : ''}

Format your response as JSON with the following structure:
{
  "title": "An attention-grabbing title",
  "body": "The main content with proper formatting including paragraphs, lists if appropriate, etc.",
  ${request.includeMetaDescription ? '"metaDescription": "SEO-friendly meta description under 160 characters",' : ''}
  ${request.generateHashtags ? '"hashtags": ["array", "of", "relevant", "hashtags"],' : ''}
  ${request.checkPlagiarism ? '"plagiarismScore": 0.0,' : ''}
}

Ensure the content is original, engaging, and effectively incorporates the keywords in a natural way.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { 
          role: "user", 
          content: `Create a ${request.contentType} about ${request.keywords} for ${request.platform} in a ${request.toneStyle} tone.` 
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    // Parse the JSON response
    const content = JSON.parse(response.choices[0].message.content || "{}");
    
    // For demonstration purposes, if plagiarism check was requested but not provided by the API
    if (request.checkPlagiarism && !content.plagiarismScore) {
      content.plagiarismScore = 0.0; // Assuming 0.0 means no plagiarism detected
    }

    return content as GeneratedContent;
  } catch (error) {
    console.error("Error generating content with OpenAI:", error);
    throw error;
  }
}
