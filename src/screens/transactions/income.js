import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import SwipeableFlatList from 'react-native-swipeable-list';
import Lottie from 'lottie-react-native';

import routes from '../../config/routes';
import { Colors, Typography } from '../../styles';
import { getCurrency } from '../../utils/currency';
import { getIncomes, deleteTransaction } from '../../dbHelpers/transactionHelper';
import { getTheme } from '../../utils/theme';
import QuickActions from '../../utils/quickActions';
import TransactionCard from '../../components/Cards/TransactionCard';

const Income = ({navigation, route}) => {
    const focused = useIsFocused();

    const [currency, setCurrency] = useState({});
    const [incomes, setIncomes] = useState([]);
    const [theme, setTheme] = useState({});
    
    useEffect(() => {
        getTheme(setTheme)
        getCurrency(setCurrency);
        getIncomes(setIncomes);
    }, [focused]);

    // Delete Item
    const __delete = (id) => {
        deleteTransaction(id);
        getIncomes(setIncomes);
    }

    // Update Item
    const __update = (item) => {
        navigation.navigate(routes.AddTransaction, {item: item});
    }

    return (
        <View style={styles(theme).container}>
            {incomes.length == 0 ?
                <View style={styles(theme).emptyContainer}>
                    <Lottie style={{ width: 250 }} source={require('../../assets/JSON/search.json')} autoPlay />
                    <Text style={[Typography.TAGLINE, {color: theme.darkmode ? Colors.WHITE : Colors.BLACK, textAlign: 'center'}]}>You don't have any income !</Text>
                </View>
            :
                <SwipeableFlatList
                    data={incomes}
                    maxSwipeDistance={140}
                    shouldBounceOnMount={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderQuickActions={({index, item}) => QuickActions(item, __update, __delete, theme)}
                    renderItem={({item, index}) => {
                        return <TransactionCard currency={currency.symbol} key={index} theme={theme} transaction={item}/>
                    }}
                />
            }
        </View>
    );
};

export const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: 20,
        backgroundColor: theme.darkmode ? Colors.BLACK : Colors.GRAY_THIN
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
 
export default Income;
 