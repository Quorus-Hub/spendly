import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import { Colors, Typography } from '../../../styles';

const MoneyBoxCard = (props) => {
    const t = props.t;
    const item = props.item;
    const currency = props.currency;
    const calc = (item.collected / item.total) * 100;
    const progress = calc >= 100 ? 100 : calc;
    const theme = props.theme;

    return (
        <View style={styles(theme).container}>
            <Text style={[Typography.H3, { color: theme.darkmode ? Colors.WHITE : Colors.BLACK, marginBottom: 5 }]}>{item.name}</Text>
            <Text style={[Typography.TAGLINE, { marginBottom: 20, textAlign: 'left' }]}>
                <Text style={{ color: theme.darkmode ? Colors.GRAY_THIN : Colors.BLACK }}>{currency} {item.collected} / {item.total} </Text>
                {item.collected == item.total ?
                    <Text style={{ color: Colors.SUCCESS }}>{t("collected")}</Text>
                    : null}
            </Text>

            {/* Progress Bar */}
            <View style={[styles(theme).progressBarContainer, item.collected == item.total ? { borderColor: Colors.SUCCESS } : { borderColor: Colors.PRIMARY }]}>
                <View style={[styles(theme).progressBar, { width: progress + '%' }, item.collected == item.total ? { backgroundColor: Colors.SUCCESS } : { backgroundColor: Colors.PRIMARY }]}></View>
            </View>
        </View>
    );
};

const styles = (theme) => StyleSheet.create({
    container: {
        padding: 20,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 0,
        borderRadius: 15,
        backgroundColor: theme.darkmode ? Colors.DARK_BLACK : Colors.GRAY_MEDIUM
    },
    progressBarContainer: {
        borderWidth: 1,
        borderRadius: 5,
    },
    progressBar: {
        padding: 3,
        borderRadius: 3
    }
});

export default MoneyBoxCard;
