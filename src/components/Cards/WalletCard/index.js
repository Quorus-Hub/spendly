import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Typography } from '../../../styles';

const WalletCard = (props) => {
    const wallet = props.wallet;
    const theme = props.theme;
    const t = props.t;

    return (
        <View style={styles(theme).container}>
            <View style={[styles(theme).iconContainer, {backgroundColor: Colors.BLUE}]}>
                <Icon name={'wallet'} color={theme.darkmode ? Colors.BLACK : Colors.WHITE} size={15} />
            </View>

            <View style={styles(theme).detailsContainer}>
                <Text style={[Typography.BODY, {color: theme.darkmode ? Colors.WHITE : Colors.BLACK}]}>{t(wallet.name)}</Text>
            </View>
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
 
export default WalletCard;
 