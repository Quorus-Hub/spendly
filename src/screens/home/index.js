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
import { getTransactions, getTotalIncomes, getTotalExpenses, deleteTransaction } from '../../dbHelpers/transactionHelper';

import QuickActions from '../../utils/quickActions';
import BalanceCard from '../../components/Cards/BalanceCard';
import HomeHeader from '../../components/Headers/HomeHeader';
import TransactionCard from '../../components/Cards/TransactionCard';
import BlockHeader from '../../components/Headers/BlockHeader';
import PieCard from '../../components/Cards/PieCard';
import { getTheme } from '../../utils/theme';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Home = ({ navigation, route }) => {

    const { t } = route.params;

    const focused = useIsFocused();

    const [currency, setCurrency] = useState({});
    const [totalIncomes, setTotalIncomes] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [transactions, setTransactions] = useState(null);
    const [theme, setTheme] = useState({});

    useEffect(() => {
        getTheme(setTheme);
        getTransactions(setTransactions);
        getCurrency(setCurrency);
        getTotalIncomes(setTotalIncomes);
        getTotalExpenses(setTotalExpenses);
    }, [focused]);

    // Delete Item
    const __delete = (id) => {
        deleteTransaction(id);
        getTransactions(setTransactions);
        getTotalIncomes(setTotalIncomes);
        getTotalExpenses(setTotalExpenses);
    }

    // Update Item
    const __update = (item) => {
        navigation.navigate(routes.AddTransaction, { item: item });
    }

    const arrayColor = theme.darkmode ? [Colors.DARK_BLACK, Colors.BLACK, Colors.DARK_BLACK] : [Colors.GRAY_LIGHT, Colors.GRAY_THIN, Colors.GRAY_LIGHT];

    return (
        <View style={styles(theme).container}>
            {/* Header */}
            <HomeHeader theme={theme} t={t} />
            {/* Body */}
            <View style={styles(theme).bodyContainer}>
                {transactions ?
                    <SwipeableFlatList
                        data={transactions.slice(0, 5)}
                        maxSwipeDistance={140}
                        shouldBounceOnMount={true}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderQuickActions={({ index, item }) => QuickActions(item, __update, __delete, theme)}
                        ListHeaderComponent={() => {
                            return (
                                <View>
                                    {/* // Balance */}
                                    <View style={{ paddingLeft: 20, paddingTop: 10 }}>
                                        <BalanceCard currency={currency.symbol} incomes={totalIncomes} expenses={totalExpenses} theme={theme} t={t}/>
                                    </View>
                                    <View style={{ paddingLeft: 20 }}>
                                        <BlockHeader
                                            t={t}
                                            theme={theme}
                                            title={t('Transactions')}
                                            onPress={() => navigation.navigate(routes.Transactions)} />
                                    </View>
                                </View>
                            )
                        }}
                        ListEmptyComponent={() => {
                            return (
                                <View style={styles(theme).emptyContainer}>
                                    <Lottie style={{ width: 250 }} source={require('../../assets/JSON/search.json')} autoPlay />
                                    <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.WHITE : Colors.BLACK, textAlign: 'center' }]}>{t("You don't have any transactions!")}</Text>
                                </View>
                            )
                        }}
                        renderItem={({ item, index }) => {
                            return <TransactionCard currency={currency.symbol} key={index} transaction={item} theme={theme} t={t} />
                        }}
                    // ListFooterComponent={() => {
                    //     return (
                    //         // Statistics
                    //         <View style={{ paddingLeft: 20, marginBottom: 20 }}>
                    //             <BlockHeader title='Statistics' theme={theme} />
                    //             <PieCard incomes={totalIncomes} expenses={totalExpenses} theme={theme} />
                    //         </View>
                    //     )
                    // }}
                    />
                    :
                    <View style={styles(theme).gpLoading}>
                        <ShimmerPlaceHolder
                            key={1}
                            LinearGradient={LinearGradient}
                            shimmerColors={arrayColor}
                            autoRun={true}
                            shimmerStyle={styles(theme).loading}
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
                }
            </View>
        </View >
    );
};

export const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
    },
    // Body
    bodyContainer: {
        flex: 1,
        padding: 20,
        paddingLeft: 0,
        paddingBottom: 0,
        display: 'flex',
        backgroundColor: theme.darkmode ? Colors.BLACK : Colors.GRAY_THIN,
    },
    emptyContainer: {
        alignItems: "center",
        padding: 20
    },
    loading: {
        width: '90%',
        borderRadius: 15,
        height: 150,
        marginHorizontal: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    loadingLine: {
        alignSelf: 'center',
        width: '90%',
        borderRadius: 15,
        height: 50,
        marginHorizontal: 20,
        textAlign: 'center',
        marginBottom: 20,
    },
    gpLoading: {
        width: "100%",
        marginLeft: 10,
    }
});

export default Home;
