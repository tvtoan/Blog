export const getLocalizedText = (text, language, fallback = "") => {
  if (text && typeof text === "object") {
    return text[language] || Object.values(text)[0] || fallback;
  }
  return text || fallback;
};
