import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Users, Award, Star, BookOpen } from "lucide-react";

export function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { icon: Users, value: 1000, suffix: "+", label: "O'qitilgan talabalar" },
    { icon: Award, value: 8, suffix: "+", label: "Yillik tajriba" },
    { icon: Star, value: 95, suffix: "%", label: "Muvaffaqiyat darajasi" },
    { icon: BookOpen, value: 50, suffix: "+", label: "Tugatilgan kurslar" },
  ];

  return (
    <section ref={ref} className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCounter
              key={index}
              {...stat}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCounter({ icon: Icon, value, suffix, label, index, isInView }: any) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const stepValue = value / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCount(Math.min(Math.floor(stepValue * currentStep), value));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-sky-600" />
      </div>
      <div className="text-4xl font-bold text-slate-900 mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm text-slate-600">{label}</div>
    </motion.div>
  );
}
