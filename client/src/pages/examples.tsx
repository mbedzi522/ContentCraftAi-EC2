import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

interface ExampleCardProps {
  title: string;
  contentType: string;
  tone: string;
  excerpt: string;
  imageUrl?: string;
  delay: number;
}

const ExampleCard: React.FC<ExampleCardProps> = ({ title, contentType, tone, excerpt, imageUrl, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true }}
      className="col-span-1"
    >
      <GlassCard className="p-0 overflow-hidden" withHover>
        {imageUrl && (
          <div className="w-full h-48 overflow-hidden">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex gap-2 mb-3">
            <Badge variant="secondary">{contentType}</Badge>
            <Badge variant="outline">{tone}</Badge>
          </div>
          <h3 className="text-xl font-medium mb-3">{title}</h3>
          <p className="text-gray-300 mb-4 line-clamp-3">{excerpt}</p>
          <button className="text-primary hover:text-primary-hover flex items-center gap-1 transition-colors">
            View Full Content <i className='bx bx-right-arrow-alt'></i>
          </button>
        </div>
      </GlassCard>
    </motion.div>
  );
};

const Examples: React.FC = () => {
  const examples = [
    {
      title: "10 Essential Tips for Sustainable Living",
      contentType: "Blog Post",
      tone: "Motivational",
      excerpt: "Discover practical ways to reduce your environmental footprint with these easy-to-implement sustainable living tips that anyone can adopt...",
      imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Introducing Our New Eco-Friendly Product Line",
      contentType: "Product Description",
      tone: "Professional",
      excerpt: "Meet our revolutionary new product line made from 100% recycled materials. Designed with both sustainability and performance in mind...",
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Special Summer Discount for All Members!",
      contentType: "Email",
      tone: "Casual",
      excerpt: "Hey there! Summer is heating up and so are our deals. For a limited time, all members get an exclusive 25% discount on all services...",
      imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Embrace the Journey: Finding Peace in Everyday Moments",
      contentType: "Social Media",
      tone: "Inspirational",
      excerpt: "Life isn't about the destination, it's about finding joy in the small moments. Today, I'm sharing my personal practice for mindfulness...",
      imageUrl: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "The Ultimate Guide to Machine Learning in 2023",
      contentType: "Blog Post",
      tone: "Technical",
      excerpt: "Explore the latest advancements in machine learning algorithms, frameworks, and applications that are revolutionizing industries...",
      imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "5 Delicious Plant-Based Recipes Anyone Can Make",
      contentType: "Blog Post",
      tone: "Humorous",
      excerpt: "Even if your cooking skills are limited to burning toast, these foolproof plant-based recipes will have you feeling like a master chef...",
      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
          Content Examples
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-300 text-center max-w-2xl mx-auto mb-12"
        >
          Browse through these examples of AI-generated content across different categories,
          tones, and industries to see what our platform can create for you.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <ExampleCard
              key={index}
              title={example.title}
              contentType={example.contentType}
              tone={example.tone}
              excerpt={example.excerpt}
              imageUrl={example.imageUrl}
              delay={index}
            />
          ))}
        </div>
        
        <div className="flex justify-center mt-12">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary to-secondary px-6 py-3 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-300 btn-glow"
            >
              Generate Your Own Content
            </motion.button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Examples;