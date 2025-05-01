// Simple i18n utility
type Translations = {
  [key: string]: {
    [key: string]: string
  }
}

// Default translations
const translations: Translations = {
  en: {
    // General
    "app.title": "Unit Converter",
    "app.description": "Convert between different units of measurement",

    // Categories
    "category.length": "Length",
    "category.weight": "Weight",
    "category.temperature": "Temperature",
    "category.area": "Area",
    "category.volume": "Volume",

    // Form labels
    "form.category": "Category",
    "form.from": "From",
    "form.to": "To",
    "form.value": "Value",
    "form.result": "Result",

    // Other UI elements
    "formula.title": "Conversion Formula",
    "recent.title": "Recent Conversions",
    "theme.toggle": "Toggle theme",
    "units.swap": "Swap units",
  },
  // Add more languages as needed
}

// Get user's preferred language or default to English
const getLanguage = (): string => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("language") || navigator.language.split("-")[0] || "en"
  }
  return "en"
}

// Translation function
export const __ = (key: string, params: Record<string, string> = {}): string => {
  const lang = getLanguage()
  const langTranslations = translations[lang] || translations.en

  let text = langTranslations[key] || key

  // Replace parameters in the text
  Object.entries(params).forEach(([paramKey, paramValue]) => {
    text = text.replace(`{${paramKey}}`, paramValue)
  })

  return text
}

// Make __ available globally
if (typeof window !== "undefined") {
  ;(window as any).__ = __
}
