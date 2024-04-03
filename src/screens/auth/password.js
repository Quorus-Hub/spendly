import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import { Colors, Typography } from '../../styles';
import AuthContext from '../../context/AuthContext';
import routes from '../../config/routes';
import auth from '@react-native-firebase/auth';

import Alert from '../../components/Modal/Alert';
import Button from '../../components/Button';

const Password = ({ navigation }) => {
    const { authContext } = React.useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');
    const [error, setError] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Login
    const __send = async () => {
        if (email != '') {
            let firebaseAuth = auth();
            firebaseAuth.sendPasswordResetEmail(email).then(async function () {
                console.log("E-mail enviado!");
                await setMsg('Email successfully sent!')
                await setError(false);
                await setIsVisible(true);
            }).catch(async function (error) {
                console.log("Erro ao enviar e-mail!", error);
                await setMsg('Error sending the e-mail. Try again later!')
                await setError(true);
                await setIsVisible(true);
            });
        }
        else {
            await setMsg('Please, enter valid informations!')
            await setError(true);
            await setIsVisible(true);
        }
    }

    const __login = () => {
        setIsVisible(false);
        if (!error) {
            navigation.navigate(routes.Login);
        }
    }

    return (
        <LinearGradient colors={[Colors.DARK_BLACK, Colors.BLACK, Colors.GRAY_BLUE]} style={styles.container}>
            {/* Modal */}
            <Alert isVisible={isVisible} msg={msg} error={error} onClick={__login} />
            {/* Body */}
            <View style={styles.bodyContainer} >
                <View style={styles.rowContainer}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.goBack()} >
                        <Icon name="arrow-left" color={Colors.WHITE} size={25} />
                    </TouchableOpacity>
                    <Text style={[Typography.H1, { marginLeft: 10, color: Colors.WHITE }]}>Password request</Text>
                </View>

                {/* Lastname */}
                <View style={{ marginTop: 20 }}>
                    <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>E-mail</Text>
                    <TextInput
                        value={email}
                        autoCapitalize={'none'}
                        placeholder=''
                        keyboardType='name-phone-pad'
                        onChangeText={(text) => setEmail(text)}
                        style={[Typography.BODY, styles.input]}
                        placeholderTextColor={Colors.GRAY_MEDIUM} />
                </View>
            </View>

            {/* Footer */}
            <View style={styles.footerContainer}>
                <Button
                    title='Send'
                    primary
                    color={Colors.BLACK}
                    onPress={() => __send()} />
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BLACK
    },
    // Body
    bodyContainer: {
        flex: 1,
        padding: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        padding: 12,
        marginTop: 10,
        borderRadius: 20,
        color: Colors.WHITE,
        backgroundColor: Colors.LIGHT_BLACK
    },
    // Footer
    footerContainer: {
        padding: 20,
    },
});

export default Password;
