import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import Lottie from 'lottie-react-native';

import routes from '../../config/routes';
import { Colors, Typography } from '../../styles';

import Button from '../../components/Button';

const GetStarted = ({ navigation, route }) => {

    return (
        <View style={styles.container}>
            {/* Body */}

            <View style={styles.HeaderContainer} >

                <Lottie source={require('../../assets/JSON/budgeting.json')} autoPlay loop />

            </View>
            <View style={styles.bodyContainer} >

                <Text style={[Typography.H1, styles.title]}>Welcome !</Text>
                <Text style={[Typography.BODY, styles.title, { marginTop: 10 }]}>Manage your money with ease and confidence using Spendly - the ultimate financial planning and tracking app.</Text>

            </View>

            {/* Footer */}
            <View style={styles.footerContainer}>
                <Button
                    title='Login'
                    color={Colors.PRIMARY}
                    secondary
                    onPress={() => navigation.navigate(routes.Login)} />
            </View>
            <View style={styles.footerContainer}>
                <Button
                    title='Get Started'
                    onPress={() => navigation.navigate(routes.Register)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BLACK
    },
    // Body
    HeaderContainer: {
        flex: 0.6,
        padding: 20,
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
