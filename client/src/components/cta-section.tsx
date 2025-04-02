import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const CtaSection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-12 mb-16">
      <div className="glass-dark rounded-2xl p-10 max-w-5xl mx-auto relative overflow-hidden">
        {/* Background Effect */}
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 rounded-full bg-primary opacity-20 blur-[80px]"></div>
        <div className="absolute bottom-[-30px] left-[-30px] w-48 h-48 rounded-full bg-secondary opacity-20 blur-[60px]"></div>
        
        <div className="relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            Ready to Transform Your Content Strategy?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto"
          >
            Join thousands of content creators and businesses who are saving time and creating better content with ContentAI.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link href="/pricing">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary to-secondary px-8 py-3 rounded-lg text-white font-medium hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 btn-glow"
              >
                Try for Free - No Credit Card
              </motion.button>
            </Link>
            <Link href="/examples">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass px-8 py-3 rounded-lg text-white font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <i className='bx bx-play-circle'></i>
                View Examples
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
