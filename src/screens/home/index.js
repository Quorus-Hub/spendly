import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Pressable,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import SwipeableFlatList from 'react-native-swipeable-list';
import Lottie from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

import routes from '../../config/routes';
import { Colors, Typography } from '../../styles';
import { getCurrency } from '../../utils/currency';
import { getTransactionsMonth, getTotalIncomes, getTotalExpenses, deleteTransaction, getTotalIncomesBalance, getTotalExpensesBalance } from '../../dbHelpers/transactionHelper';
import { getWallet as getWallets } from "../../dbHelpers/walletHelper";
import QuickActions from '../../utils/quickActions';

import Bar from '../../components/Bar';
import BalanceCard from '../../components/Cards/BalanceCard';
import HomeHeader from '../../components/Headers/HomeHeader';
import TransactionCard from '../../components/Cards/TransactionCard';
import BlockHeader from '../../components/Headers/BlockHeader';
import PieCard from '../../components/Cards/PieCard';
import Modal from "react-native-modal";
import { getTheme } from '../../utils/theme';
import { dateRange } from './../../utils/functions';
import moment from 'moment';
import 'moment/min/locales';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Home = ({ navigation, route }) => {

    const { t, i18n } = route.params;

    moment.locale(i18n.language);

    const focused = useIsFocused();
    const today = moment().format('MMMM/YYYY');
    const date = moment().format('YYYY-MM-DD');
    const arr = { name: today, date: date };

    const [currentDate, setCurrentDate] = useState(arr);
    const [wallets, setWallets] = useState([]);
    const [listDate, setListDate] = useState([]);
    const [modal, setModal] = useState(false);
    const [currency, setCurrency] = useState({});
    const [totalIncomes, setTotalIncomes] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalIncomesBalance, setTotalIncomesBalance] = useState(0);
    const [totalExpensesBalance, setTotalExpensesBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [theme, setTheme] = useState({});

    useEffect(() => {
        const startDate = moment("01/01/2023").format('YYYY-MM-DD');
        const today = moment().format('YYYY-MM-DD');
        setListDate(dateRange(startDate, today, i18n));
        getWallets(setWallets);
        getTheme(setTheme);
        if (wallets.length > 0) {
            __getDate(wallets, currentDate);
        }
    }, [focused]);

    const __getDate = (wallets, currentDate) => {
        getTransactionsMonth(setTransactions, currentDate.date);
        getCurrency(setCurrency);
        if (wallets.length > 0) {
            getTotalIncomes(setTotalIncomes, wallets[0].id, currentDate.date);
            getTotalExpenses(setTotalExpenses, wallets[0].id, currentDate.date);
            getTotalIncomesBalance(setTotalIncomesBalance, wallets[0].id);
            getTotalExpensesBalance(setTotalExpensesBalance, wallets[0].id);
        }
    }

    // Delete Item
    const __delete = (id) => {
        deleteTransaction(id);
        getTransactionsMonth(setTransactions, currentDate.date);
        if (wallets.length > 0) {
            getTotalIncomes(setTotalIncomes, wallets[0].id, currentDate.date);
            getTotalExpenses(setTotalExpenses, wallets[0].id, currentDate.date);
            getTotalIncomesBalance(setTotalIncomesBalance, wallets[0].id);
            getTotalExpensesBalance(setTotalExpensesBalance, wallets[0].id);
        }
    }

    // Update Item
    const __update = (item) => {
        navigation.navigate(routes.AddTransaction, { item: item });
    }

    // Toggle Modal
    const __toggleModal = () => {
        setModal(!modal);
    };

    const __change = (item) => {
        setCurrentDate(item);
        setModal(!modal);
        setTransactions(null);
        __getDate(wallets, item)
    };


    const arrayColor = theme.darkmode ? [Colors.DARK_BLACK, Colors.BLACK, Colors.DARK_BLACK] : [Colors.GRAY_LIGHT, Colors.GRAY_THIN, Colors.GRAY_LIGHT];

    return (
        <View style={styles(theme).container}>
            {/* Header */}
            <HomeHeader theme={theme} t={t} />
            {/* Month Modal */}
            <Modal
                useNativeDriverForBackdrop
                swipeDirection={['down']}
                isVisible={modal}
                onBackButtonPress={() => { __toggleModal(); }}
                onBackdropPress={() => { __toggleModal(); }}
                style={{
                    justifyContent: 'flex-end',
                    margin: 0,
                }}
            >
                <View>
                    <ScrollView style={styles(theme).modalContainer} showsVerticalScrollIndicator={false} >
                        {listDate.map((item, index) => (
                            <View key={index} >
                                <Pressable style={styles(theme).rowContainer} onPress={() => __change(item)} >
                                    <Text style={[Typography.BODY, { color: theme.darkmode ? Colors.WHITE : Colors.BLACK }]}>{item.name[0].toUpperCase() + item.name.substring(1)}</Text>
                                </Pressable>
                                <Bar padding={0.2} color={Colors.GRAY_DARK} />
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </Modal>
            {/* Body */}
            <View style={styles(theme).bodyContainer}>
                {transactions ?
                    <>
                        <View style={styles(theme).inputContainer}>
                            <TouchableOpacity
                                onPress={() => setShowColor(true)}
                                style={[styles(theme).input, { paddingLeft: 20, paddingTop: 15, paddingBottom: 15 }]}>
                                <View>
                                    <Pressable style={styles(theme).rowContainer} onPress={() => setModal(true)} >
                                        <Text style={[Typography.BODY, { color: theme.darkmode ? Colors.WHITE : Colors.LIGHT_BLACK }]}>{currentDate.name[0].toUpperCase() + currentDate.name.substring(1)}</Text>
                                        <Icon name="arrow-down" color={Colors.PRIMARY} size={16} />
                                    </Pressable>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <SwipeableFlatList
                            data={transactions.slice(0, 3)}
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
                                            <BalanceCard currency={currency.symbol} incomes={totalIncomesBalance} expenses={totalExpensesBalance} theme={theme} t={t} />
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
                                return <TransactionCard currency={currency.symbol} key={index} transaction={item} theme={theme} t={t} i18n={i18n} />
                            }}

                            ListFooterComponent={() => {
                                return (
                                    (totalIncomes == 0 && totalExpenses == 0) ?
                                        <></>
                                        :
                                        // Statistics
                                        <View style={{ paddingLeft: 20, marginBottom: 20 }}>
                                            <BlockHeader t={t} title={t('Statistics')} theme={theme} onPress={() => navigation.navigate(routes.Statistics)} />
                                            <PieCard incomes={totalIncomes} expenses={totalExpenses} theme={theme} t={t} />
                                        </View>
                                )
                            }}
                        />
                    </>
                    :
                    <View style={styles(theme).gpLoading}>
                        <ShimmerPlaceHolder
                            key={0}
                            LinearGradient={LinearGradient}
                            shimmerColors={arrayColor}
                            autoRun={true}
                            shimmerStyle={styles(theme).loadingLine}
                        >
                        </ShimmerPlaceHolder>
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
    inputContainer: {
        marginBottom: 20,
    },
    rowContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        padding: 10,
        marginLeft: 20,
        marginTop: 10,
        borderRadius: 10,
        color: theme.darkmode ? Colors.WHITE : Colors.BLACK,
        backgroundColor: theme.darkmode ? Colors.DARK_BLACK : Colors.GRAY_MEDIUM
    },
    // Body,
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
    },
    // Modal 
    modalContainer: {
        height: '65%',
        margin: 0,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
        backgroundColor: theme.darkmode ? Colors.BLACK : Colors.GRAY_MEDIUM
    },
});

export default Home;
