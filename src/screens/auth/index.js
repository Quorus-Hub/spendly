import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Lottie from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';

import routes from '../../config/routes';
import { Colors, Typography } from '../../styles';

import Button from '../../components/Button';

const GetStarted = ({ navigation, route }) => {

    const { t } = route.params;

    return (
        <LinearGradient colors={[Colors.DARK_BLACK, Colors.BLACK, Colors.GRAY_BLUE]} style={styles.container}>
            {/* Body */}

            <View style={styles.HeaderContainer} >

                <Lottie
                    source={require('../../assets/JSON/financeApp.json')}
                    autoPlay
                    style={{ width: "95%", height: "auto" }}
                    loop />

            </View>
            <View style={styles.bodyContainer} >


                <Text style={[Typography.H1, styles.title]}>{t("Welcome!")}</Text>
                <Text style={[Typography.BODY, styles.title, { marginTop: 10 }]}>Manage your money with ease and confidence using Spendly - the ultimate financial planning and tracking app.</Text>

            </View>

            {/* Footer */}
            <View style={styles.footerContainer}>
                <Button
                    title='Login'
                    secondary
                    onPress={() => navigation.navigate(routes.Login)} />
            </View>
            <View style={styles.footerContainer}>
                <Button
                    title='Get Started'
                    primary
                    color={Colors.BLACK}
                    onPress={() => navigation.navigate(routes.Register)} />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    // Body
    HeaderContainer: {
        flex: 0.6,
        paddingTop: 60,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBotton: 30
    },
    bodyContainer: {
        flex: 0.2,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBotton: 30
    },
    title: {
        textAlign: 'center',
        color: Colors.WHITE
    },
    // Footer
    footerContainer: {
        padding: 10,
    },
});

export default GetStarted;
