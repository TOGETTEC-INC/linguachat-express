
// Simule un service de traduction - Dans une vraie application, ceci serait
// remplacé par un appel à une API de traduction comme Google Translate ou DeepL

const translations: Record<string, Record<string, string>> = {
  fr: {
    hello: "Bonjour",
    how_are_you: "Comment allez-vous ?",
    what_is_your_name: "Comment vous appelez-vous ?",
    good_morning: "Bonjour",
    good_evening: "Bonsoir",
    thanks: "Merci",
    welcome: "Bienvenue",
    goodbye: "Au revoir",
  },
  en: {
    hello: "Hello",
    how_are_you: "How are you?",
    what_is_your_name: "What is your name?",
    good_morning: "Good morning",
    good_evening: "Good evening",
    thanks: "Thank you",
    welcome: "Welcome",
    goodbye: "Goodbye",
  },
  es: {
    hello: "Hola",
    how_are_you: "¿Cómo estás?",
    what_is_your_name: "¿Cómo te llamas?",
    good_morning: "Buenos días",
    good_evening: "Buenas noches",
    thanks: "Gracias",
    welcome: "Bienvenido",
    goodbye: "Adiós",
  },
  de: {
    hello: "Hallo",
    how_are_you: "Wie geht es dir?",
    what_is_your_name: "Wie heißt du?",
    good_morning: "Guten Morgen",
    good_evening: "Guten Abend",
    thanks: "Danke",
    welcome: "Willkommen",
    goodbye: "Auf Wiedersehen",
  },
};

// Fonction qui simule la traduction en remplaçant certains mots clés
export const translateMessage = (
  message: string,
  fromLang: string,
  toLang: string
): string => {
  if (fromLang === toLang) return message;

  let translated = message;

  // Simulons une traduction simpliste en remplaçant certains mots
  Object.entries(translations[fromLang] || {}).forEach(([key, text]) => {
    if (message.toLowerCase().includes(text.toLowerCase())) {
      const targetText = translations[toLang]?.[key] || text;
      translated = translated.replace(
        new RegExp(text, "i"),
        targetText
      );
    }
  });

  // Si aucun mot n'a été remplacé, on simule une traduction
  if (translated === message) {
    translated = `[${toLang.toUpperCase()}] ${message}`;
  }

  return translated;
};

// Détecte automatiquement la langue en se basant sur des mots-clés
export const detectLanguage = (text: string): string => {
  const langScores: Record<string, number> = { en: 0, fr: 0, es: 0, de: 0 };

  // On compte combien de mots de chaque langue sont présents dans le texte
  Object.entries(translations).forEach(([lang, dict]) => {
    Object.values(dict).forEach((keyword) => {
      if (text.toLowerCase().includes(keyword.toLowerCase())) {
        langScores[lang] += 1;
      }
    });
  });

  // On retourne la langue avec le score le plus élevé
  const bestLang = Object.entries(langScores).reduce(
    (best, [lang, score]) => (score > best.score ? { lang, score } : best),
    { lang: "en", score: 0 }
  );

  return bestLang.score > 0 ? bestLang.lang : "en";
};

export const getLanguageName = (code: string): string => {
  const langMap: Record<string, string> = {
    fr: "Français",
    en: "English",
    es: "Español",
    de: "Deutsch",
    it: "Italiano",
    pt: "Português",
    ru: "Русский",
    zh: "中文",
    ja: "日本語",
    ar: "العربية",
  };

  return langMap[code] || code;
};
