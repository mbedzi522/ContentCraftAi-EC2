import React from "react";
import { motion } from "framer-motion";
import { FormState } from "./index";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Step2CustomizationProps {
  formState: FormState;
  onChange: (name: string, value: any) => void;
  onPrev: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const Step2Customization: React.FC<Step2CustomizationProps> = ({
  formState,
  onChange,
  onPrev,
  onGenerate,
  isGenerating
}) => {
  const handleToggleWordCount = (wordCount: "short" | "long") => {
    onChange("wordCount", wordCount);
  };

  return (
    <div>
      <div className="px-6 py-8">
        <h3 className="text-lg font-medium mb-6">Customize your content</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-5">
            {/* Tone & Style */}
            <div>
              <Label className="block text-gray-200 mb-2 text-sm">Tone & Style</Label>
              <Select 
                value={formState.toneStyle}
                onValueChange={(value) => onChange("toneStyle", value)}
              >
                <SelectTrigger className="glass w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent className="glass-dark">
                  <SelectItem value="casual">Casual & Conversational</SelectItem>
                  <SelectItem value="formal">Formal & Professional</SelectItem>
                  <SelectItem value="humorous">Humorous & Friendly</SelectItem>
                  <SelectItem value="motivational">Motivational & Inspiring</SelectItem>
                  <SelectItem value="technical">Technical & Detailed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Word Count */}
            <div>
              <Label className="block text-gray-200 mb-2 text-sm">Word Count</Label>
              <div className="glass p-1 rounded-lg grid grid-cols-2 gap-1">
                <button 
                  className={`${formState.wordCount === 'short' ? 'bg-primary' : 'bg-transparent'} text-white p-2 rounded-md text-sm transition-colors`}
                  onClick={() => handleToggleWordCount("short")}
                >
                  Short (150-200 words)
                </button>
                <button 
                  className={`${formState.wordCount === 'long' ? 'bg-primary' : 'bg-transparent'} text-white p-2 rounded-md text-sm transition-colors`}
                  onClick={() => handleToggleWordCount("long")}
                >
                  Long (500-1000 words)
                </button>
              </div>
            </div>
            
            {/* Platform/Use Case */}
            <div>
              <Label className="block text-gray-200 mb-2 text-sm">Platform/Use Case</Label>
              <Select 
                value={formState.platform}
                onValueChange={(value) => onChange("platform", value)}
              >
                <SelectTrigger className="glass w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent className="glass-dark">
                  <SelectItem value="website">Website/Landing Page</SelectItem>
                  <SelectItem value="instagram">Instagram</SelectItem>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                  <SelectItem value="email">Email Campaign</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-5">
            {/* SEO Keywords */}
            <div>
              <Label className="block text-gray-200 mb-2 text-sm">SEO Keywords (3-5 keywords separated by comma)</Label>
              <Textarea 
                value={formState.keywords}
                onChange={(e) => onChange("keywords", e.target.value)}
                className="glass w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none h-[84px]" 
                placeholder="e.g. content marketing, SEO tips, blog writing"
              />
            </div>
            
            {/* Call to Action */}
            <div>
              <Label className="block text-gray-200 mb-2 text-sm">Call to Action (CTA)</Label>
              <Input 
                type="text" 
                value={formState.callToAction}
                onChange={(e) => onChange("callToAction", e.target.value)}
                className="glass w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary" 
                placeholder="e.g. Sign up for a free trial"
              />
            </div>
            
            {/* Additional Options */}
            <div>
              <Label className="block text-gray-200 mb-2 text-sm">Additional Options</Label>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 cursor-pointer">
                  <Checkbox 
                    id="generateHashtags" 
                    checked={formState.generateHashtags}
                    onCheckedChange={(checked) => onChange("generateHashtags", checked)}
                  />
                  <label
                    htmlFor="generateHashtags"
                    className="text-sm text-gray-200 cursor-pointer"
                  >
                    Generate hashtags
                  </label>
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Checkbox 
                    id="includeMetaDescription" 
                    checked={formState.includeMetaDescription}
                    onCheckedChange={(checked) => onChange("includeMetaDescription", checked)}
                  />
                  <label
                    htmlFor="includeMetaDescription"
                    className="text-sm text-gray-200 cursor-pointer"
                  >
                    Include meta description
                  </label>
                </div>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Checkbox 
                    id="checkPlagiarism" 
                    checked={formState.checkPlagiarism}
                    onCheckedChange={(checked) => onChange("checkPlagiarism", checked)}
                  />
                  <label
                    htmlFor="checkPlagiarism"
                    className="text-sm text-gray-200 cursor-pointer"
                  >
                    Check for plagiarism
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-white/10 flex justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="glass px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-300 flex items-center gap-2"
          onClick={onPrev}
          disabled={isGenerating}
        >
          <i className='bx bx-left-arrow-alt'></i>
          Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-primary to-secondary px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-300 flex items-center gap-2 btn-glow"
          onClick={onGenerate}
          disabled={isGenerating || !formState.keywords.trim()}
        >
          {isGenerating ? (
            <>
              <span className="animate-spin mr-2">
                <i className='bx bx-loader-alt'></i>
              </span>
              Generating...
            </>
          ) : (
            <>
              Generate Content
              <i className='bx bx-bulb'></i>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default Step2Customization;
