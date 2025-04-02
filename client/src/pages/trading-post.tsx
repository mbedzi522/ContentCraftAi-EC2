import React, { useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ContentListingProps {
  id: number;
  title: string;
  type: string;
  industry: string;
  price: number;
  rating: number;
  author: string;
  downloads: number;
  description: string;
  tags: string[];
  preview: string;
}

const ContentListing: React.FC<ContentListingProps> = ({
  id,
  title,
  type,
  industry,
  price,
  rating,
  author,
  downloads,
  description,
  tags,
  preview
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="col-span-1"
    >
      <GlassCard className="h-full flex flex-col" withHover>
        <div className="p-4 border-b border-white/10">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-medium truncate">{title}</h3>
            <Badge variant="secondary">${price}</Badge>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline">{type}</Badge>
            <Badge variant="outline">{industry}</Badge>
          </div>
          <p className="text-gray-300 line-clamp-3 mb-3">{description}</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.map((tag, i) => (
              <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded-md">{tag}</span>
            ))}
          </div>
        </div>
        
        <div className="p-4 bg-white/5 flex justify-between items-center mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <i className="bx bx-user text-primary"></i>
            </div>
            <span className="text-sm">{author}</span>
          </div>
          <div className="flex items-center">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <i key={i} className={`bx ${i < rating ? 'bxs-star' : 'bx-star'} text-sm`}></i>
              ))}
            </div>
            <span className="text-xs text-gray-400">{downloads} uses</span>
          </div>
        </div>
        
        <div className="p-4 flex justify-between items-center border-t border-white/10">
          <button className="text-primary hover:text-primary-hover text-sm flex items-center gap-1">
            Preview <i className="bx bx-show"></i>
          </button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-primary to-secondary px-4 py-1.5 rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all duration-300"
          >
            Purchase
          </motion.button>
        </div>
      </GlassCard>
    </motion.div>
  );
};

const TradingPost: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  
  const contentListings: ContentListingProps[] = [
    {
      id: 1,
      title: "E-commerce Product Description Bundle",
      type: "Product Template",
      industry: "E-commerce",
      price: 49,
      rating: 5,
      author: "MarketingPro",
      downloads: 283,
      description: "A complete bundle of 20 premium product description templates optimized for conversions. Includes variations for fashion, electronics, home goods, and beauty products.",
      tags: ["product", "e-commerce", "conversion", "template"],
      preview: ""
    },
    {
      id: 2,
      title: "SaaS Onboarding Email Sequence",
      type: "Email Series",
      industry: "SaaS",
      price: 79,
      rating: 4,
      author: "GrowthHacker",
      downloads: 157,
      description: "10-email sequence designed to onboard new SaaS users and increase activation. Each email is A/B tested with proven results of 23% higher engagement.",
      tags: ["email", "onboarding", "sequence", "SaaS"],
      preview: ""
    },
    {
      id: 3,
      title: "Finance Blog Content Calendar",
      type: "Content Calendar",
      industry: "Finance",
      price: 129,
      rating: 5,
      author: "ContentStrategist",
      downloads: 92,
      description: "12-month content calendar with 48 blog post outlines specifically designed for financial advisors, banks, and fintech companies. Includes SEO research.",
      tags: ["finance", "blog", "calendar", "SEO"],
      preview: ""
    },
    {
      id: 4,
      title: "Restaurant Social Media Kit",
      type: "Social Media",
      industry: "Food & Beverage",
      price: 59,
      rating: 4,
      author: "SocialMediaChef",
      downloads: 176,
      description: "30-day social media content kit with post templates, hashtag strategies, and engagement prompts specifically designed for restaurants and food businesses.",
      tags: ["restaurant", "social media", "templates", "food"],
      preview: ""
    },
    {
      id: 5,
      title: "Real Estate Listing Optimizer",
      type: "Property Description",
      industry: "Real Estate",
      price: 39,
      rating: 5,
      author: "PropertyPro",
      downloads: 217,
      description: "Tool and templates for creating compelling real estate listings that sell properties faster. Includes power word suggestions and formatting best practices.",
      tags: ["real estate", "listings", "optimization", "templates"],
      preview: ""
    },
    {
      id: 6,
      title: "TikTok Script Collection",
      type: "Video Script",
      industry: "Social Media",
      price: 69,
      rating: 5,
      author: "ViralCreator",
      downloads: 328,
      description: "Collection of 50 proven TikTok video scripts in trending formats. Each script includes hook variations, talking points, and call-to-action suggestions.",
      tags: ["TikTok", "script", "viral", "video"],
      preview: ""
    },
    {
      id: 7,
      title: "Healthcare Email Nurture Sequence",
      type: "Email Series",
      industry: "Healthcare",
      price: 89,
      rating: 4,
      author: "HealthcareMarketingPro",
      downloads: 103,
      description: "HIPAA-compliant email nurture sequence for healthcare providers. Includes patient education content and appointment booking prompts.",
      tags: ["healthcare", "email", "HIPAA", "patient"],
      preview: ""
    },
    {
      id: 8,
      title: "B2B Cold Outreach Templates",
      type: "Outreach Scripts",
      industry: "B2B",
      price: 69,
      rating: 4,
      author: "SalesExpert",
      downloads: 241,
      description: "Collection of high-converting cold email and LinkedIn message templates for B2B sales professionals. Includes follow-up sequences and response handling.",
      tags: ["B2B", "sales", "outreach", "templates"],
      preview: ""
    },
  ];
  
  const industries = ["All Industries", "E-commerce", "SaaS", "Finance", "Food & Beverage", "Real Estate", "Social Media", "Healthcare", "B2B"];
  const types = ["All Types", "Product Template", "Email Series", "Content Calendar", "Social Media", "Property Description", "Video Script", "Outreach Scripts"];
  const priceRanges = ["All Prices", "Under $50", "$50-$100", "Over $100"];
  
  const filteredListings = contentListings.filter(listing => {
    return (
      (searchQuery === "" || 
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      ) &&
      (industryFilter === "" || industryFilter === "All Industries" || listing.industry === industryFilter) &&
      (typeFilter === "" || typeFilter === "All Types" || listing.type === typeFilter) &&
      (priceFilter === "" || priceFilter === "All Prices" || 
        (priceFilter === "Under $50" && listing.price < 50) ||
        (priceFilter === "$50-$100" && listing.price >= 50 && listing.price <= 100) ||
        (priceFilter === "Over $100" && listing.price > 100)
      )
    );
  });

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-12 mb-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-heading text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
        >
          Content Trading Post
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-300 text-center max-w-2xl mx-auto mb-8"
        >
          Buy and sell premium content templates, scripts, and strategies 
          created by professional marketers and content creators.
        </motion.p>
        
        <Tabs defaultValue="marketplace" className="w-full max-w-6xl mx-auto mb-10">
          <TabsList className="grid w-full grid-cols-2 glass mb-8">
            <TabsTrigger value="marketplace">Browse Marketplace</TabsTrigger>
            <TabsTrigger value="sell">Sell Your Content</TabsTrigger>
          </TabsList>
          
          <TabsContent value="marketplace" className="mt-0">
            <GlassCard className="p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="search" className="sr-only">Search</Label>
                  <div className="relative">
                    <Input
                      id="search"
                      placeholder="Search by keyword, title, or tag..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="glass w-full pl-10"
                    />
                    <i className="bx bx-search absolute left-3 top-2.5 text-gray-400"></i>
                  </div>
                </div>
                <div>
                  <Label htmlFor="industry" className="sr-only">Industry</Label>
                  <Select value={industryFilter} onValueChange={setIndustryFilter}>
                    <SelectTrigger className="glass w-full">
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map(industry => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type" className="sr-only">Content Type</Label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="glass w-full">
                      <SelectValue placeholder="Content Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </GlassCard>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.length > 0 ? (
                filteredListings.map(listing => (
                  <ContentListing key={listing.id} {...listing} />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <i className="bx bx-search-alt text-5xl text-gray-400 mb-4"></i>
                  <h3 className="text-xl font-medium mb-2">No results found</h3>
                  <p className="text-gray-400">Try adjusting your search or filters to find what you're looking for.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="sell" className="mt-0">
            <GlassCard className="p-6">
              <h2 className="text-2xl font-semibold mb-6">List Your Content for Sale</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="content-title">Title</Label>
                  <Input id="content-title" placeholder="Give your content a compelling title" className="glass" />
                </div>
                <div>
                  <Label htmlFor="content-price">Price ($USD)</Label>
                  <Input id="content-price" type="number" placeholder="49.99" className="glass" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label htmlFor="content-type">Content Type</Label>
                  <Select>
                    <SelectTrigger className="glass w-full">
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent>
                      {types.slice(1).map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="content-industry">Industry</Label>
                  <Select>
                    <SelectTrigger className="glass w-full">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.slice(1).map(industry => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mb-6">
                <Label htmlFor="content-description">Description</Label>
                <Textarea 
                  id="content-description" 
                  placeholder="Describe your content and its benefits in detail" 
                  rows={4}
                  className="glass" 
                />
              </div>
              
              <div className="mb-6">
                <Label htmlFor="content-tags">Tags (comma separated)</Label>
                <Input id="content-tags" placeholder="email, marketing, template, sales" className="glass" />
              </div>
              
              <div className="mb-8">
                <Label htmlFor="content-file">Upload Content File</Label>
                <div className="glass p-8 border-2 border-dashed border-gray-700 rounded-lg text-center cursor-pointer hover:border-primary transition-colors">
                  <i className="bx bx-upload text-3xl mb-2"></i>
                  <p className="text-gray-300 mb-1">Drag and drop your file here, or click to browse</p>
                  <p className="text-xs text-gray-400">Supported formats: PDF, DOCX, PPTX, ZIP (Max 50MB)</p>
                </div>
              </div>
              
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-primary to-secondary px-6 py-3 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-300 btn-glow"
                >
                  List Content for Sale
                </motion.button>
              </div>
            </GlassCard>
          </TabsContent>
        </Tabs>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-4xl mx-auto mt-16 text-center"
        >
          <GlassCard className="p-8">
            <i className="bx bx-badge-check text-4xl text-primary mb-4"></i>
            <h2 className="text-2xl font-semibold mb-3">Become a Premium Content Seller</h2>
            <p className="text-gray-300 mb-6">
              Gain access to our community of 10,000+ marketers and creators. 
              Earn recurring revenue from your content templates and marketing strategies.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary to-secondary px-6 py-3 rounded-lg text-white font-medium hover:shadow-lg transition-all duration-300 btn-glow"
            >
              Apply for Creator Account
            </motion.button>
          </GlassCard>
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default TradingPost;