import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import { Colors, Typography } from '../../../styles';

const BalanceCard = (props) => {
    const incomes = props.incomes;
    const expenses = props.expenses;
    const theme = props.theme;
    const balance = incomes - expenses;

    return (
        <View style={styles(theme).container}>
            <View style={styles(theme).tagContainer}></View>
            <View style={styles(theme).blockContainer}>
                <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_THIN : Colors.BLACK, marginBottom: 10 }]}>My Balance</Text>
                <Text style={[Typography.H1, { color: theme.darkmode ? Colors.WHITE : Colors.BLACK }]}>{props.currency} {balance}</Text>
            </View>

            {/* <View style={styles(theme).barContainer}></View> */}

            {/* <View style={styles(theme).blockContainer}>
                <Text style={[Typography.TAGLINE, {color: Colors.GRAY_THIN, marginBottom: 10}]}>Total Payout</Text>
                <Text style={[Typography.H1, {color: Colors.WHITE}]}>{props.currency} {expenses}</Text>
            </View> */}
        </View>
    );
};

const styles = (theme) => StyleSheet.create({
    container: {
        borderRadius: 16,
        flexDirection: 'row',
        backgroundColor: theme.darkmode ? Colors.DARK_BLACK : Colors.GRAY_MEDIUM
    },
    barContainer: {
        width: 0.5,
        backgroundColor: Colors.WHITE
    },
    tagContainer: {
        marginTop: 10,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 16,
        height: 80,
        marginLeft: 20,
        width: 4,
        backgroundColor: theme.darkmode ? Colors.WHITE : Colors.PRIMARY
    },
    blockContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 30,
        paddingBottom: 30
    }
});

export default BalanceCard;
