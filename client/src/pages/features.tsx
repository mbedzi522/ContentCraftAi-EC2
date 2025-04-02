import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";

const FeatureIcon: React.FC<{ name: string, bgClass: string, textClass: string }> = ({ name, bgClass, textClass }) => (
  <div className={`w-14 h-14 ${bgClass} flex items-center justify-center rounded-lg mb-6`}>
    <i className={`bx ${name} text-3xl ${textClass}`}></i>
  </div>
);

const Features: React.FC = () => {
  const featureCategories = [
    {
      id: "content-generation",
      title: "Content Generation",
      features: [
        {
          icon: "bx-edit-alt",
          iconBg: "bg-primary/20",
          iconColor: "text-primary",
          title: "Multi-Format Content Creation",
          description: "Generate various types of content including blog posts, social media captions, product descriptions, email templates, and more—all optimized for their specific platforms and purposes."
        },
        {
          icon: "bx-selection",
          iconBg: "bg-secondary/20",
          iconColor: "text-secondary",
          title: "Tone & Style Control",
          description: "Customize your content's voice with options for casual, formal, humorous, motivational, or technical tones to align perfectly with your brand identity and audience expectations."
        },
        {
          icon: "bx-expand",
          iconBg: "bg-primary/20",
          iconColor: "text-primary",
          title: "Length Optimization",
          description: "Choose between concise formats for social media and advertisements or detailed long-form content for comprehensive blog posts and guides."
        },
        {
          icon: "bx-world",
          iconBg: "bg-secondary/20",
          iconColor: "text-secondary",
          title: "Multilingual Support",
          description: "Create content in multiple languages to reach global audiences and expand your market reach without the need for separate translation services."
        }
      ]
    },
    {
      id: "seo-tools",
      title: "SEO Tools",
      features: [
        {
          icon: "bx-search-alt",
          iconBg: "bg-primary/20",
          iconColor: "text-primary",
          title: "Keyword Integration",
          description: "Seamlessly incorporate target keywords into your content in a natural way that improves search rankings while maintaining readability and value for your audience."
        },
        {
          icon: "bx-detail",
          iconBg: "bg-secondary/20",
          iconColor: "text-secondary",
          title: "Meta Description Generator",
          description: "Automatically create compelling meta descriptions optimized for search engines, increasing click-through rates from search results pages."
        },
        {
          icon: "bx-link",
          iconBg: "bg-primary/20",
          iconColor: "text-primary",
          title: "Internal Linking Suggestions",
          description: "Get smart recommendations for internal linking opportunities to strengthen your site structure and improve SEO performance."
        },
        {
          icon: "bx-bar-chart-alt-2",
          iconBg: "bg-secondary/20",
          iconColor: "text-secondary",
          title: "SEO Performance Analysis",
          description: "Track how your AI-generated content performs in search rankings and get actionable insights to further improve visibility."
        }
      ]
    },
    {
      id: "content-enhancers",
      title: "Content Enhancers",
      features: [
        {
          icon: "bx-check-shield",
          iconBg: "bg-primary/20",
          iconColor: "text-primary",
          title: "Plagiarism Detection",
          description: "Ensure all generated content is completely original with our built-in plagiarism checker that compares your content against billions of web pages."
        },
        {
          icon: "bx-hash",
          iconBg: "bg-secondary/20",
          iconColor: "text-secondary",
          title: "Hashtag Generator",
          description: "Boost social media engagement with automatically generated, relevant hashtags that increase content discoverability across platforms."
        },
        {
          icon: "bx-image",
          iconBg: "bg-primary/20",
          iconColor: "text-primary",
          title: "Image Suggestions",
          description: "Get recommendations for royalty-free images that complement your content and enhance visual appeal and engagement."
        },
        {
          icon: "bx-stats",
          iconBg: "bg-secondary/20",
          iconColor: "text-secondary",
          title: "Readability Scoring",
          description: "Analyze and improve your content's readability with metrics and suggestions to ensure it resonates with your target audience."
        }
      ]
    },
    {
      id: "workflow-tools",
      title: "Workflow Tools",
      features: [
        {
          icon: "bx-calendar",
          iconBg: "bg-primary/20",
          iconColor: "text-primary",
          title: "Content Calendar",
          description: "Plan and schedule your content creation workflow with an integrated calendar that ensures consistent publishing across all your platforms."
        },
        {
          icon: "bx-group",
          iconBg: "bg-secondary/20",
          iconColor: "text-secondary",
          title: "Team Collaboration",
          description: "Seamlessly work with team members through shared projects, approval workflows, and collaborative editing capabilities."
        },
        {
          icon: "bx-export",
          iconBg: "bg-primary/20",
          iconColor: "text-primary",
          title: "One-Click Publishing",
          description: "Publish your content directly to WordPress, Medium, social media platforms, and more with our integrated publishing system."
        },
        {
          icon: "bx-revision",
          iconBg: "bg-secondary/20",
          iconColor: "text-secondary",
          title: "Version History",
          description: "Track changes and maintain a complete history of your content with the ability to revert to previous versions at any time."
        }
      ]
    }
  ];

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-16 mb-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
        >
          Platform Features
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-300 text-center max-w-2xl mx-auto mb-12"
        >
          Discover the comprehensive suite of tools designed to transform your content creation process,
          boost your SEO performance, and streamline your workflow.
        </motion.p>
        
        <Tabs defaultValue="content-generation" className="w-full max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 glass mb-10">
            {featureCategories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="text-sm md:text-base"
              >
                {category.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {featureCategories.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {category.features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <GlassCard className="p-6 h-full" withHover>
                      <FeatureIcon 
                        name={feature.icon} 
                        bgClass={feature.iconBg}
                        textClass={feature.iconColor}
                      />
                      <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                      <p className="text-gray-300">{feature.description}</p>
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <GlassCard className="py-8 px-6 max-w-3xl mx-auto">
            <h3 className="text-2xl font-medium mb-4">Ready to transform your content strategy?</h3>
            <p className="text-gray-300 mb-6">
              Experience the power of AI-driven content creation with our intuitive platform designed for creators at any skill level.
            </p>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary to-secondary px-6 py-3 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-300 btn-glow"
              >
                Start Creating Now
              </motion.button>
            </Link>
          </GlassCard>
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default Features;