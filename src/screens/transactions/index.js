import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getTheme } from '../../utils/theme';

import routes from '../../config/routes';
import { Colors, Typography } from '../../styles';
import { getTransactions, deleteTransaction } from '../../dbHelpers/transactionHelper';

import Income from './income';
import Expense from './expense';

// Top Tabs
const Tab = createMaterialTopTabNavigator();

function TopTabs(props) {

    const theme = props.theme;
    const t = props.t;
    const i18n = props.i18n;


    return (
        <Tab.Navigator
            screenOptions={{
                lazy: true,
                tabBarActiveTintColor: Colors.PRIMARY,
                tabBarLabelStyle: [Typography.TAGLINE, { color: theme.darkmode ? Colors.WHITE : Colors.DARK_BLACK }],
                tabBarStyle: {
                    backgroundColor: theme.darkmode ? Colors.BLACK : Colors.GRAY_THIN,
                },
                tabBarIndicatorStyle: {
                    backgroundColor: Colors.PRIMARY
                },
                swipeEnabled: false,
                animationEnabled: true,
            }}>
            <Tab.Screen name={routes.Income} options={{ tabBarLabel: t('Income') }} component={Income} initialParams={{ t: t, i18n: i18n }}/>
            <Tab.Screen name={routes.Expense} options={{ tabBarLabel: t('Expence') }} component={Expense} initialParams={{ t: t, i18n: i18n }} />
        </Tab.Navigator>
    );
}

const Transactions = ({ navigation, route }) => {

    const [theme, setTheme] = useState({});

    const { t, i18n } = route.params;

    useEffect(() => {
        getTheme(setTheme)
    }, [theme]);

    return (
        <View style={styles(theme).container}>
            {/* Header */}
            <View style={styles(theme).headerContainer}>
                <Text style={[Typography.H1, { color: theme.darkmode ? Colors.WHITE : Colors.BLACK, marginBottom: 10 }]}>{t("Transactions")}</Text>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles(theme).iconContainer}
                    onPress={() => navigation.navigate(routes.AddTransaction)}>
                    <Icon name="plus" color={Colors.WHITE} size={15} />
                </TouchableOpacity>
            </View>

            {/* Body */}
            <View style={{ flex: 1 }}>
                <TopTabs theme={theme} t={t} i18n={i18n}/>
            </View>
        </View>
    );
};

export const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.darkmode ? Colors.BLACK : Colors.GRAY_THIN
    },
    // Header
    headerContainer: {
        padding: 20,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.darkmode ? Colors.LIGHT_BLACK : Colors.PRIMARY
    },
});

export default Transactions;
