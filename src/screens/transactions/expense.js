import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import SwipeableFlatList from 'react-native-swipeable-list';

import routes from '../../config/routes';
import { Colors, Typography } from '../../styles';
import { getCurrency } from '../../utils/currency';
import { getExpenses, deleteTransaction } from '../../dbHelpers/transactionHelper';
import { getTheme } from '../../utils/theme';
import QuickActions from '../../utils/quickActions';
import TransactionCard from '../../components/Cards/TransactionCard';

const Expense = ({navigation}) => {
    const focused = useIsFocused();

    const [currency, setCurrency] = useState({});
    const [expenses, setExpenses] = useState([]);
    const [theme, setTheme] = useState({});
    
    useEffect(() => {
        getTheme(setTheme);
        getCurrency(setCurrency);
        getExpenses(setExpenses);
    }, [focused]);

    // Delete Item
    const __delete = (id) => {
        deleteTransaction(id);
        getExpenses(setExpenses);
    }

    // Update Item
    const __update = (item) => {
        navigation.navigate(routes.AddTransaction, {item: item});
    }

    return (
        <View style={styles(theme).container}>
            {expenses.length == 0 ?
                <View style={styles(theme).emptyContainer}>
                    <Text style={[Typography.BODY, {color: theme.darkmode ? Colors.WHITE : Colors.BLACK, textAlign: 'center'}]}>You don't have any expense !</Text>
                </View>
            :
                <SwipeableFlatList
                    data={expenses}
                    maxSwipeDistance={140}
                    shouldBounceOnMount={true}
                    keyExtractor={(item, index) => index.toString()}
                    renderQuickActions={({index, item}) => QuickActions(item, __update, __delete, theme)}
                    renderItem={({item, index}) => {
                        return <TransactionCard currency={currency.symbol} key={index} transaction={item}  theme={theme} />
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
 
export default Expense;
 