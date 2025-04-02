import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PricingSection from "@/components/pricing-section";
import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Pricing: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');
  
  const faqs = [
    {
      question: "Can I switch between pricing plans?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the new pricing will be applied immediately with prorated charges. If you downgrade, the new pricing will take effect in your next billing cycle."
    },
    {
      question: "What happens if I use all my words for the month?",
      answer: "Once you've used your monthly word allocation, you can either wait until your next billing cycle or purchase additional words as needed. We offer convenient word packs that can be added to any plan without changing your subscription."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 7-day free trial on all plans, allowing you to explore the platform's features before committing. During the trial, you'll have access to 5,000 words with all premium features enabled."
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer: "Absolutely. There are no long-term contracts or cancellation fees. You can cancel your subscription at any time from your account settings page, and you'll still have access to your plan until the end of your current billing period."
    },
    {
      question: "Do you offer discounts for nonprofits or educational institutions?",
      answer: "Yes, we offer special pricing for nonprofits, educational institutions, and student users. Please contact our sales team with verification of your status to access these special rates."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and for annual plans, we can also accommodate bank transfers or checks for enterprise customers."
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
          Simple, Transparent Pricing
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-300 text-center max-w-2xl mx-auto mb-8"
        >
          Choose the plan that fits your content creation needs. 
          All plans include our core AI generation technology.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mb-12"
        >
          <GlassCard className="inline-flex p-1">
            <button 
              className={`px-6 py-2 rounded-lg text-sm ${billingPeriod === 'monthly' ? 'bg-primary text-white' : 'text-gray-300'} transition-all duration-300`}
              onClick={() => setBillingPeriod('monthly')}
            >
              Monthly
            </button>
            <button 
              className={`px-6 py-2 rounded-lg text-sm ${billingPeriod === 'yearly' ? 'bg-primary text-white' : 'text-gray-300'} transition-all duration-300`}
              onClick={() => setBillingPeriod('yearly')}
            >
              Yearly <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full ml-1">Save 20%</span>
            </button>
          </GlassCard>
        </motion.div>
        
        {/* We'll use the existing pricing section but could show different prices based on billingPeriod */}
        <PricingSection />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <h2 className="text-2xl font-semibold text-center mb-8">Compare Plan Features</h2>
          
          <GlassCard>
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-3 p-1">
                <TabsTrigger value="content">Content Features</TabsTrigger>
                <TabsTrigger value="seo">SEO Tools</TabsTrigger>
                <TabsTrigger value="support">Support & Extras</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left pb-3">Feature</th>
                      <th className="text-center pb-3">Starter</th>
                      <th className="text-center pb-3">Pro</th>
                      <th className="text-center pb-3">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-3">Monthly Word Limit</td>
                      <td className="text-center py-3">5,000</td>
                      <td className="text-center py-3">25,000</td>
                      <td className="text-center py-3">100,000</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3">Content Types</td>
                      <td className="text-center py-3">3 Types</td>
                      <td className="text-center py-3">All Types</td>
                      <td className="text-center py-3">Custom Types</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3">Tone & Style Options</td>
                      <td className="text-center py-3">Basic</td>
                      <td className="text-center py-3">Advanced</td>
                      <td className="text-center py-3">Premium</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3">Save Templates</td>
                      <td className="text-center py-3"><i className='bx bx-x text-red-400'></i></td>
                      <td className="text-center py-3"><i className='bx bx-check text-green-400'></i></td>
                      <td className="text-center py-3"><i className='bx bx-check text-green-400'></i></td>
                    </tr>
                    <tr>
                      <td className="py-3">Content History</td>
                      <td className="text-center py-3">30 Days</td>
                      <td className="text-center py-3">6 Months</td>
                      <td className="text-center py-3">Unlimited</td>
                    </tr>
                  </tbody>
                </table>
              </TabsContent>
              
              <TabsContent value="seo" className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left pb-3">Feature</th>
                      <th className="text-center pb-3">Starter</th>
                      <th className="text-center pb-3">Pro</th>
                      <th className="text-center pb-3">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-3">SEO Optimization</td>
                      <td className="text-center py-3">Basic</td>
                      <td className="text-center py-3">Advanced</td>
                      <td className="text-center py-3">Premium</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3">Meta Description Generator</td>
                      <td className="text-center py-3"><i className='bx bx-check text-green-400'></i></td>
                      <td className="text-center py-3"><i className='bx bx-check text-green-400'></i></td>
                      <td className="text-center py-3"><i className='bx bx-check text-green-400'></i></td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3">Keyword Research Tool</td>
                      <td className="text-center py-3"><i className='bx bx-x text-red-400'></i></td>
                      <td className="text-center py-3"><i className='bx bx-check text-green-400'></i></td>
                      <td className="text-center py-3"><i className='bx bx-check text-green-400'></i></td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3">Competitor Analysis</td>
                      <td className="text-center py-3"><i className='bx bx-x text-red-400'></i></td>
                      <td className="text-center py-3"><i className='bx bx-x text-red-400'></i></td>
                      <td className="text-center py-3"><i className='bx bx-check text-green-400'></i></td>
                    </tr>
                    <tr>
                      <td className="py-3">SEO Performance Reports</td>
                      <td className="text-center py-3">Basic</td>
                      <td className="text-center py-3">Detailed</td>
                      <td className="text-center py-3">Custom</td>
                    </tr>
                  </tbody>
                </table>
              </TabsContent>
              
              <TabsContent value="support" className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left pb-3">Feature</th>
                      <th className="text-center pb-3">Starter</th>
                      <th className="text-center pb-3">Pro</th>
                      <th className="text-center pb-3">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-3">Customer Support</td>
                      <td className="text-center py-3">Email</td>
                      <td className="text-center py-3">Priority Email</td>
                      <td className="text-center py-3">24/7 Dedicated</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3">Response Time</td>
                      <td className="text-center py-3">48 Hours</td>
                      <td className="text-center py-3">24 Hours</td>
                      <td className="text-center py-3">4 Hours</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3">Content Strategy Session</td>
                      <td className="text-center py-3"><i className='bx bx-x text-red-400'></i></td>
                      <td className="text-center py-3">Quarterly</td>
                      <td className="text-center py-3">Monthly</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3">Custom Integrations</td>
                      <td className="text-center py-3"><i className='bx bx-x text-red-400'></i></td>
                      <td className="text-center py-3"><i className='bx bx-x text-red-400'></i></td>
                      <td className="text-center py-3"><i className='bx bx-check text-green-400'></i></td>
                    </tr>
                    <tr>
                      <td className="py-3">Training Sessions</td>
                      <td className="text-center py-3"><i className='bx bx-x text-red-400'></i></td>
                      <td className="text-center py-3">1 Session</td>
                      <td className="text-center py-3">Unlimited</td>
                    </tr>
                  </tbody>
                </table>
              </TabsContent>
            </Tabs>
          </GlassCard>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-3xl mx-auto mt-20"
        >
          <h2 className="text-2xl font-semibold text-center mb-8">Frequently Asked Questions</h2>
          
          <GlassCard className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </GlassCard>
          
          <div className="text-center mt-10">
            <p className="text-gray-300 mb-5">Still have questions about our plans?</p>
            <button className="text-primary hover:text-primary-hover flex items-center gap-1 mx-auto">
              Contact our sales team <i className='bx bx-right-arrow-alt'></i>
            </button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default Pricing;