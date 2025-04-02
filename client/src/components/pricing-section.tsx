import React from "react";
import { GlassCard } from "./ui/glass-card";
import { motion } from "framer-motion";

interface PricingPlanProps {
  name: string;
  description: string;
  price: string;
  features: string[];
  featuresUnavailable?: string[];
  highlight?: boolean;
  popularFlag?: boolean;
}

const PricingPlan: React.FC<PricingPlanProps> = ({
  name,
  description,
  price,
  features,
  featuresUnavailable = [],
  highlight = false,
  popularFlag = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`${highlight ? 'transform scale-105 z-10 relative' : ''}`}
    >
      <GlassCard
        withGlow={highlight}
        className={highlight ? 'border-2 border-primary' : ''}
      >
        {popularFlag && (
          <div className="absolute top-0 right-0 bg-primary text-white text-xs px-3 py-1 rounded-bl-lg">
            MOST POPULAR
          </div>
        )}
        
        <div className="p-6 border-b border-white/10">
          <h3 className="text-xl font-medium mb-1">{name}</h3>
          <p className="text-gray-400 text-sm mb-4">{description}</p>
          <div className="flex items-baseline mb-4">
            <span className="text-3xl font-bold">{price}</span>
            <span className="text-gray-400 ml-1">/month</span>
          </div>
          <button className={`w-full py-2 ${highlight ? 'bg-primary hover:bg-primary-hover btn-glow' : 'glass hover:bg-white/10'} rounded-lg transition-colors duration-300`}>
            Get Started
          </button>
        </div>
        <div className="p-6">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <i className='bx bx-check text-green-400'></i>
                <span>{feature}</span>
              </li>
            ))}
            {featuresUnavailable.map((feature, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-500">
                <i className='bx bx-x'></i>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </GlassCard>
    </motion.div>
  );
};

const PricingSection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-12 mb-16">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="font-heading text-3xl font-bold text-center mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
      >
        Flexible Pricing Plans
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-gray-300 text-center max-w-2xl mx-auto mb-12"
      >
        Choose the right plan for your content needs. All plans include our core AI content generation capabilities.
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <PricingPlan
          name="Starter"
          description="For personal content needs"
          price="$19"
          features={[
            "5,000 words per month",
            "Basic SEO optimization",
            "3 content types",
            "Email support"
          ]}
          featuresUnavailable={[
            "Plagiarism checking"
          ]}
        />
        
        <PricingPlan
          name="Pro"
          description="For growing businesses"
          price="$49"
          features={[
            "25,000 words per month",
            "Advanced SEO optimization",
            "All content types",
            "Priority support",
            "Plagiarism checking"
          ]}
          highlight={true}
          popularFlag={true}
        />
        
        <PricingPlan
          name="Enterprise"
          description="For large teams & agencies"
          price="$99"
          features={[
            "100,000 words per month",
            "Premium SEO optimization",
            "Custom content types",
            "24/7 dedicated support",
            "Advanced analytics"
          ]}
        />
      </div>
    </section>
  );
};

export default PricingSection;
