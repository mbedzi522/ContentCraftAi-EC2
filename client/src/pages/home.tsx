import React from "react";
import Navbar from "@/components/navbar";
import Header from "@/components/header";
import ContentGenerator from "@/components/content-generator";
import FeatureSection from "@/components/feature-section";
import PricingSection from "@/components/pricing-section";
import CtaSection from "@/components/cta-section";
import Footer from "@/components/footer";
import SEOAnalyzer from "@/components/seo-analyzer";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-8 mb-20">
        <Header />
        <ContentGenerator />
        <SEOAnalyzer />
      </main>
      <FeatureSection />
      <PricingSection />
      <CtaSection />
      <Footer />
    </>
  );
};

export default Home;
