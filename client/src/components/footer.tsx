import React from "react";
import { Link } from "wouter";

const Footer: React.FC = () => {
  return (
    <footer className="glass-dark px-6 py-10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-r from-primary to-secondary rounded-lg">
                <i className='bx bx-bot text-white text-2xl'></i>
              </div>
              <span className="font-heading font-semibold text-xl text-white tracking-wide">ContentAI</span>
            </div>
            <p className="text-gray-400 mb-4">
              AI-powered content generation for modern creators and businesses.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className='bx bxl-twitter text-xl'></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className='bx bxl-facebook text-xl'></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className='bx bxl-instagram text-xl'></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <i className='bx bxl-linkedin text-xl'></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Features</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Case Studies</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">API</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Tutorials</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Community</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Support</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Press</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} ContentAI. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
