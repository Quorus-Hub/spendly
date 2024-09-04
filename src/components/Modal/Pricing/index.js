import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Pressable,
    StyleSheet,
    ScrollView
} from 'react-native';
import Lottie from 'lottie-react-native';
import Modal from "react-native-modal";
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors, Typography } from "./../../../styles";
import Button from '../../Button';

const Pricing = (props) => {

    const theme = props.theme;

    const t = props.t;

    return (
        <Modal
            useNativeDriverForBackdrop
            swipeDirection={['down']}
            isVisible={props.isVisible}
            onBackButtonPress={() => { props.onClose(); }}
            onBackdropPress={() => { props.onClose(); }}
            style={{
                justifyContent: 'flex-end',
                margin: 0,
            }}
        >
            <LinearGradient colors={[Colors.DARK_BLACK, Colors.BLACK, Colors.GRAY_BLUE]}>
                <ScrollView>
                    <View style={{
                        borderRadius: 20,
                        height: "100%",
                    }}>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                            padding: 10
                        }}
                            onPress={() => props.onClose()}>
                            <Icon name="close-outline" color={Colors.GRAY_DARK} size={30} />
                        </TouchableOpacity>
                        <View style={{ marginBottom: -320, alignItems: 'center' }}>
                            <Text style={[Typography.H4, { textAlign: 'center', color: Colors.WHITE }]}>{t("Choose your plan")}</Text>
                            <Lottie style={{ width: 250 }} source={require('../../../assets/JSON/confetti.json')} autoPlay />
                        </View>
                        <View style={{ alignItems: 'center', paddingVertical: 30 }}>
                            <Lottie style={{ width: 250 }} source={require('../../../assets/JSON/pig1.json')} autoPlay />
                        </View>
                        <View style={{ marginTop: -30, flexDirection: 'row', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[Typography.H1, { textAlign: 'center', color: Colors.WHITE }]}>{"Spendly Plus"}</Text>
                            <MaterialIcons name="verified" color={Colors.PRIMARY} size={16} style={{ paddingLeft: 5 }} />
                        </View>
                        <View style={{ marginTop: 10, marginHorizontal: 20, marginBottom: 20 }}>
                            <Text style={[Typography.TAGLINE, { textAlign: 'center', color: Colors.WHITE }]}>{t("Experience the freedom of being in full control of your financial future.")}</Text>
                        </View>
                        <Pressable style={styles(theme).rowContainer} onPress={() => setIsVisibleUp(true)} >
                            <Octicons name="check-circle-fill" color={Colors.PRIMARY} size={16} style={{ paddingRight: 10 }} />
                            <Text style={[Typography.BODY, { color: Colors.WHITE }]}>{t("Unlock everything in the app")}</Text>
                        </Pressable>
                        <Pressable style={styles(theme).rowContainer} onPress={() => setIsVisibleUp(true)} >
                            <Octicons name="check-circle-fill" color={Colors.PRIMARY} size={16} style={{ paddingRight: 10 }} />
                            <Text style={[Typography.BODY, { color: Colors.WHITE }]}>{t("Unlimited wallets and budgets")}</Text>
                        </Pressable>
                        <Pressable style={styles(theme).rowContainer} onPress={() => setIsVisibleUp(true)} >
                            <Octicons name="check-circle-fill" color={Colors.PRIMARY} size={16} style={{ paddingRight: 10 }} />
                            <Text style={[Typography.BODY, { color: Colors.WHITE }]}>{t("Unlimited tags and categories")}</Text>
                        </Pressable>
                        <Pressable style={styles(theme).rowContainer} onPress={() => setIsVisibleUp(true)} >
                            <Octicons name="check-circle-fill" color={Colors.PRIMARY} size={16} style={{ paddingRight: 10 }} />
                            <Text style={[Typography.BODY, { color: Colors.WHITE }]}>{t("Reports on your expenses")}</Text>
                        </Pressable>
                        <Pressable style={styles(theme).rowContainer} onPress={() => setIsVisibleUp(true)} >
                            <Octicons name="check-circle-fill" color={Colors.PRIMARY} size={16} style={{ paddingRight: 10 }} />
                            <Text style={[Typography.BODY, { color: Colors.WHITE }]}>{t("Sync with multiple devices")}</Text>
                        </Pressable>
                        <View style={styles(theme).container}>
                            <View style={styles(theme).gpPricing}>
                                <Text style={[Typography.BODY, { color: Colors.BLACK }]}>{"U$ 0,99" + "/" + t("month")}</Text>
                                <Text style={[Typography.TAGLINE, { color: Colors.BLACK }]}>{t("With 7 days free trial")}</Text>
                            </View>
                            <View style={styles(theme).gpPricing}>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={[Typography.BODY, { color: Colors.BLACK }]}>{"U$ 6,90" + "/" + t("year")}</Text>
                                        <Text style={[Typography.TAGLINE, { color: Colors.BLACK }]}>{t("With 7 days free trial")}</Text>
                                    </View>
                                    <View style={{
                                        width: 45,
                                        height: 40,
                                        backgroundColor: Colors.YELLOW,
                                        marginLeft: 30,
                                        marginTop: -10,
                                        paddingTop: 5,
                                        borderBottomEndRadius: 100,
                                        borderBottomStartRadius: 100
                                    }}>
                                        <Text style={[Typography.H4, { color: Colors.BLACK, textAlign: 'center' }]}>38%</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ paddingHorizontal: 30, alignItems: 'center', paddingTop: 20, paddingBottom: 30 }}>
                                <Text style={[Typography.SMALL, { color: Colors.WHITE, textAlign: 'center' }]}>{t('By purchasing a Spendly subscription, you accept our')}</Text>
                                <Text style={[Typography.SMALL, { color: Colors.WHITE, textAlign: 'center', textDecorationLine: "underline" }]}>{t('Terms of Use and Privacy Policy')}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </LinearGradient>
        </Modal>
    )
}

export const styles = (theme) => StyleSheet.create({
    container: {
        marginTop: 20,
    },
    rowPricing: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        elevation: 10,
        shadowColor: Colors.BLACK,
    },
    rowContainer: {
        width: '60%',
        paddingTop: 15,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'flex-start'
    },
    gpPricing: {
        alignItems: 'flex-start',
        paddingVertical: 10,
        paddingHorizontal: 30,
        width: "80%",
        height: 50,
        alignSelf: 'center',
        margin: 10,
        borderRadius: 25,
        backgroundColor: Colors.WHITE
    }
});


export default Pricing;