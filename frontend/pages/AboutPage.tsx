import { motion } from "framer-motion";
import { Award, Users, Clock, Target } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export function AboutPage() {
  const { t } = useLanguage();

  const achievements = [
    {
      icon: Users,
      number: "1000+",
      label: t("studentsLabel", "Students Taught"),
      labelUz: "O'qitilgan talabalar"
    },
    {
      icon: Clock,
      number: "8+",
      label: t("yearsLabel", "Years Experience"),
      labelUz: "Yillik tajriba"
    },
    {
      icon: Award,
      number: "8.5",
      label: t("ieltsLabel", "IELTS Score"),
      labelUz: "IELTS natijasi"
    },
    {
      icon: Target,
      number: "95%",
      label: t("successLabel", "Success Rate"),
      labelUz: "Muvaffaqiyat darajasi"
    }
  ];

  const certificates = [
    { name: "IELTS Certificate - Band 8.5", year: "2022" },
    { name: "CELTA (Certificate in Teaching English)", year: "2019" },
    { name: "TESOL Certification", year: "2018" },
    { name: "Cambridge English Teaching Diploma", year: "2020" }
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              {t("aboutTitle", "About")}
              <span className="block mt-2 text-sky-600">Alibek Allaberganov</span>
            </h1>
            <p className="text-lg text-slate-600">
              {t("aboutSubtitle", "Professional English Teacher & IELTS Expert")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src="/teacher-photo.jpg"
                  alt="Alibek Allaberganov"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='500'%3E%3Crect fill='%23E0F2FE' width='400' height='500'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%230F172A' font-size='24' font-family='Arial'%3EAlibek Allaberganov%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">{t("myStory", "My Story")}</h2>
                <div className="space-y-4 text-slate-600">
                  <p>
                    Salom! Men Alibek Allaberganov, professional ingliz tili o'qituvchisi va IELTS mutaxassisiman. 
                    8 yildan ortiq tajriba davomida 1000 dan ortiq talabalarga ingliz tilini o'rgatdim va ularning 
                    IELTS imtihonlarida yuqori natijalar olishlariga yordam berdim.
                  </p>
                  <p>
                    O'zim IELTS imtihonida 8.5 ball to'pladim va bu tajribamni talabalarimga o'tkazishdan 
                    mamnunman. Mening o'qitish metodologiyam zamonaviy va samarali bo'lib, har bir talabaning 
                    individual ehtiyojlariga qaratilgan.
                  </p>
                  <p>
                    Men CELTA, TESOL va Cambridge English Teaching diplomlariga egaman. Har bir darsda 
                    talabalarimning o'sishini ko'rish va ularning muvaffaqiyatlariga hissa qo'shish mening 
                    eng katta qoniqishimdir.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6">
                {achievements.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    className="bg-sky-50 p-6 rounded-xl text-center"
                  >
                    <item.icon className="w-8 h-8 text-sky-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-slate-900 mb-1">{item.number}</div>
                    <div className="text-sm text-slate-600">{item.labelUz}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-slate-50 rounded-2xl p-8 md:p-12"
          >
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
              {t("certificatesTitle", "Certificates & Qualifications")}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl border border-slate-200 hover:border-sky-300 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-sky-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{cert.name}</h3>
                      <p className="text-sm text-slate-500">{cert.year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
