import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './translation/en.json';
import pt from './translation/pt.json';
import es from './translation/es.json';
import fr from './translation/fr.json';
import it from './translation/it.json';
import de from './translation/de.json';

i18n.use(initReactI18next).use(LanguageDetector).init({
    compatibilityJSON: 'v3',
    lng: 'en',
    resources: {
        en: en,
        pt: pt,
        es: es,
        fr: fr,
        it: it,
        de: de,
    },
    react: {
        useSuspense: false,
    },
    interpolation: {
        escapeValue: false,
    }
})

export default i18n;