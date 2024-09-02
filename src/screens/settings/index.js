import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
    Pressable,
    Linking,
    Switch
} from 'react-native';
import Modal from "react-native-modal";
import Question from "../../components/Modal/Question";
import Pricing from "../../components/Modal/Pricing";

import { Colors, Typography } from '../../styles';
import AuthContext from '../../context/AuthContext';

import Bar from '../../components/Bar';
import { currencies, getCurrency, storeCurrency } from '../../utils/currency';
import { languages, getLanguage, storeLanguage } from '../../utils/language';
import { getTheme, storeTheme } from '../../utils/theme';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Lottie from 'lottie-react-native';

const Settings = ({ navigation, route }) => {
    const { state, authContext } = React.useContext(AuthContext);

    const { t, i18n } = route.params;

    // Get User
    const user = state.user != null ? state.user.length > 0 ? JSON.parse(state.user) : state.user : { name: '', joined: Date.now() };
    const date = new Date(user.joined);

    const [currency, setCurrency] = useState({});
    const [language, setLanguage] = useState({});
    const [currencyModal, setCurrencyModal] = useState(false);
    const [languageModal, setLanguageModal] = useState(false);
    const [theme, setTheme] = useState({});
    const [msg, setMsg] = useState('');
    const [msgDelete, setMsgDelete] = useState('');
    const [msgQuit, setMsgQuit] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleAccount, setIsVisibleAccount] = useState(false);
    const [isVisibleQuit, setIsVisibleQuit] = useState(false);
    const [isVisibleUp, setIsVisibleUp] = useState(false);
    const [error, setError] = useState(false);
    const versionApp = DeviceInfo.getVersion();

    useEffect(() => {
        getCurrency(setCurrency);
        getLanguage(setLanguage);
        getTheme(setTheme);
    }, []);

    // Toggle Currency Modal
    const __toggleCurrencyModal = () => {
        setCurrencyModal(!currencyModal);
    };

    // Toggle Language Modal
    const __toggleLanguageModal = () => {
        setLanguageModal(!languageModal);
    };


    // Toggle Darkmode / Expense Switch
    const __toggleDarkmodeSwitch = (event) => {
        console.log(event)
        setTheme({ darkmode: event });
        storeTheme({ darkmode: event })
    }

    const __redirectCategory = () => {
        navigation.navigate('Category', { navigation, route })
    }

    const __redirectWallets = () => {
        navigation.navigate('Wallet', { navigation, route })
    }


    // Change Currency
    const __changeCurrency = (currency) => {
        setCurrency(currency);
        storeCurrency(currency);
        __toggleCurrencyModal();
    };

    // Change Language
    const __changeLanguage = (language) => {
        setLanguage(language);
        storeLanguage(language);
        __toggleLanguageModal();
        i18n.changeLanguage(language.symbol);
    };

    const __signOut = async () => {
        await setMsgQuit(t('Are you sure you want to quit?'))
        await setError(false);
        await setIsVisibleQuit(true);
    }

    const __openDelete = async () => {
        await setMsg(t('Are you sure you want to reset your account?'))
        await setError(true);
        await setIsVisible(true);
    }

    const __openDeleteAccount = async () => {
        await setMsgDelete(t('Are you sure you want to delete your account?'))
        await setError(true);
        await setIsVisibleAccount(true);
    }

    const __deleteData = async () => {
        await setIsVisible(false);
        await authContext.deleteData();
    }

    const __deleteAccountData = async () => {
        await setIsVisibleAccount(false);
        await authContext.deleteAccount();
    }

    const __quit = () => {
        authContext.signOut();
    }

    const __close = () => {
        setIsVisible(false);
    }


    const __closeQuit = () => {
        setIsVisibleQuit(false);
    }

    const __closeDelete = () => {
        setIsVisibleAccount(false);
    }

    const __closeUp = () => {
        setIsVisibleUp(false);
    }


    return (
        <View style={{ flex: 1 }}>
            {/* Modal Quit */}
            <Question isVisible={isVisibleQuit} msg={msgQuit} onClick={__quit} onClose={__closeQuit} theme={theme} t={t} />
            {/* Modal Delete Account*/}
            <Question isVisible={isVisibleAccount} msg={msgDelete} onClick={__deleteAccountData} onClose={__closeDelete} theme={theme} t={t} />
            {/* Modal */}
            <Question isVisible={isVisible} msg={msg} onClick={__deleteData} onClose={__close} theme={theme} t={t} />
            {/* Update */}
            <Pricing isVisible={isVisibleUp} onClose={__closeUp} theme={theme} t={t} />
            {/* Currency Modal */}
            <Modal
                useNativeDriverForBackdrop
                swipeDirection={['down']}
                isVisible={currencyModal}
                onBackButtonPress={() => { __toggleCurrencyModal(); }}
                onBackdropPress={() => { __toggleCurrencyModal(); }}
                style={{
                    justifyContent: 'flex-end',
                    margin: 0,
                }}
            >
                <View>
                    <ScrollView style={styles(theme).modalContainer} showsVerticalScrollIndicator={false} >
                        {currencies.map((item, index) => (
                            <View key={index} >
                                <Pressable style={styles(theme).rowContainer} onPress={() => __changeCurrency(item)} >
                                    <Text style={[Typography.BODY, { color: theme.darkmode ? Colors.WHITE : Colors.BLACK }]}>{item.name}</Text>
                                    <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.WHITE : Colors.BLACK }]}>{item.symbol}</Text>
                                </Pressable>
                                <Bar padding={0.2} color={Colors.GRAY_DARK} />
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </Modal>
            {/* Language Modal */}
            <Modal
                useNativeDriverForBackdrop
                swipeDirection={['down']}
                isVisible={languageModal}
                onBackButtonPress={() => { __toggleLanguageModal(); }}
                onBackdropPress={() => { __toggleLanguageModal(); }}
                style={{
                    justifyContent: 'flex-end',
                    margin: 0,
                }}
            >
                <View>
                    <ScrollView style={styles(theme).modalContainer} showsVerticalScrollIndicator={false} >
                        {languages.map((item, index) => (
                            <View key={index} >
                                <Pressable style={styles(theme).rowContainer} onPress={() => __changeLanguage(item)} >
                                    <Text style={[Typography.BODY, { color: theme.darkmode ? Colors.WHITE : Colors.BLACK }]}>{t(item.name)}</Text>
                                    {/* <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.WHITE : Colors.BLACK }]}>{item.symbol}</Text> */}
                                </Pressable>
                                <Bar padding={0.2} color={Colors.GRAY_DARK} />
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </Modal>
            {/* Setting Screen */}
            <ScrollView showsVerticalScrollIndicator={false} style={styles(theme).container}>
                {/* Header */}
                <View style={styles(theme).headerContainer}>
                    <Text style={[Typography.H1, { color: theme.darkmode ? Colors.WHITE : Colors.BLACK, marginBottom: 10 }]}>{t("Settings")}</Text>
                </View>

                {/* Body */}
                <View style={styles(theme).bodyContainer}>
                    {/* Account */}
                    <View>
                        <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_MEDIUM : Colors.BLACK, marginBottom: 10 }]}>{t("Account")}</Text>
                        <View style={styles(theme).blockContainer}>
                            {/* Name */}
                            <View style={styles(theme).rowContainer}>
                                <Text style={[Typography.BODY, { color: theme.darkmode ? Colors.WHITE : Colors.BLACK }]}>{t("Name")}</Text>
                                <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_MEDIUM : Colors.BLACK }]}>{user.name}</Text>
                            </View>
                            <Bar padding={0.3} color={Colors.GRAY_THIN} />
                            {/* Joined at */}
                            {/* <View style={styles(theme).rowContainer}>
                                <Text style={[Typography.BODY, { color: theme.darkmode ? Colors.WHITE : Colors.BLACK }]}>Joined</Text>
                                <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_MEDIUM : Colors.BLACK }]}>{date.toDateString()}</Text>
                            </View> */}
                            <Bar padding={0.3} color={Colors.GRAY_THIN} />
                            {/* Update */}
                            {/* <Pressable style={styles(theme).rowContainer} onPress={() => setIsVisibleUp(true)} >
                                <Text style={[Typography.BODY, { color: Colors.PRIMARY }]}>{t("Update now!")}</Text>
                                <Icon name="arrow-up-circle" color={Colors.PRIMARY} size={15} />
                            </Pressable> */}
                        </View>
                    </View>

                    {/* App setting */}
                    <View style={{ marginTop: 20 }}>
                        <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_MEDIUM : Colors.BLACK, marginBottom: 10 }]}>{t("App Settings")}</Text>
                        <View style={styles(theme).blockContainer}>
                            <Pressable
                                style={styles(theme).rowContainer}
                                onPress={() => __toggleCurrencyModal()}>
                                <Text style={[Typography.BODY, { color: theme.darkmode ? Colors.WHITE : Colors.BLACK }]}>{t("Currency")}</Text>
                                <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_MEDIUM : Colors.BLACK }]}>{currency.name} ({currency.symbol})</Text>
                            </Pressable>
                            <Bar padding={0.3} color={Colors.GRAY_THIN} />
                            <TouchableOpacity
                                onPress={() => __toggleLanguageModal()}
                                activeOpacity={0.8}
                                style={styles(theme).rowContainer}>
                                <Text style={[Typography.BODY, { color: theme.darkmode ? Colors.WHITE : Colors.BLACK }]}>{t("Language")}</Text>
                                <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_MEDIUM : Colors.BLACK }]}>{t(language.name)}</Text>
                            </TouchableOpacity>
                            <Bar padding={0.3} color={Colors.GRAY_THIN} />
                            <TouchableOpacity
                                onPress={() => __redirectWallets()}
                                activeOpacity={0.8}
                                style={styles(theme).rowContainer}>
                                <Text style={[Typography.BODY, { color: theme.darkmode ? Colors.WHITE : Colors.BLACK }]}>{t("Wallets")}</Text>
                            </TouchableOpacity>
                            <Bar padding={0.3} color={Colors.GRAY_THIN} />
                            <TouchableOpacity
                                onPress={() => __redirectCategory()}
                                activeOpacity={0.8}
                                style={styles(theme).rowContainer}>
                                <Text style={[Typography.BODY, { color: theme.darkmode ? Colors.WHITE : Colors.BLACK }]}>{t("Categories")}</Text>
                            </TouchableOpacity>
                            <Bar padding={0.3} color={Colors.GRAY_THIN} />
                            <Pressable style={styles(theme).rowContainer}>
                                <Text style={[Typography.BODY, { color: theme.darkmode ? Colors.WHITE : Colors.BLACK }]}>{t("Darkmode")}</Text>
                                <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_MEDIUM : Colors.BLACK }]}>
                                    <Switch
                                        trackColor={{ false: Colors.WHITE, true: Colors.PRIMARY }}
                                        thumbColor={theme.darkmode ? Colors.PRIMARY : Colors.PRIMARY}
                                        ios_backgroundColor="#3e3e3e"
                                        onValueChange={__toggleDarkmodeSwitch}
                                        value={theme.darkmode ? theme.darkmode : false}
                                    />
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    {/* More */}
                    <View style={{ marginTop: 20 }}>
                        <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_MEDIUM : Colors.BLACK, marginBottom: 10 }]}>{t("More")}</Text>
                        <View style={styles(theme).blockContainer}>
                            <Pressable style={styles(theme).rowContainer}>
                                <Text style={[Typography.BODY, { color: theme.darkmode ? Colors.WHITE : Colors.BLACK }]}>{t("Version")}</Text>
                                <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_MEDIUM : Colors.BLACK }]}>{versionApp}</Text>
                            </Pressable>
                            {/* TODO: Depois incluir site da empresa */}
                            {/* <Bar padding={0.3} color={Colors.GRAY_THIN} />
                            <Pressable style={styles(theme).rowContainer} onPress={() => Linking.openURL('https://www.github.com')}>
                                <Text style={[Typography.BODY, {color: Colors.WHITE}]}>Developer</Text>
                                <Text style={[Typography.TAGLINE, {color: Colors.GRAY_MEDIUM}]}>Isabel Sales Almeida</Text>
                            </Pressable> */}
                        </View>
                    </View>

                    {/* Privacy */}
                    <View style={{ marginTop: 20 }}>
                        <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_MEDIUM : Colors.BLACK, marginBottom: 10 }]}>{t("Privacy")}</Text>
                        <TouchableOpacity
                            onPress={() => __openDelete()} >
                            <View style={styles(theme).blockContainer}>
                                <View style={styles(theme).rowContainer}>
                                    <Text style={[Typography.BODY, { color: theme.darkmode ? Colors.GRAY_MEDIUM : Colors.BLACK }]}>{t("Restart your account")}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>


                    {/* Sign out */}
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles(theme).btnContainer}
                        onPress={() => __signOut()} >
                        <Text style={[Typography.H3, { color: theme.darkmode ? Colors.PRIMARY : Colors.WHITE }]}>{t("Sign out")}</Text>
                    </TouchableOpacity>

                    {/* Sign out */}
                    <TouchableOpacity
                        onPress={() => __openDeleteAccount()} >
                        <View style={styles(theme).blockContainerDelete}>
                            <View style={styles(theme).rowContainerDelete}>
                                <Text style={[Typography.BODY, { color: Colors.ALERT }]}>{t("Account deletion")}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        paddingBottom: 10
    },
    // Body
    bodyContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 0
    },
    blockContainer: {
        borderRadius: 10,
        backgroundColor: theme.darkmode ? Colors.LIGHT_BLACK : Colors.GRAY_MEDIUM
    },
    blockContainerDelete: {
        borderRadius: 10,
        backgroundColor: 'transparent'
    },
    rowContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    rowContainerDelete: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
    },
    btnContainer: {
        padding: 12,
        marginTop: 20,
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: theme.darkmode ? Colors.GRAY_MEDIUM : Colors.PRIMARY
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

export default Settings;
