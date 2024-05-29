import AsyncStorage from '@react-native-async-storage/async-storage';

// Get Language
export const getLanguage = async (setLanguage) => {
    try {
        const jsonLanguage = await AsyncStorage.getItem('language');
        if(jsonLanguage !== null) {
            const language = JSON.parse(jsonLanguage);
            setLanguage(language);
        }
        else {
            setLanguage(null);
        }
    } catch(error) {
        console.log(error);
    }
}

// Store Language
export const storeLanguage = async (language) => {
    try {
        const jsonLanguage = JSON.stringify(language);
        await AsyncStorage.setItem('language', jsonLanguage);
    } catch (error) {
        console.log(error);
    }
}  

// App Languages
export const languages = [
    {
        id: '1',
        name: 'English',
        symbol: 'en'
    },
    {
        id: '2',
        name: 'Portuguese',
        symbol: 'pt'
    },
    {
        id: '3',
        name: 'Spanish',
        symbol: 'es'
    },
    {
        id: '4',
        name: 'Italian',
        symbol: 'it'
    },
    {
        id: '5',
        name: 'French',
        symbol: 'fr'
    },
    {
        id: '6',
        name: 'German',
        symbol: 'ge'
    }
]

