import AsyncStorage from '@react-native-async-storage/async-storage';

// Get Currency
export const getCurrency = async (setCurrency) => {
    try {
        const jsonCurrency = await AsyncStorage.getItem('currency');
        if(jsonCurrency !== null) {
            const currency = JSON.parse(jsonCurrency);
            setCurrency(currency);
        }
        else {
            setCurrency(null);
        }
    } catch(error) {
        console.log(error);
    }
}

// Store Currency
export const storeCurrency = async (currency) => {
    try {
        const jsonCurrency = JSON.stringify(currency);
        await AsyncStorage.setItem('currency', jsonCurrency);
    } catch (error) {
        console.log(error);
    }
}  

// App Currencies
export const currencies = [
    {
        id: '1',
        name: 'Dollar',
        symbol: '$'
    },
    {
        id: '2',
        name: 'Euro',
        symbol: '€'
    },
    {
        id: '3',
        name: 'Real',
        symbol: 'R$'
    },
    {
        id: '4',
        name: 'Pounds Sterling',
        symbol: '£'
    },
    {
        id: '5',
        name: 'Russian Ruble',
        symbol: '₽'
    },
    {
        id: '6',
        name: 'Chinese Yuan',
        symbol: '¥ /元'
    },
    {
        id: '7',
        name: 'Indian Rupee',
        symbol: '₹'
    },
    {
        id: '8',
        name: 'Tunisian Dinar',
        symbol: 'د.ت'
    },
    {
        id: '9',
        name: 'Bitcoin',
        symbol: '₿'
    },
    {
        id: '10',
        name: 'Afghani',
        symbol: '؋'
    },
    {
        id: '11',
        name: 'Lek',
        symbol: 'Lek'
    },
    {
        id: '12',
        name: 'Peso',
        symbol: '$'
    },
    {
        id: '13',
        name: 'Aruba Guilder',
        symbol: 'ƒ'
    },
    {
        id: '14',
        name: 'Bolivia Bolíviano',
        symbol: '$b'
    },
    {
        id: '15',
        name: 'Azerbaijan Manat',
        symbol: '₼'
    },
    {
        id: '16',
        name: 'Belarus Ruble',
        symbol: 'Br'
    },
    {
        id: '17',
        name: 'Convertible Mark',
        symbol: 'KM'
    },
    {
        id: '18',
        name: 'Botswana Pula',
        symbol: 'P'
    },
    {
        id: '19',
        name: 'Bulgaria Lev',
        symbol: 'лв'
    },
    {
        id: '20',
        name: 'Cambodia Riel',
        symbol: '៛'
    },
    {
        id: '21',
        name: 'Croatia Kuna',
        symbol: 'kn'
    },
    {
        id: '22',
        name: 'Costa Rica Colon',
        symbol: '₡'
    },
    {
        id: '23',
        name: 'Czech Republic Koruna',
        symbol: '₱'
    },
    {
        id: '24',
        name: 'Cuba Peso',
        symbol: 'Kč'
    },
    {
        id: '25',
        name: 'Denmark Krone',
        symbol: 'kr'
    },
    {
        id: '26',
        name: 'Dominican Republic Peso',
        symbol: 'RD$'
    },
    {
        id: '27',
        name: 'Egypt Pound',
        symbol: '£'
    },
    {
        id: '28',
        name: 'El Salvador Colon',
        symbol: '$'
    },
    {
        id: '29',
        name: 'Pound',
        symbol: '£'
    },
    {
        id: '30',
        name: 'Ghana Cedi',
        symbol: '¢'
    },
    {
        id: '31',
        name: 'Guatemala Quetzal',
        symbol: 'Q'
    },
    {
        id: '32',
        name: 'Honduras Lempira',
        symbol: 'L'
    },
    {
        id: '33',
        name: 'Hungary Forint',
        symbol: 'Ft'
    },
    {
        id: '34',
        name: 'Iceland Krona',
        symbol: 'kr'
    },
    {
        id: '34',
        name: 'Iceland Krona',
        symbol: 'kr'
    },
    {
        id: '35',
        name: 'India Rupee',
        symbol: '₹'
    },
    {
        id: '36',
        name: 'Indonesia Rupiah',
        symbol: 'Rp'
    },
    {
        id: '37',
        name: 'Iran Rial',
        symbol: '﷼'
    },
    {
        id: '38',
        name: 'Israel Shekel',
        symbol: '₪'
    },
    {
        id: '39',
        name: 'Jamaica Dollar',
        symbol: 'J$'
    },
    {
        id: '40',
        name: 'Jamaica Dollar',
        symbol: 'J$'
    },
    {
        id: '41',
        name: 'Japan Yen',
        symbol: '¥'
    },
    {
        id: '42',
        name: 'Kazakhstan Tenge',
        symbol: 'лв'
    },
    {
        id: '43',
        name: 'Won',
        symbol: '₩'
    },
    {
        id: '44',
        name: 'Kyrgyzstan Som',
        symbol: 'лв'
    },
    {
        id: '45',
        name: 'Laos Kip',
        symbol: '₭'
    },
    {
        id: '46',
        name: 'Macedonia Denar',
        symbol: 'ден'
    },
    {
        id: '47',
        name: 'Malaysia Ringgit',
        symbol: 'RM'
    },
    {
        id: '48',
        name: 'Mauritius Rupee',
        symbol: '₨'
    },
    {
        id: '49',
        name: 'Mongolia Tughrik',
        symbol: '₮'
    },
    {
        id: '50',
        name: 'Moroccan-dirham',
        symbol: 'د.إ'
    },
    {
        id: '51',
        name: 'Mozambique Metical',
        symbol: 'MT'
    },
    {
        id: '52',
        name: 'Nepal Rupee',
        symbol: '₨'
    },
    {
        id: '53',
        name: 'Nicaragua Cordoba',
        symbol: 'C$'
    },
    {
        id: '54',
        name: 'Nigeria Naira',
        symbol: '₦'
    },
    {
        id: '55',
        name: 'Norway Krone',
        symbol: 'kr'
    },
    {
        id: '56',
        name: 'Oman Rial',
        symbol: '﷼'
    },
    {
        id: '57',
        name: 'Pakistan Rupee',
        symbol: '₨'
    },
    {
        id: '58',
        name: 'Panama Balboa',
        symbol: 'B/.'
    },
    {
        id: '59',
        name: 'Paraguay Guarani',
        symbol: 'Gs'
    },
    {
        id: '60',
        name: 'Peru Sol',
        symbol: 'S/.'
    },
    {
        id: '61',
        name: 'Poland Zloty',
        symbol: 'zł'
    },
    {
        id: '62',
        name: 'Qatar Riyal',
        symbol: '﷼'
    },
    {
        id: '63',
        name: 'Romania Leu',
        symbol: 'lei'
    },
    {
        id: '63',
        name: 'Saudi Arabia Riyal',
        symbol: '﷼'
    },
    {
        id: '64',
        name: 'Serbia Dinar',
        symbol: 'Дин.'
    },
    {
        id: '65',
        name: 'Seychelles Rupee',
        symbol: '₨'
    },
    {
        id: '66',
        name: 'Somalia Shilling',
        symbol: 'S'
    },
    {
        id: '67',
        name: 'South Africa Rand',
        symbol: 'R'
    },
    {
        id: '68',
        name: 'Sri Lanka Rupee',
        symbol: '₨'
    },
    {
        id: '69',
        name: 'Sweden Krona',
        symbol: 'kr'
    },
    {
        id: '70',
        name: 'Switzerland Franc',
        symbol: 'CHF'
    },
    {
        id: '71',
        name: 'Thailand Baht',
        symbol: '฿'
    },
    {
        id: '72',
        name: 'Trinidad and Tobago Dollar',
        symbol: 'TT$'
    },
    {
        id: '73',
        name: 'Turkey Lira',
        symbol: '₺'
    },
    {
        id: '74',
        name: 'Ukraine Hryvnia',
        symbol: '₴'
    },
    {
        id: '75',
        name: 'UAE-Dirham',
        symbol: 'د.إ'
    },
    {
        id: '76',
        name: 'Uruguay Peso',
        symbol: '$U'
    },
    {
        id: '77',
        name: 'Uzbekistan Som',
        symbol: 'лв'
    },
    {
        id: '78',
        name: 'Venezuela Bolívar',
        symbol: 'Bs'
    },
    {
        id: '79',
        name: 'Viet Nam Dong',
        symbol: '₫'
    },
    {
        id: '80',
        name: 'Yemen Rial',
        symbol: '﷼'
    },
    {
        id: '81',
        name: 'Zimbabwe Dollar',
        symbol: 'Z$'
    },
]