import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import backend from "~backend/client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function TestimonialsCarousel() {
  const { data } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => backend.testimonials.list(),
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = data?.testimonials || [];

  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Talabalar <span className="text-sky-600">Fikrlari</span>
          </h2>
          <p className="text-lg text-slate-600">
            Mening talabalarimning muvaffaqiyatlari va fikrilarini o'qing
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-xl"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-slate-200 overflow-hidden">
                  {testimonials[currentIndex].image ? (
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].studentNameUz}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96'%3E%3Crect fill='%23E0F2FE' width='96' height='96'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%230F172A' font-size='32'%3E${testimonials[currentIndex].studentNameUz[0]}%3C/text%3E%3C/svg%3E`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-slate-600">
                      {testimonials[currentIndex].studentNameUz[0]}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start gap-1 mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                  "{testimonials[currentIndex].testimonialUz}"
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div>
                    <div className="font-semibold text-slate-900">
                      {testimonials[currentIndex].studentNameUz}
                    </div>
                    <div className="text-sm text-slate-500">
                      {testimonials[currentIndex].course}
                    </div>
                  </div>

                  {testimonials[currentIndex].beforeScore && testimonials[currentIndex].afterScore && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-sky-50 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-sky-600" />
                      <span className="text-sm font-medium text-slate-700">
                        {testimonials[currentIndex].beforeScore} → {testimonials[currentIndex].afterScore}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-sky-600 w-8"
                      : "bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
