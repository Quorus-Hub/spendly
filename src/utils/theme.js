import AsyncStorage from '@react-native-async-storage/async-storage';

// Get Theme
export const getTheme = async (setTheme) => {
    try {
        const jsonTheme= await AsyncStorage.getItem('theme');
        if(jsonTheme !== null) {
            const theme = JSON.parse(jsonTheme);
            setTheme(theme);
        }
        else {
            setTheme({darkmode: false});
        }
    } catch(error) {
        console.log(error);
    }
}

// Store Theme
export const storeTheme = async (theme) => {
    try {
        const jsonTheme = JSON.stringify(theme);
        await AsyncStorage.setItem('theme', jsonTheme);
    } catch (error) {
        console.log(error);
    }
}  