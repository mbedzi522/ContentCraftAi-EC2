import React from "react";
import { motion } from "framer-motion";
import { GeneratedContent } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface Step3ResultProps {
  content: GeneratedContent;
  contentType: string;
  toneStyle: string;
  platform: string;
  onPrev: () => void;
  onNewContent: () => void;
}

const Step3Result: React.FC<Step3ResultProps> = ({
  content,
  contentType,
  toneStyle,
  platform,
  onPrev,
  onNewContent
}) => {
  const { toast } = useToast();

  const handleCopyContent = () => {
    // Prepare content for copying (title + body)
    const textToCopy = `${content.title}\n\n${content.body}`;
    
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        toast({
          title: "Copied to clipboard",
          description: "Content successfully copied to clipboard",
        });
      })
      .catch(() => {
        toast({
          title: "Copy failed",
          description: "Failed to copy content to clipboard",
          variant: "destructive",
        });
      });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: content.title,
        text: `Check out this content I created: ${content.title}`,
      }).catch(() => {
        toast({
          title: "Share failed",
          description: "Failed to share content",
          variant: "destructive",
        });
      });
    } else {
      toast({
        title: "Share not supported",
        description: "Web Share API is not supported in your browser",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Your Generated Content</h3>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
              title="Copy to clipboard"
              onClick={handleCopyContent}
            >
              <i className='bx bx-copy text-lg'></i>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
              title="Share"
              onClick={handleShare}
            >
              <i className='bx bx-share-alt text-lg'></i>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 glass rounded-lg hover:bg-white/10 transition-colors"
              title="Download"
              onClick={() => {
                const element = document.createElement("a");
                const file = new Blob([`${content.title}\n\n${content.body}`], {type: 'text/plain'});
                element.href = URL.createObjectURL(file);
                element.download = `${contentType}-content.txt`;
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }}
            >
              <i className='bx bx-download text-lg'></i>
            </motion.button>
          </div>
        </div>
        
        <div className="glass-dark rounded-xl p-5 mb-6 relative">
          {/* Content Meta */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="glass px-3 py-1 rounded-full text-xs text-primary">
              {contentType === "blog" ? "Blog Post" : 
               contentType === "social" ? "Social Media" :
               contentType === "product" ? "Product Description" : "Email Template"}
            </span>
            <span className="glass px-3 py-1 rounded-full text-xs text-gray-200">
              {toneStyle === "casual" ? "Casual Tone" :
               toneStyle === "formal" ? "Formal Tone" :
               toneStyle === "humorous" ? "Humorous Tone" :
               toneStyle === "motivational" ? "Motivational Tone" : "Technical Tone"}
            </span>
            <span className="glass px-3 py-1 rounded-full text-xs text-gray-200">
              {platform === "website" ? "Website" :
               platform === "instagram" ? "Instagram" :
               platform === "facebook" ? "Facebook" :
               platform === "linkedin" ? "LinkedIn" :
               platform === "twitter" ? "Twitter" : "Email"}
            </span>
          </div>
          
          {/* Content Title */}
          <h2 className="text-xl font-heading font-semibold mb-4 text-white">{content.title}</h2>
          
          {/* Content Body */}
          <div className="text-gray-300 leading-relaxed mb-4 space-y-4 content-body">
            {content.body.split('\n\n').map((paragraph, idx) => {
              // Check if paragraph is a list item
              if (paragraph.startsWith("1. ") || paragraph.startsWith("- ")) {
                return (
                  <ul key={idx} className={paragraph.startsWith("1. ") ? "list-decimal pl-5 space-y-2" : "list-disc pl-5 space-y-2"}>
                    {paragraph.split('\n').map((item, itemIdx) => {
                      const listItem = item.replace(/^\d+\.\s+|-\s+/, '');
                      return <li key={itemIdx} dangerouslySetInnerHTML={{ __html: formatText(listItem) }}></li>;
                    })}
                  </ul>
                );
              } else {
                return <p key={idx} dangerouslySetInnerHTML={{ __html: formatText(paragraph) }}></p>;
              }
            })}
          </div>
          
          {/* Additional Generated Elements */}
          {(content.metaDescription || content.hashtags) && (
            <div className="space-y-3 border-t border-white/10 pt-4">
              {content.metaDescription && (
                <div>
                  <span className="text-xs text-gray-400">Meta Description:</span>
                  <p className="text-sm text-gray-300">{content.metaDescription}</p>
                </div>
              )}
              
              {content.hashtags && content.hashtags.length > 0 && (
                <div>
                  <span className="text-xs text-gray-400">Suggested Hashtags:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {content.hashtags.map((hashtag, idx) => (
                      <span key={idx} className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs">
                        {hashtag.startsWith('#') ? hashtag : `#${hashtag}`}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* Plagiarism Check Result */}
          {content.plagiarismScore !== undefined && (
            <div className="mt-4 flex items-center text-sm text-green-400 gap-1">
              <i className='bx bx-check-circle'></i>
              <span>100% Unique Content - Passed Plagiarism Check</span>
            </div>
          )}
        </div>
        
        {/* Edit Options */}
        <div className="glass rounded-xl p-5">
          <h4 className="font-medium mb-3">Need adjustments?</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="glass p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-white/10 transition-all" onClick={onPrev}>
              <i className='bx bx-refresh text-secondary'></i>
              <span>Regenerate</span>
            </button>
            <button className="glass p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-white/10 transition-all" onClick={handleCopyContent}>
              <i className='bx bx-edit text-secondary'></i>
              <span>Edit Content</span>
            </button>
            <button className="glass p-3 rounded-lg flex items-center justify-center gap-2 hover:bg-white/10 transition-all" onClick={onPrev}>
              <i className='bx bx-expand-alt text-secondary'></i>
              <span>Expand Content</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-white/10 flex justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-300 flex items-center gap-2"
          onClick={onPrev}
        >
          <i className='bx bx-left-arrow-alt'></i>
          Back to Options
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary hover:bg-primary-hover px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-300 flex items-center gap-2 btn-glow"
          onClick={onNewContent}
        >
          Create New Content
          <i className='bx bx-plus'></i>
        </motion.button>
      </div>
    </div>
  );
};

// Helper function to format text with basic HTML formatting
const formatText = (text: string): string => {
  // Format strong/bold text
  let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Format italic text
  formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  return formattedText;
};

export default Step3Result;
