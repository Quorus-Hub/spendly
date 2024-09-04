import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import SwipeableFlatList from 'react-native-swipeable-list';
import Lottie from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

import routes from '../../config/routes';
import { Colors, Typography } from '../../styles';
import { getCurrency } from '../../utils/currency';
import { getExpenses, deleteTransaction } from '../../dbHelpers/transactionHelper';
import { getTheme } from '../../utils/theme';
import QuickActions from '../../utils/quickActions';
import TransactionCard from '../../components/Cards/TransactionCard';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Expense = ({ navigation, route }) => {
    const focused = useIsFocused();
    const { t, i18n } = route.params;

    const [currency, setCurrency] = useState({});
    const [expenses, setExpenses] = useState(null);
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
        navigation.navigate(routes.AddTransaction, { item: item });
    }

    const arrayColor = theme.darkmode ? [Colors.DARK_BLACK, Colors.BLACK, Colors.DARK_BLACK] : [Colors.GRAY_LIGHT, Colors.GRAY_THIN, Colors.GRAY_LIGHT];

    return (
        <View style={styles(theme).container}>
            {!expenses ?
                <View style={styles(theme).gpLoading}>
                    <ShimmerPlaceHolder
                        key={1}
                        LinearGradient={LinearGradient}
                        shimmerColors={arrayColor}
                        autoRun={true}
                        shimmerStyle={styles(theme).loadingLine}
                    >
                    </ShimmerPlaceHolder>
                    <ShimmerPlaceHolder
                        key={2}
                        LinearGradient={LinearGradient}
                        shimmerColors={arrayColor}
                        autoRun={true}
                        shimmerStyle={styles(theme).loadingLine}
                    >
                    </ShimmerPlaceHolder>
                    <ShimmerPlaceHolder
                        key={3}
                        LinearGradient={LinearGradient}
                        shimmerColors={arrayColor}
                        autoRun={true}
                        shimmerStyle={styles(theme).loadingLine}
                    >
                    </ShimmerPlaceHolder>
                    <ShimmerPlaceHolder
                        key={4}
                        LinearGradient={LinearGradient}
                        shimmerColors={arrayColor}
                        autoRun={true}
                        shimmerStyle={styles(theme).loadingLine}
                    >
                    </ShimmerPlaceHolder>
                </View>
                :
                expenses.length == 0 ?
                    <View style={styles(theme).emptyContainer}>
                        <Lottie style={{ width: 250 }} source={require('../../assets/JSON/search.json')} autoPlay />
                        <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.WHITE : Colors.BLACK, textAlign: 'center' }]}>{t("You don't have any expense!")}</Text>
                    </View>
                    :
                    <SwipeableFlatList
                        data={expenses}
                        maxSwipeDistance={140}
                        shouldBounceOnMount={true}
                        keyExtractor={(item, index) => index.toString()}
                        renderQuickActions={({ index, item }) => QuickActions(item, __update, __delete, theme)}
                        renderItem={({ item, index }) => {
                            return <TransactionCard currency={currency.symbol} key={index} transaction={item} theme={theme} t={t} i18n={i18n}/>
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
    loadingLine: {
        alignSelf: 'center',
        width: '90%',
        borderRadius: 15,
        height: 50,
        marginHorizontal: 20,
        textAlign: 'center',
        marginTop: 20,
    },
    gpLoading: {
        width: "100%",
        marginLeft: 10,
    }
});

export default Expense;
