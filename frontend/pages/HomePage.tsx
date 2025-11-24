import { motion } from "framer-motion";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { CTASection } from "@/components/home/CTASection";

export function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <StatsSection />
      <FeaturedCourses />
      <TestimonialsCarousel />
      <CTASection />
    </motion.div>
  );
}
