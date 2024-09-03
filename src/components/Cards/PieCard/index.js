import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CircularProgress from '../../CircularProgress';

import { Colors, Typography } from '../../../styles';

const PieCard = (props) => {
    const incomes = props.incomes;
    const expenses = props.expenses;
    const theme = props.theme;

    const payoutPercent = incomes == 0 && expenses == 0 ? 0 : incomes == 0 ? 100 : ((expenses / incomes) * 100).toFixed(2);
    const savedPercent = incomes == 0 && expenses == 0 ? 0 : (100 - payoutPercent).toFixed(2);

    return (
        <View style={styles(theme).container}>
            <View style={styles.pieContainer}>
                <CircularProgress percent={payoutPercent} theme={theme} />
            </View>
            <View style={styles(theme).numbersContainer}>
                <View style={styles(theme).rowContainer}>
                    <Icon name="circle" size={15} color={ theme.darkmode ? Colors.GRAY_LIGHT : Colors.GRAY_DARK} />
                    <Text style={[Typography.BODY, { marginLeft: 5, color: theme.darkmode ? Colors.GRAY_LIGHT : Colors.GRAY_DARK }]}>Expenses({payoutPercent}%)</Text>
                </View>
                <View style={styles(theme).rowContainer}>
                    <Icon name="circle" size={15} color={theme.darkmode ? Colors.GRAY_BLUE : Colors.BLUE} />
                    <Text style={[Typography.BODY, { marginLeft: 5, color: theme.darkmode ? Colors.GRAY_BLUE : Colors.BLUE }]}>Balance ({savedPercent}%)</Text>
                </View>
            </View>
        </View>
    );
};

const styles = (theme) => StyleSheet.create({
    container: {
        marginTop: 10,
        paddingHorizontal: 20,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: theme.darkmode ? Colors.DARK_BLACK : Colors.GRAY_MEDIUM
    },
    pieContainer: {
        padding: 15
    },
    numbersContainer: {
        flex: 1,
        padding: 0,
        paddingLeft: 10,
        justifyContent: 'center',
    },
    rowContainer: {
        marginTop: 5,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
});

export default PieCard;
