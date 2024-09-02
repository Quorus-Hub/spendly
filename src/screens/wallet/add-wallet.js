import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    Pressable
} from 'react-native';

import { Colors, Typography } from '../../styles';
import { insertWallet, updateWallet } from '../../dbHelpers/walletHelper';
import { getTheme } from '../../utils/theme';
import { colors } from '../../utils/colors';
import { icons } from '../../utils/icons';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Alert from '../../components/Modal/Alert';
import Button from '../../components/Button';
import BackHeader from '../../components/Headers/BackHeader';

const AddWallet = ({ navigation, route }) => {

    const { t } = route.params;

    const [name, setName] = useState('');
    const [balance, setBalance] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [theme, setTheme] = useState({});

    useEffect(() => {
        getTheme(setTheme);
        if (route.params?.item) {
            setName(route.params.item.name);
            setBalance((route.params.item.balance).toString());
        }
    }, []);

    // Insert Wallet
    const __insert = () => {
        return insertWallet({
            name: name,
            balance: parseFloat(balance)
        });
    }

    // Update Wallet
    const __update = () => {
        console.log({
            id: route.params.item.id,
            name: name,
            balance: parseFloat(balance)
        })
        return updateWallet({
            id: route.params.item.id,
            name: name,
            balance: parseFloat(balance)
        });
    }

    // Save Wallet
    const __save = () => {
        if (route.params?.item) {
            if (__update()) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
                navigation.goBack();
            }
        }
        else {
            if (__insert()) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
                navigation.goBack();
            }
        }
    }

    const __close = () => {
        setIsVisible(false);
    }


    return (
        <View style={styles(theme).container}>
            {/* Header */}
            <BackHeader theme={theme} title={route.params?.item ? t('Edit Category') : t('New Category')} />
            {/* Modal */}
            <Alert isVisible={isVisible} msg={t('Please, write correct data.')} error={true} onClick={__close} theme={theme} t={t} />
            {/* Body */}
            <ScrollView style={styles(theme).bodyContainer} showsVerticalScrollIndicator={false}>
                <View style={styles(theme).inputContainer}>
                    <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_DARK : Colors.BLACK }]}>{t("Name")}</Text>
                    <TextInput
                        theme={theme}
                        value={name}
                        placeholder=''
                        keyboardType='default'
                        onChangeText={(text) => setName(text)}
                        style={[styles(theme).input, Typography.BODY]}
                        placeholderTextColor={theme.darkmode ? Colors.WHITE : Colors.LIGHT_BLACK} />
                </View>
                <View style={styles(theme).inputContainer}>
                    <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_DARK : Colors.BLACK }]}>{t("Balance")}</Text>
                    <TextInput
                        theme={theme}
                        value={balance}
                        placeholder=''
                        keyboardType='numeric'
                        onChangeText={(text) => setBalance(text)}
                        style={[styles(theme).input, Typography.BODY]}
                        placeholderTextColor={theme.darkmode ? Colors.WHITE : Colors.LIGHT_BLACK} />
                </View>
            
            </ScrollView>

            {/* Footer */}
            <View style={styles(theme).footerContainer}>
                <Button
                    theme={theme}
                    title={t('Save')}
                    onPress={() => __save()} />
            </View>
        </View>
    );
};

export const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.darkmode ? Colors.BLACK : Colors.GRAY_THIN
    },
    // Body
    bodyContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 10,
    },
    inputContainer: {
        marginBottom: 20,
    },
    rowColors: {
        marginTop: 10,
        flexDirection: 'row',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowIcons: {
        margin: 10,
        flexDirection: 'column',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        color: theme.darkmode ? Colors.WHITE : Colors.BLACK,
        backgroundColor: theme.darkmode ? Colors.LIGHT_BLACK : Colors.GRAY_MEDIUM
    },
    // Footer
    footerContainer: {
        padding: 20,
    },
    // Modal 
    modalContainer: {
        height: '60%',
        width: "100%",
        margin: 0,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
        backgroundColor: theme.darkmode ? Colors.BLACK : Colors.GRAY_MEDIUM,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AddWallet;
