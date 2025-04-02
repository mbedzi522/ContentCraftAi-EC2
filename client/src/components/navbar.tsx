import React, { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="glass-dark px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-lg">
          <i className='bx bx-bot text-white text-2xl'></i>
        </div>
        <span className="font-heading font-semibold text-xl text-white tracking-wide">ContentAI</span>
      </div>
      
      <div className="hidden md:flex items-center gap-6">
        <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
        <Link href="/features" className="text-gray-300 hover:text-white transition-colors">Features</Link>
        <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
        <Link href="/examples" className="text-gray-300 hover:text-white transition-colors">Examples</Link>
        <Link href="/trading-post" className="text-gray-300 hover:text-white transition-colors">Trading Post</Link>
        <Link href="/tiktok-case-study" className="text-gray-300 hover:text-white transition-colors">TikTok Study</Link>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="glass px-5 py-2 rounded-lg text-white text-sm hover:bg-white/10 transition-all duration-300 hidden md:block">
          Sign In
        </button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-primary to-secondary px-5 py-2 rounded-lg text-white font-medium hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 btn-glow"
        >
          Try Free
        </motion.button>
        <button 
          className="md:hidden text-2xl" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <i className={`bx ${isMobileMenuOpen ? 'bx-x' : 'bx-menu'}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 glass-dark p-4 flex flex-col gap-4 md:hidden"
        >
          <Link href="/" className="text-gray-300 hover:text-white transition-colors py-2">Home</Link>
          <Link href="/features" className="text-gray-300 hover:text-white transition-colors py-2">Features</Link>
          <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors py-2">Pricing</Link>
          <Link href="/examples" className="text-gray-300 hover:text-white transition-colors py-2">Examples</Link>
          <Link href="/trading-post" className="text-gray-300 hover:text-white transition-colors py-2">Trading Post</Link>
          <Link href="/tiktok-case-study" className="text-gray-300 hover:text-white transition-colors py-2">TikTok Study</Link>
          <button className="glass px-5 py-2 rounded-lg text-white text-sm hover:bg-white/10 transition-all duration-300">
            Sign In
          </button>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
