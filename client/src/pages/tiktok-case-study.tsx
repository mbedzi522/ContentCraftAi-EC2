import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";

const MetricCard: React.FC<{ title: string, value: string, subtitle: string, icon: string, color: string }> = ({ 
  title, value, subtitle, icon, color 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <GlassCard className="p-6" withHover>
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-4`}>
          <i className={`bx ${icon} text-2xl text-white`}></i>
        </div>
        <h3 className="text-3xl font-bold mb-1">{value}</h3>
        <div className="text-gray-300 mb-2">{title}</div>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </GlassCard>
    </motion.div>
  );
};

const TikTokCaseStudy: React.FC = () => {
  const metrics = [
    { 
      title: "Engagement Rate", 
      value: "18.7%", 
      subtitle: "2.8× industry average", 
      icon: "bx-like", 
      color: "bg-blue-500" 
    },
    { 
      title: "Follower Growth", 
      value: "412K", 
      subtitle: "In just 3 months", 
      icon: "bx-user-plus", 
      color: "bg-purple-500" 
    },
    { 
      title: "Content Views", 
      value: "19.5M", 
      subtitle: "Total campaign reach", 
      icon: "bx-show", 
      color: "bg-pink-500" 
    },
    { 
      title: "Conversion Rate", 
      value: "6.2%", 
      subtitle: "From view to website visit", 
      icon: "bx-transfer", 
      color: "bg-green-500" 
    },
  ];

  const strategies = [
    {
      title: "Trending Sounds Optimization",
      description: "By analyzing and quickly adopting trending audio tracks, we increased discoverability by 218%.",
      effectiveness: 92,
    },
    {
      title: "Pattern Interruption Hooks",
      description: "Implementing the 3-second hook formula increased average watch time from 7.2 seconds to 19.8 seconds.",
      effectiveness: 87,
    },
    {
      title: "User-Generated Content Integration",
      description: "Featuring customer testimonials and user content resulted in 3.4× higher engagement rate than branded content alone.",
      effectiveness: 95,
    },
    {
      title: "AI-Driven Content Calendar",
      description: "Using our proprietary AI to schedule posts during optimal engagement windows increased average post performance by 47%.",
      effectiveness: 78,
    },
    {
      title: "Hashtag Strategy Optimization",
      description: "Balancing trending, niche, and branded hashtags resulted in a 167% increase in non-follower impressions.",
      effectiveness: 84,
    }
  ];

  const contentTypes = [
    {
      type: "Educational Content",
      viewRate: 85,
      shareRate: 12.3,
      conversionRate: 3.8,
      notes: "Performed best with detailed how-to guides under 45 seconds"
    },
    {
      type: "Behind-the-Scenes",
      viewRate: 91,
      shareRate: 8.7,
      conversionRate: 2.2,
      notes: "Authentic, unpolished footage outperformed highly edited versions"
    },
    {
      type: "Product Showcases",
      viewRate: 68,
      shareRate: 5.1,
      conversionRate: 7.9,
      notes: "Direct response rates highest when featuring customer testimonials"
    },
    {
      type: "Trend Participation",
      viewRate: 94,
      shareRate: 18.5,
      conversionRate: 1.7,
      notes: "Highest virality potential but lowest direct conversion"
    },
    {
      type: "Creator Collaborations",
      viewRate: 88,
      shareRate: 14.2,
      conversionRate: 5.4,
      notes: "Micro-influencers (10K-50K followers) delivered best ROI"
    },
  ];

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Badge className="bg-[#FE2C55] hover:bg-[#FE2C55]/80">TikTok Case Study</Badge>
            <Badge variant="outline">E-Commerce</Badge>
            <Badge variant="outline">Fashion Brand</Badge>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-heading text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
          >
            How We Generated $1.2M in Revenue<br />Using TikTok Content Marketing
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-300 text-center max-w-3xl mx-auto mb-12"
          >
            A comprehensive analysis of our AI-driven content strategy that transformed
            an emerging fashion brand into a TikTok powerhouse.
          </motion.p>
          
          {/* Client Overview Section */}
          <GlassCard className="p-8 mb-12">
            <div className="flex items-start gap-6">
              <div className="hidden md:block w-32 h-32 rounded-full bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] flex-shrink-0 flex items-center justify-center">
                <i className="bx bx-store text-5xl text-white"></i>
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Client Overview</h2>
                <p className="text-gray-300 mb-4">
                  FashionForward, a direct-to-consumer sustainable fashion brand, came to us with the challenge of 
                  building brand awareness and driving e-commerce sales through TikTok. Despite having quality products 
                  and a strong brand mission, they struggled to gain traction on the platform with traditional marketing approaches.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary mb-1">12 weeks</div>
                    <div className="text-sm text-gray-400">Campaign Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary mb-1">$110K</div>
                    <div className="text-sm text-gray-400">Initial Budget</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary mb-1">18-34</div>
                    <div className="text-sm text-gray-400">Target Age Range</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary mb-1">11.3×</div>
                    <div className="text-sm text-gray-400">ROI Achieved</div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
          
          {/* Key Metrics Section */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-heading text-2xl font-bold text-center mb-8"
          >
            Key Performance Metrics
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {metrics.map((metric, index) => (
              <MetricCard
                key={index}
                title={metric.title}
                value={metric.value}
                subtitle={metric.subtitle}
                icon={metric.icon}
                color={metric.color}
              />
            ))}
          </div>
          
          {/* Strategy Section */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-heading text-2xl font-bold text-center mb-8"
          >
            AI-Driven Strategy Components
          </motion.h2>
          
          <GlassCard className="p-8 mb-16">
            <div className="space-y-8">
              {strategies.map((strategy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">{strategy.title}</h3>
                    <Badge className={strategy.effectiveness >= 90 ? "bg-green-500" : strategy.effectiveness >= 80 ? "bg-yellow-500" : "bg-blue-500"}>
                      {strategy.effectiveness}% Effective
                    </Badge>
                  </div>
                  <p className="text-gray-300 mb-3">{strategy.description}</p>
                  <Progress value={strategy.effectiveness} className="h-2" />
                </motion.div>
              ))}
            </div>
          </GlassCard>
          
          {/* Content Performance Section */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-heading text-2xl font-bold text-center mb-8"
          >
            Content Type Performance Analysis
          </motion.h2>
          
          <div className="overflow-x-auto mb-16">
            <GlassCard className="p-0">
              <table className="w-full">
                <thead className="border-b border-white/10">
                  <tr>
                    <th className="text-left p-4">Content Type</th>
                    <th className="text-center p-4">View Rate</th>
                    <th className="text-center p-4">Share Rate</th>
                    <th className="text-center p-4">Conversion</th>
                    <th className="text-left p-4">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {contentTypes.map((content, index) => (
                    <tr key={index} className={index < contentTypes.length - 1 ? "border-b border-white/5" : ""}>
                      <td className="p-4 font-medium">{content.type}</td>
                      <td className="p-4 text-center">
                        <span className={`font-mono ${content.viewRate > 85 ? "text-green-400" : "text-blue-400"}`}>{content.viewRate}%</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`font-mono ${content.shareRate > 10 ? "text-green-400" : "text-blue-400"}`}>{content.shareRate}%</span>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`font-mono ${content.conversionRate > 5 ? "text-green-400" : "text-blue-400"}`}>{content.conversionRate}%</span>
                      </td>
                      <td className="p-4 text-sm text-gray-300">{content.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
          </div>
          
          {/* AI Creation Process */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-heading text-2xl font-bold text-center mb-8"
          >
            Our AI Content Creation Process
          </motion.h2>
          
          <GlassCard className="p-8 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-2xl">1</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Trend Analysis</h3>
                <p className="text-gray-300 text-sm">
                  Our AI monitors TikTok trends in real-time, analyzing audio tracks, 
                  hashtags, and content formats gaining traction within the target demographic.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-2xl">2</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Script Generation</h3>
                <p className="text-gray-300 text-sm">
                  Based on trend data, our platform generates optimized scripts and content 
                  frameworks specifically customized to the brand's voice and product offerings.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-2xl">3</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Performance Prediction</h3>
                <p className="text-gray-300 text-sm">
                  Each content piece is scored with our predictive engagement algorithm 
                  to forecast performance before it's even published.
                </p>
              </motion.div>
            </div>
          </GlassCard>
          
          {/* Key Learnings */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="font-heading text-2xl font-bold text-center mb-8"
          >
            Key Learnings & Insights
          </motion.h2>
          
          <GlassCard className="p-8 mb-16">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>The 3-Second Rule is Non-Negotiable</AccordionTrigger>
                <AccordionContent>
                  Our analysis revealed that videos that failed to capture attention in the first 3 seconds 
                  saw an average drop-off rate of 78%. By implementing a pattern-interrupt hook in this critical 
                  window, we reduced drop-off to just 31% and increased average view duration by 225%.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>Authenticity Outperforms Production Value</AccordionTrigger>
                <AccordionContent>
                  High-production videos (professionally lit and edited) consistently underperformed compared to 
                  authentic, raw content shot in natural environments. User-generated style content achieved 3.2× 
                  higher engagement rates and 2.7× higher share rates than polished branded content.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>Algorithm-Friendly Posting Drives Discovery</AccordionTrigger>
                <AccordionContent>
                  By analyzing over 20,000 TikTok posts across fashion categories, our AI identified optimal 
                  posting windows within 15-minute intervals. Content posted during these precise windows saw 
                  a 43% increase in For You Page distribution compared to standard "best time to post" guidelines.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Multiple Calls-to-Action Decrease Conversion</AccordionTrigger>
                <AccordionContent>
                  Videos with a single, clear call-to-action had a 4.5× higher conversion rate than videos with 
                  multiple CTAs. Our data showed that asking viewers to "like, comment, and visit our website" 
                  resulted in significantly lower completion of any action compared to a focused "shop now" CTA.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>Sound Strategy is as Important as Visual Strategy</AccordionTrigger>
                <AccordionContent>
                  Videos using trending sounds received 2.3× more views on average than those with original audio. 
                  However, videos using trending sounds modified with branded voiceovers achieved the highest 
                  overall performance, combining algorithm preference with brand messaging.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </GlassCard>
          
          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-2xl font-semibold mb-4">Ready to Transform Your TikTok Strategy?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Our AI-powered platform can analyze your brand, target audience, and industry to create 
              a custom TikTok content strategy designed for maximum engagement and conversion.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] px-6 py-3 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-300 btn-glow"
              >
                Get Your Custom TikTok Strategy
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass px-6 py-3 rounded-lg text-white font-medium hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <i className="bx bx-calendar"></i>
                Schedule a Strategy Call
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TikTokCaseStudy;