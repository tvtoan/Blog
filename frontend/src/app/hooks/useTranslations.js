import vi from "@/app/locales/vi.json";
import jp from "@/app/locales/jp.json";
import { useLanguage } from "@/app/context/LanguageContext";

export default function useTranslation() {
  const { language } = useLanguage();

  const translations = {
    vi,
    jp,
  };

  return { ...translations[language], language };
}
