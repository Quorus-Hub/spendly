import React, { useState } from 'react';
import {
    StyleSheet,
    Alert,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Modal from "react-native-modal";

import { Colors, Typography } from '../../styles';
import AuthContext from '../../context/AuthContext';
import routes from '../../config/routes';
import Lottie from 'lottie-react-native';
import auth from '@react-native-firebase/auth';

import Button from '../../components/Button';

const Password = ({ navigation }) => {
    const { authContext } = React.useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Login
    const __send = () => {
        if (email != '') {
            setIsVisible(true);
            let firebaseAuth = auth();
            firebaseAuth.sendPasswordResetEmail(email).then(function () {
                Alert.alert('Alert !', 'Email successfully sent.');
                console.log("E-mail enviado!");
            }).catch(function (error) {
                console.log("Erro ao enviar e-mail!", error);
                Alert.alert('Sorry !', 'Error sending the e-mail. Try again later!');
            });
        }
        else {
            Alert.alert('Sorry !', 'Please, enter valid informations.');
        }
    }

    // const __login = () => {
    //     setIsVisible(false);
    //     navigation.navigate(routes.Login);
    // }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                {/* Modal Example */}
                {/* <Modal
                    hasBackdrop={false}
                    isVisible={isVisible}
                >
                    <View style={{
                        backgroundColor: Colors.DARK_BLACK,
                        borderRadius: 20,
                        width: 330,
                        height: 250,
                        padding: 20,
                    }}>
                        <View style={{ alignItems: 'center' }}>
                            {error ?
                                <Lottie style={{ width: 110 }} source={require('../../assets/JSON/error.json')} autoPlay loop />
                                :
                                <Lottie style={{ width: 110 }} source={require('../../assets/JSON/right.json')} autoPlay loop />
                            }
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={[Typography.H4, { textAlign: 'center', color: Colors.WHITE }]}>{error ? "Error sending the e-mail. Try again later!" : "Email successfully sent."}</Text>
                        </View>
                        <Button
                            title={error ? 'Close' : 'Got it!'}
                            secondary
                            color={Colors.BLACK}
                            onPress={() => __login()} />

                    </View>
                </Modal> */}
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
                        onPress={() => __send()} />
                </View>
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
    bodyContainer: {
        flex: 1,
        padding: 20,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        color: Colors.WHITE,
        backgroundColor: Colors.LIGHT_BLACK
    },
    // Footer
    footerContainer: {
        padding: 20,
    },
});

export default Password;