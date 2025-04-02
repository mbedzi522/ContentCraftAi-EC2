import React from "react";
import { motion } from "framer-motion";

type ContentType = "blog" | "social" | "product" | "email";

interface ContentTypeCardProps {
  type: ContentType;
  title: string;
  description: string;
  icon: string;
  iconBgClass: string;
  isSelected: boolean;
  onSelect: () => void;
}

const ContentTypeCard: React.FC<ContentTypeCardProps> = ({
  type,
  title,
  description,
  icon,
  iconBgClass,
  isSelected,
  onSelect
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`glass cursor-pointer p-5 rounded-xl transition-all duration-300 ${isSelected ? 'border-primary border' : 'hover:border-primary hover:border'}`}
      onClick={onSelect}
    >
      <div className={`w-12 h-12 rounded-lg ${iconBgClass} flex items-center justify-center mb-3`}>
        <i className={`bx ${icon} text-2xl ${type === "blog" || type === "product" ? 'text-primary' : 'text-secondary'}`}></i>
      </div>
      <h4 className="font-medium text-white mb-1">{title}</h4>
      <p className="text-sm text-gray-300">{description}</p>
    </motion.div>
  );
};

interface Step1ContentTypeProps {
  selectedType: string;
  onSelect: (type: ContentType) => void;
  onNext: () => void;
}

const Step1ContentType: React.FC<Step1ContentTypeProps> = ({ selectedType, onSelect, onNext }) => {
  const contentTypeOptions = [
    {
      type: "blog" as ContentType,
      title: "Blog Post",
      description: "Create engaging articles with SEO optimization",
      icon: "bx-edit",
      iconBgClass: "bg-primary/20"
    },
    {
      type: "social" as ContentType,
      title: "Social Media",
      description: "Craft engaging posts for any platform",
      icon: "bx-share-alt",
      iconBgClass: "bg-secondary/20"
    },
    {
      type: "product" as ContentType,
      title: "Product Description",
      description: "Compelling copy that sells your products",
      icon: "bx-package",
      iconBgClass: "bg-primary/20"
    },
    {
      type: "email" as ContentType,
      title: "Email Template",
      description: "Professional emails that drive action",
      icon: "bx-envelope",
      iconBgClass: "bg-secondary/20"
    }
  ];

  return (
    <div>
      <div className="px-6 py-8">
        <h3 className="text-lg font-medium mb-6">What type of content do you want to create?</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {contentTypeOptions.map(option => (
            <ContentTypeCard
              key={option.type}
              type={option.type}
              title={option.title}
              description={option.description}
              icon={option.icon}
              iconBgClass={option.iconBgClass}
              isSelected={selectedType === option.type}
              onSelect={() => onSelect(option.type)}
            />
          ))}
        </div>
      </div>
      
      <div className="px-6 py-4 border-t border-white/10 flex justify-end">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary hover:bg-primary-hover px-6 py-2.5 rounded-lg text-white font-medium transition-all duration-300 flex items-center gap-2 btn-glow"
          onClick={onNext}
        >
          Next Step
          <i className='bx bx-right-arrow-alt'></i>
        </motion.button>
      </div>
    </div>
  );
};

export default Step1ContentType;
