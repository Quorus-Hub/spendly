import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translation/en.json';
import pt from './translation/pt.json';
import es from './translation/es.json';
import fr from './translation/fr.json';
import it from './translation/it.json';
import gr from './translation/gr.json';

i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'gr',
    resources: {
        en: en,
        pt: pt,
        es: es,
        fr: fr,
        it: it,
        gr: gr,
    },
    react: {
        useSuspense: false,
    },
    interpolation: {
        escapeValue: false,
    }
})

export default i18n;