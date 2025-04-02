import React, { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface SEOScoreCardProps {
  title: string;
  score: number;
  recommendations: string[];
  scoreClass: string;
}

const SEOScoreCard: React.FC<SEOScoreCardProps> = ({ title, score, recommendations, scoreClass }) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium">{title}</h3>
        <Badge className={scoreClass}>{score}/100</Badge>
      </div>
      <Progress value={score} className="h-2 mb-4" />
      <div className="text-sm text-gray-300">
        <h4 className="font-medium mb-2">Recommendations:</h4>
        <ul className="list-disc pl-5 space-y-1">
          {recommendations.map((rec, index) => (
            <li key={index}>{rec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const SEOAnalyzer: React.FC = () => {
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const [content, setContent] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<null | {
    keywordScore: number;
    contentScore: number;
    technicalScore: number;
    backlinksScore: number;
    socialScore: number;
    overallScore: number;
  }>(null);

  const handleAnalyze = () => {
    if (!url || !keyword) return;
    
    setAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      // In a real implementation, this would be an API call to a backend service
      // that would perform actual SEO analysis
      setResults({
        keywordScore: Math.floor(Math.random() * 30) + 70,
        contentScore: Math.floor(Math.random() * 25) + 75,
        technicalScore: Math.floor(Math.random() * 20) + 80,
        backlinksScore: Math.floor(Math.random() * 40) + 60,
        socialScore: Math.floor(Math.random() * 35) + 65,
        overallScore: Math.floor(Math.random() * 15) + 75
      });
      setAnalyzing(false);
    }, 2000);
  };

  const getScoreClass = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  const recommendations = {
    keyword: [
      "Add your main keyword in the title tag",
      "Include keyword in the first 100 words",
      "Use related keywords throughout the content",
      "Add keyword to meta description and URL"
    ],
    content: [
      "Increase content length to at least 1500 words",
      "Add more multimedia elements (images, videos)",
      "Improve readability with shorter paragraphs",
      "Include more internal links to related content"
    ],
    technical: [
      "Improve page loading speed",
      "Ensure site is mobile-friendly",
      "Fix broken links and redirects",
      "Implement schema markup"
    ],
    backlinks: [
      "Build more high-quality backlinks",
      "Remove toxic backlinks",
      "Create more linkable content",
      "Reach out to industry influencers"
    ],
    social: [
      "Increase social sharing buttons visibility",
      "Create more shareable content",
      "Engage with users on social platforms",
      "Cross-promote on all social channels"
    ]
  };

  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Advanced SEO Analyzer
        </h2>
        <p className="text-gray-300 text-center max-w-2xl mx-auto mb-8">
          Analyze your content and get actionable recommendations to improve your search engine rankings.
        </p>

        <GlassCard className="max-w-4xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="url">URL to Analyze</Label>
              <Input
                id="url"
                placeholder="https://example.com/page-to-analyze"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="glass"
              />
            </div>
            <div>
              <Label htmlFor="keyword">Target Keyword</Label>
              <Input
                id="keyword"
                placeholder="Main keyword or phrase"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="glass"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <Label htmlFor="content">Content to Analyze (Optional)</Label>
            <Textarea
              id="content"
              placeholder="Paste your content here for analysis"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="glass"
            />
          </div>
          
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`bg-gradient-to-r from-primary to-secondary px-6 py-3 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-300 btn-glow ${analyzing ? 'opacity-70 cursor-not-allowed' : ''}`}
              onClick={handleAnalyze}
              disabled={analyzing || !url || !keyword}
            >
              {analyzing ? (
                <>
                  <i className="bx bx-loader-alt bx-spin mr-2"></i>
                  Analyzing...
                </>
              ) : (
                "Analyze SEO Performance"
              )}
            </motion.button>
          </div>
          
          {results && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Overall SEO Score</h3>
                <div className="inline-block relative">
                  <div className="w-32 h-32 rounded-full border-8 border-gray-700 flex items-center justify-center">
                    <span className={`text-3xl font-bold ${results.overallScore >= 90 ? 'text-green-500' : results.overallScore >= 70 ? 'text-yellow-500' : 'text-red-500'}`}>
                      {results.overallScore}
                    </span>
                  </div>
                  <svg className="absolute top-0 left-0" width="148" height="148" viewBox="0 0 148 148">
                    <circle
                      cx="74"
                      cy="74"
                      r="66"
                      fill="none"
                      stroke={results.overallScore >= 90 ? '#10b981' : results.overallScore >= 70 ? '#eab308' : '#ef4444'}
                      strokeWidth="8"
                      strokeDasharray="415"
                      strokeDashoffset={415 - ((415 * results.overallScore) / 100)}
                      transform="rotate(-90 74 74)"
                    />
                  </svg>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <SEOScoreCard
                  title="Keyword Optimization"
                  score={results.keywordScore}
                  recommendations={recommendations.keyword}
                  scoreClass={getScoreClass(results.keywordScore)}
                />
                
                <SEOScoreCard
                  title="Content Quality"
                  score={results.contentScore}
                  recommendations={recommendations.content}
                  scoreClass={getScoreClass(results.contentScore)}
                />
                
                <SEOScoreCard
                  title="Technical SEO"
                  score={results.technicalScore}
                  recommendations={recommendations.technical}
                  scoreClass={getScoreClass(results.technicalScore)}
                />
                
                <SEOScoreCard
                  title="Backlink Profile"
                  score={results.backlinksScore}
                  recommendations={recommendations.backlinks}
                  scoreClass={getScoreClass(results.backlinksScore)}
                />
                
                <SEOScoreCard
                  title="Social Signals"
                  score={results.socialScore}
                  recommendations={recommendations.social}
                  scoreClass={getScoreClass(results.socialScore)}
                />
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-gray-300 mb-4">
                  Want a detailed analysis report with actionable steps to improve your rankings?
                </p>
                <button className="text-primary hover:text-primary-hover flex items-center gap-1 mx-auto">
                  Generate Comprehensive SEO Report <i className="bx bx-right-arrow-alt"></i>
                </button>
              </div>
            </motion.div>
          )}
        </GlassCard>
      </motion.div>
    </section>
  );
};

export default SEOAnalyzer;