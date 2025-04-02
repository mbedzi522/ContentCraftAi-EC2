import React from "react";
import { GlassCard } from "./ui/glass-card";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: string;
  iconBgClass: string;
  iconColor: string;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, iconBgClass, iconColor, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true }}
    >
      <GlassCard className="p-6" withHover>
        <div className={`w-12 h-12 rounded-lg ${iconBgClass} flex items-center justify-center mb-4`}>
          <i className={`bx ${icon} text-2xl ${iconColor}`}></i>
        </div>
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </GlassCard>
    </motion.div>
  );
};

const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: "bx-bulb",
      iconBgClass: "bg-primary/20",
      iconColor: "text-primary",
      title: "Smart Content Generation",
      description: "Advanced AI technology creates high-quality, unique content tailored to your specific needs and industry."
    },
    {
      icon: "bx-search-alt",
      iconBgClass: "bg-secondary/20",
      iconColor: "text-secondary",
      title: "SEO Optimization",
      description: "Automatically optimizes your content with relevant keywords and meta descriptions to improve search rankings."
    },
    {
      icon: "bx-customize",
      iconBgClass: "bg-primary/20",
      iconColor: "text-primary",
      title: "Customizable Outputs",
      description: "Choose from various content types, tones, and formats to match your brand voice and audience preferences."
    },
    {
      icon: "bx-check-shield",
      iconBgClass: "bg-secondary/20",
      iconColor: "text-secondary",
      title: "Plagiarism Checking",
      description: "Built-in plagiarism detection ensures your content is 100% unique and safe to publish on any platform."
    },
    {
      icon: "bx-share-alt",
      iconBgClass: "bg-primary/20",
      iconColor: "text-primary",
      title: "Social Integration",
      description: "Direct sharing to social platforms with platform-specific formatting and suggested hashtags."
    },
    {
      icon: "bx-line-chart",
      iconBgClass: "bg-secondary/20",
      iconColor: "text-secondary",
      title: "Performance Insights",
      description: "Analytics and suggestions to help you understand what content performs best with your audience."
    }
  ];

  return (
    <section className="container mx-auto px-4 py-12 mb-16">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="font-heading text-3xl font-bold text-center mb-12 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
      >
        Powerful Features for Content Creators
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            iconBgClass={feature.iconBgClass}
            iconColor={feature.iconColor}
            title={feature.title}
            description={feature.description}
            delay={index}
          />
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
