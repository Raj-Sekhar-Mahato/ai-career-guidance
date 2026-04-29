import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import OverviewSection from "@/components/OverviewSection";
import ArchitectureSection from "@/components/ArchitectureSection";
import DatabaseSection from "@/components/DatabaseSection";
import RecommendationSection from "@/components/RecommendationSection";
import TechStackSection from "@/components/TechStackSection";
import TestingSecuritySection from "@/components/TestingSecuritySection";
import TeamSection from "@/components/TeamSection";
import ConclusionSection from "@/components/ConclusionSection";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <OverviewSection />
    <ArchitectureSection />
    <DatabaseSection />
    <RecommendationSection />
    <TechStackSection />
    <TestingSecuritySection />
    <TeamSection />
    <ConclusionSection />
    <footer className="py-8 text-center border-t border-border">
      <p className="text-xs text-muted-foreground">© 2025 AI Career Guidance System — All Rights Reserved</p>
    </footer>
  </div>
);

export default Index;
