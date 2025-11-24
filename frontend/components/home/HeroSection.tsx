import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Award, Users, TrendingUp } from "lucide-react";

export function HeroSection() {
  const trustBadges = [
    { icon: Users, text: "1000+ Students", textUz: "1000+ talaba" },
    { icon: TrendingUp, text: "8+ Years", textUz: "8+ yil tajriba" },
    { icon: Award, text: "IELTS 8.5", textUz: "IELTS 8.5" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-6"
            >
              Professional IELTS Expert 🎓
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              IELTS 8.0+ va ingliz tilini{" "}
              <span className="text-sky-600 block mt-2">6 oydan kamroq</span>{" "}
              muddatda o'rganing
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
              Professional o'qituvchi Alibek Allaberganov bilan ingliz tilini mukammal 
              darajada o'rganing va IELTS imtihonida yuqori natijaga erishing
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/courses">
                <Button size="lg" className="text-base px-8 py-6 bg-sky-600 hover:bg-sky-700">
                  Kurslar
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-base px-8 py-6 border-2">
                  Bepul Konsultatsiya
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                    <badge.icon className="w-5 h-5 text-sky-600" />
                  </div>
                  <span className="font-medium text-slate-700">{badge.textUz}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100 shadow-2xl">
              <img
                src="/hero-teacher.jpg"
                alt="Alibek Allaberganov"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='600'%3E%3Crect fill='%23E0F2FE' width='600' height='600'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%230F172A' font-size='32' font-family='Arial'%3EAlibek Allaberganov%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl"
            >
              <div className="text-3xl font-bold text-sky-600">8.5</div>
              <div className="text-sm text-slate-600">IELTS Score</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
