import AsyncStorage from '@react-native-async-storage/async-storage';

// Get Currency
export const getWallet = async (setWallet) => {
    try {
        const jsonWallet = await AsyncStorage.getItem('wallet');
        if(jsonWallet !== null) {
            const currency = JSON.parse(jsonWallet);
            setWallet(currency);
        }
        else {
            setWallet(null);
        }
    } catch(error) {
        console.log(error);
    }
}

// Store Wallet
export const storeWallet = async (wallet) => {
    try {
        const jsonWallet = JSON.stringify(wallet);
        await AsyncStorage.setItem('wallet', jsonWallet);
    } catch (error) {
        console.log(error);
    }
}  


export const wallets = [
    {
        id: '1',
        name: 'Wallet',
        balance: 0,
    }
]