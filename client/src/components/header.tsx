import React from "react";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-10 pt-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-heading text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
      >
        AI-Powered Content Generator
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-gray-300 text-lg mb-6"
      >
        Create high-quality, SEO-optimized content for websites, blogs, and social media in seconds
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-wrap justify-center gap-3 mb-2"
      >
        <span className="glass px-3 py-1 rounded-full text-xs text-gray-200">Blog Posts</span>
        <span className="glass px-3 py-1 rounded-full text-xs text-gray-200">Social Media</span>
        <span className="glass px-3 py-1 rounded-full text-xs text-gray-200">Product Descriptions</span>
        <span className="glass px-3 py-1 rounded-full text-xs text-gray-200">Email Templates</span>
      </motion.div>
    </div>
  );
};

export default Header;
