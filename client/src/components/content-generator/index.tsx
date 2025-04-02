import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Step1ContentType from "./step1-content-type";
import Step2Customization from "./step2-customization";
import Step3Result from "./step3-result";
import { ContentGenerationRequest, GeneratedContent } from "@shared/schema";

export type FormState = ContentGenerationRequest;

const initialFormState: FormState = {
  contentType: "blog",
  toneStyle: "casual",
  wordCount: "short",
  platform: "website",
  keywords: "",
  callToAction: "",
  generateHashtags: false,
  includeMetaDescription: false,
  checkPlagiarism: false
};

const ContentGenerator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const { toast } = useToast();

  const generateContentMutation = useMutation({
    mutationFn: async (data: FormState) => {
      const response = await apiRequest("POST", "/api/generate-content", data);
      return response.json();
    },
    onSuccess: (data) => {
      if (data.success && data.generation) {
        setGeneratedContent(data.generation.generatedContent);
        setCurrentStep(3);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to generate content. Please try again.",
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormChange = (name: string, value: any) => {
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleContentTypeSelect = (contentType: "blog" | "social" | "product" | "email") => {
    setFormState({
      ...formState,
      contentType
    });
  };

  const handleGenerateContent = () => {
    generateContentMutation.mutate(formState);
  };

  const handleCreateNewContent = () => {
    setCurrentStep(1);
    setFormState(initialFormState);
    setGeneratedContent(null);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="glass rounded-2xl overflow-hidden shadow-xl mb-8">
        {/* Progress Steps */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-heading font-semibold text-xl">Create Your Content</h2>
          <div className="hidden md:flex items-center gap-1">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full ${currentStep >= 1 ? 'bg-primary' : 'bg-white/20'} flex items-center justify-center`}>
                <span className="text-sm font-medium">1</span>
              </div>
              <div className={`w-12 h-1 ${currentStep >= 2 ? 'bg-primary' : 'bg-white/20'}`}></div>
            </div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full ${currentStep >= 2 ? 'bg-primary' : 'bg-white/20'} flex items-center justify-center`}>
                <span className="text-sm font-medium">2</span>
              </div>
              <div className={`w-12 h-1 ${currentStep >= 3 ? 'bg-primary' : 'bg-white/20'}`}></div>
            </div>
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full ${currentStep >= 3 ? 'bg-primary' : 'bg-white/20'} flex items-center justify-center`}>
                <span className="text-sm font-medium">3</span>
              </div>
            </div>
          </div>
        </div>
        
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Step1ContentType 
                selectedType={formState.contentType} 
                onSelect={handleContentTypeSelect} 
                onNext={handleNextStep} 
              />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Step2Customization 
                formState={formState}
                onChange={handleFormChange}
                onPrev={handlePrevStep}
                onGenerate={handleGenerateContent}
                isGenerating={generateContentMutation.isPending}
              />
            </motion.div>
          )}

          {currentStep === 3 && generatedContent && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Step3Result 
                content={generatedContent}
                contentType={formState.contentType}
                toneStyle={formState.toneStyle}
                platform={formState.platform}
                onPrev={handlePrevStep}
                onNewContent={handleCreateNewContent}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Loading State */}
      {generateContentMutation.isPending && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="glass rounded-2xl p-10 flex flex-col items-center justify-center text-center"
        >
          <div className="w-16 h-16 rounded-full border-t-2 border-primary border-r-2 border-secondary animate-spin mb-6"></div>
          <h3 className="text-xl font-medium mb-2">Generating Content with Gemini</h3>
          <p className="text-gray-300 max-w-md">Google's Gemini AI is crafting high-quality, SEO-optimized content based on your inputs. This usually takes 10-15 seconds.</p>
        </motion.div>
      )}
    </div>
  );
};

export default ContentGenerator;
