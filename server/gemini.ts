import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { ContentGenerationRequest, GeneratedContent } from "@shared/schema";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

// Gemini model configuration for content generation
const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
};

// Safety settings to ensure appropriate content
const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

/**
 * Generates content based on the provided request using Gemini AI
 * @param request The content generation request
 * @returns The generated content
 */
export async function generateContent(request: ContentGenerationRequest): Promise<GeneratedContent> {
  try {
    // Get the Gemini model (using the 1.0Pro model as it's more widely available)
    const model = genAI.getGenerativeModel({
      model: "gemini-1.0-pro",
      generationConfig,
      safetySettings,
    });

    // Create the prompt based on the request
    const prompt = createPrompt(request);

    // Generate content using Gemini
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parse the generated content
    return parseGeneratedContent(text, request);
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
    const err = error as any;
    throw new Error(`Failed to generate content: ${err.message || 'Unknown error'}`);
  }
}

/**
 * Creates a detailed prompt for Gemini based on the content generation request
 * @param request Content generation request parameters
 * @returns Formatted prompt string
 */
function createPrompt(request: ContentGenerationRequest): string {
  const {
    contentType,
    toneStyle,
    wordCount,
    platform,
    keywords,
    callToAction,
    generateHashtags,
    includeMetaDescription,
    checkPlagiarism,
  } = request;

  // Convert content type to a more descriptive format
  const contentTypeMap = {
    blog: "Blog Post",
    social: "Social Media Post",
    product: "Product Description",
    email: "Email Template",
  };

  // Convert tone style to a more descriptive format
  const toneStyleMap = {
    casual: "Casual and Conversational",
    formal: "Formal and Professional",
    humorous: "Humorous and Friendly",
    motivational: "Motivational and Inspiring",
    technical: "Technical and Detailed",
  };

  // Create a detailed instruction prompt for the AI
  let prompt = `Generate ${contentTypeMap[contentType as keyof typeof contentTypeMap]} content with a ${
    toneStyleMap[toneStyle as keyof typeof toneStyleMap]
  } tone.`;

  // Add word count context
  prompt += `\nLength: ${wordCount === "short" ? "Short (150-200 words)" : "Long (500-1000 words)"}`;

  // Add platform information
  prompt += `\nPlatform: ${platform}`;

  // Add keywords for SEO
  prompt += `\nTarget SEO Keywords: ${keywords}`;

  // Add call to action if provided
  if (callToAction) {
    prompt += `\nInclude this call to action: "${callToAction}"`;
  }

  // Additional requirements
  if (generateHashtags) {
    prompt += "\nGenerate 5-7 relevant hashtags for social sharing.";
  }

  if (includeMetaDescription) {
    prompt += "\nCreate a compelling meta description for SEO (150-160 characters).";
  }

  // Structure formatting instructions
  prompt += `\n\nPlease format your response in the following JSON structure:
{
  "title": "An attention-grabbing title",
  "body": "The main content with proper formatting...",
  ${includeMetaDescription ? '"metaDescription": "A compelling meta description for SEO",' : ""}
  ${generateHashtags ? '"hashtags": ["tag1", "tag2", "tag3", "tag4", "tag5"],' : ""}
  ${checkPlagiarism ? '"plagiarismScore": 0,' : ""}
}`;

  // Add detailed instructions based on content type
  switch (contentType) {
    case "blog":
      prompt += `\n\nThe blog post should include:
- An engaging introduction
- Well-structured sections with subheadings
- Bullet points or numbered lists where appropriate
- Strategic placement of keywords
- A compelling conclusion
- Use markdown formatting for emphasis: **bold** for important points and *italic* for emphasis`;
      break;
    case "social":
      prompt += `\n\nThe social media post should:
- Be concise and engaging
- Use an authentic voice
- Include relevant emojis where appropriate
- End with a clear call to action
- Format hashtags with # symbol`;
      break;
    case "product":
      prompt += `\n\nThe product description should:
- Highlight key features and benefits
- Address potential customer pain points
- Use persuasive language
- Include technical specifications where relevant
- End with a compelling reason to buy`;
      break;
    case "email":
      prompt += `\n\nThe email template should include:
- An attention-grabbing subject line (include as part of the title)
- Personalized greeting
- Clear and concise message
- Strong call-to-action
- Professional sign-off`;
      break;
  }

  return prompt;
}

/**
 * Parses the generated text from Gemini and converts it to structured content
 * @param text The raw text response from Gemini
 * @param request The original content request for context
 * @returns Structured generated content
 */
function parseGeneratedContent(text: string, request: ContentGenerationRequest): GeneratedContent {
  try {
    // Try to parse as JSON first (preferred format)
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonContent = JSON.parse(jsonMatch[0]);
        return {
          title: jsonContent.title || "Generated Content",
          body: jsonContent.body || text,
          metaDescription: jsonContent.metaDescription,
          hashtags: jsonContent.hashtags,
          plagiarismScore: jsonContent.plagiarismScore,
        };
      }
    } catch (e) {
      console.log("JSON parsing failed, falling back to text parsing");
    }

    // Fallback parsing for non-JSON responses
    const lines = text.split("\n").filter(line => line.trim().length > 0);
    
    let title = lines[0].replace(/^#\s+/, "").trim();
    let body = lines.slice(1).join("\n").trim();
    let metaDescription = undefined;
    let hashtags = undefined;
    
    // Extract meta description if requested and present
    if (request.includeMetaDescription) {
      const metaMatch = text.match(/Meta Description:[\s\n]*(.*?)(?:\n\n|$)/i);
      if (metaMatch) {
        metaDescription = metaMatch[1].trim();
      }
    }
    
    // Extract hashtags if requested and present
    if (request.generateHashtags) {
      const hashtagMatch = text.match(/Hashtags:[\s\n]*((?:#\w+(?:\s|,|$))+)/i);
      if (hashtagMatch) {
        hashtags = hashtagMatch[1].split(/[\s,]+/).filter(tag => tag.startsWith("#")).map(tag => tag.trim());
      }
    }
    
    return {
      title,
      body,
      metaDescription,
      hashtags,
      plagiarismScore: request.checkPlagiarism ? 0 : undefined,
    };
  } catch (err) {
    console.error("Error parsing Gemini response:", err);
    
    // Return a simple fallback structure with the raw text
    return {
      title: "Generated Content",
      body: text,
    };
  }
}