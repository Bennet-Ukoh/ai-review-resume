"use client";

import HeroSection from "@/components/home-page/hero-section";
import HowItWorksSection from "@/components/home-page/how-it-works-section";
import CTASection from "@/components/home-page/cta-section";

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <HeroSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
