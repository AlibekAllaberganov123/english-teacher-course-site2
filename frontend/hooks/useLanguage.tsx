import { create } from "zustand";
import { persist } from "zustand/middleware";

type Language = "uz" | "en" | "ru";

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, fallback: string) => string;
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: "uz",
      setLanguage: (language) => set({ language }),
      t: (key, fallback) => {
        return fallback;
      },
    }),
    {
      name: "language-storage",
    }
  )
);
