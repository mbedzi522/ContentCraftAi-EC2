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
    // Get the Gemini model (using the model specified by the user)
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro",
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
    includeMetaKeywords,
    includeSeoTitle,
    generateTrendingTags,
    checkPlagiarism,
    includeTradingInsights,
    includeViralAnalysis,
    targetAudience,
  } = request;

  // Convert content type to a more descriptive format
  const contentTypeMap = {
    blog: "Blog Post",
    social: "Social Media Post",
    product: "Product Description",
    email: "Email Template",
    trading: "Trading Analysis Post",
    tiktok: "TikTok Viral Content",
  };

  // Convert tone style to a more descriptive format
  const toneStyleMap = {
    casual: "Casual and Conversational",
    formal: "Formal and Professional",
    humorous: "Humorous and Friendly",
    motivational: "Motivational and Inspiring",
    technical: "Technical and Detailed",
    viral: "Viral and Engaging",
    trendy: "Trendy and Contemporary",
  };

  // Create a detailed instruction prompt for the AI
  let prompt = `Generate ${contentTypeMap[contentType as keyof typeof contentTypeMap]} content with a ${
    toneStyleMap[toneStyle as keyof typeof toneStyleMap]
  } tone.`;

  // Add word count context
  let wordCountText = "Short (150-200 words)";
  if (wordCount === "medium") {
    wordCountText = "Medium (300-500 words)";
  } else if (wordCount === "long") {
    wordCountText = "Long (500-1000 words)";
  }
  prompt += `\nLength: ${wordCountText}`;

  // Add platform information
  prompt += `\nPlatform: ${platform}`;

  // Add keywords for SEO
  prompt += `\nTarget SEO Keywords: ${keywords}`;
  
  // Add target audience if provided
  if (request.targetAudience) {
    prompt += `\nTarget Audience: ${request.targetAudience}`;
  }

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
  
  if (includeMetaKeywords) {
    prompt += "\nInclude SEO-friendly meta keywords separated by commas.";
  }
  
  if (includeSeoTitle) {
    prompt += "\nCreate an SEO-optimized title tag (different from the main content title, 50-60 characters).";
  }
  
  if (generateTrendingTags) {
    prompt += "\nProvide 3-5 trending tags relevant to this content that could help with discoverability.";
  }
  
  if (includeTradingInsights && contentType === "trading") {
    prompt += "\nInclude trading insights with market trend analysis, risk level assessment, potential return estimate, and suggested timeframe.";
  }
  
  if (includeViralAnalysis && (contentType === "social" || contentType === "tiktok")) {
    prompt += "\nAnalyze viral potential on a scale of 1-10 and suggest target demographic for maximum engagement.";
  }

  // Structure formatting instructions
  prompt += `\n\nPlease format your response in the following JSON structure:
{
  "title": "An attention-grabbing title",
  "body": "The main content with proper formatting...",
  ${includeMetaDescription ? '"metaDescription": "A compelling meta description for SEO",' : ""}
  ${includeMetaKeywords ? '"metaKeywords": "keyword1, keyword2, keyword3, keyword4",' : ""}
  ${includeSeoTitle ? '"seoTitle": "SEO-optimized title for search engines",' : ""}
  ${generateHashtags ? '"hashtags": ["tag1", "tag2", "tag3", "tag4", "tag5"],' : ""}
  ${generateTrendingTags ? '"trendingTags": ["trending1", "trending2", "trending3"],' : ""}
  ${checkPlagiarism ? '"plagiarismScore": 0,' : ""}
  ${includeTradingInsights ? `"tradingInsights": {
    "marketTrend": "bullish/bearish analysis",
    "riskLevel": "low/medium/high assessment",
    "potentialReturn": "percentage or qualitative assessment",
    "timeframe": "short/medium/long-term recommendation"
  },` : ""}
  ${includeViralAnalysis ? `"viralPotential": 7,
  "targetDemographic": "Description of ideal audience for this content",` : ""}
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
    case "trading":
      prompt += `\n\nThe trading analysis post should include:
- Clear asset or market description
- Current market conditions and trends
- Technical and/or fundamental analysis
- Risk assessment and management strategies
- Entry/exit points or trading ranges
- Time horizon for the analysis
- Critical market indicators to watch
- Potential catalysts that could affect the analysis`;
      break;
    case "tiktok":
      prompt += `\n\nThe TikTok viral content should:
- Have an attention-grabbing hook in the first 3 seconds
- Be concise and to the point (ideal for short-form video)
- Include trending sound or hashtag suggestions
- Have a clear storytelling arc or information sequence
- End with an engaging call-to-action or question
- Be crafted for maximum engagement (comments, shares)
- Include elements that appeal to the TikTok algorithm`;
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
          metaKeywords: jsonContent.metaKeywords,
          seoTitle: jsonContent.seoTitle,
          hashtags: jsonContent.hashtags,
          trendingTags: jsonContent.trendingTags,
          plagiarismScore: jsonContent.plagiarismScore,
          tradingInsights: jsonContent.tradingInsights,
          viralPotential: jsonContent.viralPotential,
          targetDemographic: jsonContent.targetDemographic,
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
    let metaKeywords = undefined;
    let seoTitle = undefined;
    let hashtags = undefined;
    let trendingTags = undefined;
    let tradingInsights = undefined;
    let viralPotential = undefined;
    let targetDemographic = undefined;
    
    // Extract meta description if requested and present
    if (request.includeMetaDescription) {
      const metaMatch = text.match(/Meta Description:[\s\n]*(.*?)(?:\n\n|$)/i);
      if (metaMatch) {
        metaDescription = metaMatch[1].trim();
      }
    }
    
    // Extract meta keywords if requested and present
    if (request.includeMetaKeywords) {
      const metaKeywordsMatch = text.match(/Meta Keywords:[\s\n]*(.*?)(?:\n\n|$)/i);
      if (metaKeywordsMatch) {
        metaKeywords = metaKeywordsMatch[1].trim();
      }
    }
    
    // Extract SEO title if requested and present
    if (request.includeSeoTitle) {
      const seoTitleMatch = text.match(/SEO Title:[\s\n]*(.*?)(?:\n\n|$)/i);
      if (seoTitleMatch) {
        seoTitle = seoTitleMatch[1].trim();
      }
    }
    
    // Extract hashtags if requested and present
    if (request.generateHashtags) {
      const hashtagMatch = text.match(/Hashtags:[\s\n]*((?:#\w+(?:\s|,|$))+)/i);
      if (hashtagMatch) {
        hashtags = hashtagMatch[1].split(/[\s,]+/).filter(tag => tag.startsWith("#")).map(tag => tag.trim());
      }
    }
    
    // Extract trending tags if requested and present
    if (request.generateTrendingTags) {
      const trendingMatch = text.match(/Trending Tags:[\s\n]*(.*?)(?:\n\n|$)/i);
      if (trendingMatch) {
        trendingTags = trendingMatch[1].split(/[\s,]+/).map(tag => tag.trim());
      }
    }
    
    // Extract trading insights if requested and present
    if (request.includeTradingInsights && request.contentType === "trading") {
      const marketTrendMatch = text.match(/Market Trend:[\s\n]*(.*?)(?:\n|$)/i);
      const riskLevelMatch = text.match(/Risk Level:[\s\n]*(.*?)(?:\n|$)/i);
      const potentialReturnMatch = text.match(/Potential Return:[\s\n]*(.*?)(?:\n|$)/i);
      const timeframeMatch = text.match(/Timeframe:[\s\n]*(.*?)(?:\n|$)/i);
      
      tradingInsights = {
        marketTrend: marketTrendMatch ? marketTrendMatch[1].trim() : undefined,
        riskLevel: riskLevelMatch ? riskLevelMatch[1].trim() : undefined,
        potentialReturn: potentialReturnMatch ? potentialReturnMatch[1].trim() : undefined,
        timeframe: timeframeMatch ? timeframeMatch[1].trim() : undefined
      };
    }
    
    // Extract viral analysis if requested and present
    if (request.includeViralAnalysis && (request.contentType === "social" || request.contentType === "tiktok")) {
      const viralMatch = text.match(/Viral Potential:[\s\n]*(\d+)/i);
      const demographicMatch = text.match(/Target Demographic:[\s\n]*(.*?)(?:\n\n|$)/i);
      
      if (viralMatch) {
        viralPotential = parseInt(viralMatch[1].trim(), 10);
      }
      
      if (demographicMatch) {
        targetDemographic = demographicMatch[1].trim();
      }
    }
    
    return {
      title,
      body,
      metaDescription,
      metaKeywords,
      seoTitle,
      hashtags,
      trendingTags,
      plagiarismScore: request.checkPlagiarism ? 0 : undefined,
      tradingInsights,
      viralPotential,
      targetDemographic
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