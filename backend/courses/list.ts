import { api } from "encore.dev/api";

export interface Course {
  id: string;
  title: string;
  titleUz: string;
  description: string;
  descriptionUz: string;
  price: number;
  duration: string;
  format: "online" | "offline" | "hybrid";
  level: string;
  startDate: string;
  features: string[];
  featuresUz: string[];
  image: string;
  category: string;
}

export interface ListCoursesResponse {
  courses: Course[];
}

// Lists all available courses
export const list = api<void, ListCoursesResponse>(
  { expose: true, method: "GET", path: "/courses" },
  async (): Promise<ListCoursesResponse> => {
    const courses: Course[] = [
      {
        id: "ielts-intensive",
        title: "IELTS Intensive Course",
        titleUz: "IELTS Intensiv Kursi",
        description: "Achieve Band 7-9 with our comprehensive IELTS preparation program",
        descriptionUz: "Band 7-9 ga erishish uchun keng qamrovli IELTS tayyorlov dasturi",
        price: 1500000,
        duration: "3 months",
        format: "hybrid",
        level: "Intermediate to Advanced",
        startDate: "2025-02-01",
        features: [
          "4 skills training (Reading, Writing, Speaking, Listening)",
          "Mock tests every week",
          "Personal feedback on writing tasks",
          "Speaking practice with native speakers",
          "Study materials included"
        ],
        featuresUz: [
          "4 ta ko'nikma mashqlari (Reading, Writing, Speaking, Listening)",
          "Har hafta mock testlar",
          "Writing topshiriqlari bo'yicha shaxsiy fikr-mulohazalar",
          "Native speakerlar bilan speaking amaliyoti",
          "O'quv materiallari kiritilgan"
        ],
        image: "/courses/ielts.jpg",
        category: "IELTS"
      },
      {
        id: "general-english",
        title: "General English (A1-C1)",
        titleUz: "Umumiy Ingliz Tili (A1-C1)",
        description: "Master English from basics to advanced level",
        descriptionUz: "Ingliz tilini asoslaridan yuqori darajagacha o'rganing",
        price: 900000,
        duration: "6 months",
        format: "online",
        level: "All levels",
        startDate: "2025-02-05",
        features: [
          "Structured curriculum from A1 to C1",
          "Interactive online lessons",
          "Grammar, vocabulary, and pronunciation",
          "Real-life communication practice",
          "Progress tracking and certificates"
        ],
        featuresUz: [
          "A1 dan C1 gacha tuzilgan o'quv dasturi",
          "Interaktiv onlayn darslar",
          "Grammatika, so'z boyligi va talaffuz",
          "Haqiqiy hayotda muloqot amaliyoti",
          "Rivojlanishni kuzatish va sertifikatlar"
        ],
        image: "/courses/general.jpg",
        category: "General English"
      },
      {
        id: "speaking-club",
        title: "Speaking Club",
        titleUz: "Speaking Klubi",
        description: "Improve your fluency and confidence in speaking English",
        descriptionUz: "Ingliz tilida gapirish ravonligi va ishonchingizni oshiring",
        price: 400000,
        duration: "1 month",
        format: "online",
        level: "Pre-Intermediate+",
        startDate: "2025-02-10",
        features: [
          "Weekly discussion sessions",
          "Topic-based conversations",
          "Pronunciation correction",
          "Vocabulary building",
          "Small group practice"
        ],
        featuresUz: [
          "Haftalik muhokama mashg'ulotlari",
          "Mavzuga asoslangan suhbatlar",
          "Talaffuzni tuzatish",
          "So'z boyligini oshirish",
          "Kichik guruhda amaliyot"
        ],
        image: "/courses/speaking.jpg",
        category: "Speaking"
      },
      {
        id: "business-english",
        title: "Business English",
        titleUz: "Biznes Ingliz Tili",
        description: "Professional English for career advancement",
        descriptionUz: "Karyera rivojlanishi uchun professional ingliz tili",
        price: 1200000,
        duration: "4 months",
        format: "hybrid",
        level: "Intermediate+",
        startDate: "2025-02-15",
        features: [
          "Email writing and business correspondence",
          "Meeting and presentation skills",
          "Negotiation techniques",
          "Industry-specific vocabulary",
          "Professional networking practice"
        ],
        featuresUz: [
          "Email yozish va biznes yozishmalari",
          "Yig'ilish va taqdimot ko'nikmalari",
          "Muzokaralar texnikasi",
          "Sohaga xos so'z boyligi",
          "Professional tarmoq qurish amaliyoti"
        ],
        image: "/courses/business.jpg",
        category: "Business"
      },
      {
        id: "kids-english",
        title: "Kids English (6-12 years)",
        titleUz: "Bolalar uchun Ingliz Tili (6-12 yosh)",
        description: "Fun and interactive English learning for children",
        descriptionUz: "Bolalar uchun qiziqarli va interaktiv ingliz tili",
        price: 700000,
        duration: "5 months",
        format: "offline",
        level: "Beginner to Elementary",
        startDate: "2025-02-08",
        features: [
          "Game-based learning",
          "Story-telling and songs",
          "Interactive activities",
          "Age-appropriate materials",
          "Progress reports for parents"
        ],
        featuresUz: [
          "O'yin asosida o'rganish",
          "Hikoya aytish va qo'shiqlar",
          "Interaktiv mashg'ulotlar",
          "Yoshga mos materiallar",
          "Ota-onalar uchun rivojlanish hisobotlari"
        ],
        image: "/courses/kids.jpg",
        category: "Kids"
      }
    ];

    return { courses };
  }
);
