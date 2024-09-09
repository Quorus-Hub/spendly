import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Typography } from '../../../styles';
import moment from 'moment';
import 'moment/min/locales';


const TransactionCard = (props) => {
    const transaction = props.transaction;
    const currency = props.currency;
    const theme = props.theme;
    const t = props.t;
    const i18n = props.i18n;

    moment.locale(i18n.language);
    
    return (
        <View style={styles(theme).container}>
            <View style={[styles(theme).iconContainer, {backgroundColor: transaction.color || Colors.BLUE}]}>
                <Icon name={transaction.icon} color={theme.darkmode ? Colors.BLACK : Colors.WHITE} size={15} />
            </View>

            <View style={styles(theme).detailsContainer}>
                <Text style={[Typography.BODY, {color: theme.darkmode ? Colors.WHITE : Colors.BLACK}]}>{t(transaction.category)}</Text>
                <Text style={[Typography.TAGLINE, {color: theme.darkmode ? Colors.GRAY_DARK : Colors.BLACK}]}>{moment(transaction.transaction_date).format("LL")}</Text>
            </View>

            <Text style={[Typography.H4, transaction.type == 'income' ? {color: Colors.SUCCESS} : {color: Colors.ALERT}]}>
                {transaction.type == 'income' ? '+' : '-'}{currency} {transaction.amount}
            </Text>
        </View>
    );
};

const styles = (theme) => StyleSheet.create({
    container: {
        marginTop: 10,
        marginLeft: 20,
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.darkmode ? Colors.DARK_BLACK : Colors.GRAY_MEDIUM
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailsContainer: {
        flex: 1, 
        marginLeft: 10, 
        marginRight: 10,
        justifyContent: 'space-between'
    }
});
 
export default TransactionCard;
 