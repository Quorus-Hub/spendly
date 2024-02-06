import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Alert,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import routes from '../../config/routes';
import firestore from '@react-native-firebase/firestore';

import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';

import { Colors, Typography } from '../../styles';
import AuthContext from '../../context/AuthContext';
import view from './../../assets/images/view.png';
import hidden from './../../assets/images/hidden.png';
import auth from '@react-native-firebase/auth';

import Button from '../../components/Button';

const Login = ({ navigation }) => {
    const { authContext } = React.useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [googleInfo, setGoogleInfo] = useState([]);
    const [data, setData] = useState({
        checkTextInputChange: false,
        secureTextEntry: true,
    });

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '778646354621-id4p3dgc714mdefma79ebtks1e999s1q.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        });
    }, [])


    const __RegisterGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            setGoogleInfo(userInfo);
            const user = {
                name: userInfo.user.name,
                email: userInfo.user.email,
                photo: userInfo.user.photo,
                free: true,
                active: true,
                joined: new Date()
            }
            __save(user);
        } catch (error) {
            console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                //user cancelled the login flow
                console.log("User cancelled the login flow")
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log("Operation is in progress already")
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log("Play services not available or outdated")
            } else {
                // some other error happened
                console.log("Some other error happened")
            }
        }
    };

    // replaces password text with * on active
    const __updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    // Register
    const __register = () => {
        if (email != '' && password != '' && name != '') {
            handleSignIn();
        }
        else {
            Alert.alert('Sorry !', 'Please, enter valid informations.');
        }
    }

    const __save = (user) => {
        firestore()
            .collection('Users')
            .add(user)
            .then(() => {
                console.log('User added!');
                authContext.signIn(user);
            }).catch(error => {
                console.log('Error added!');
                Alert.alert('Sorry !', 'Error registering user');
            })
    }


    const handleSignIn = () => {
        //criar user
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(response => {
                const user = {
                    name: name,
                    email: email,
                    photo: "",
                    free: true,
                    active: true,
                    joined: new Date()
                }
                __save(user);
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                    Alert.alert('Sorry !', 'That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    Alert.alert('Sorry !', 'That email address is invalid!');
                }

                if (error.code === 'auth/wrong-password') {
                    console.log('That email address is invalid!');
                    Alert.alert('Sorry !', 'That email address is invalid!');
                }
                console.error(error);
            });
    }


    return (
        <View style={styles.container}>
            {/* Body */}
            <View style={styles.bodyContainer} >
                <View style={styles.rowContainer}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => navigation.goBack()} >
                        <Icon name="arrow-left" color={Colors.WHITE} size={25} />
                    </TouchableOpacity>
                    <Text style={[Typography.H1, { marginLeft: 10, color: Colors.WHITE }]}>Register</Text>
                </View>

                {/* Name */}
                <View style={{ marginTop: 20 }}>
                    <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>Name</Text>
                    <View style={[styles.gpInput]}>
                        <TextInput
                            value={name}
                            autoCapitalize={'none'}
                            placeholder=''
                            keyboardType='name-phone-pad'
                            onChangeText={(text) => setName(text)}
                            style={[Typography.BODY, styles.input]}
                            placeholderTextColor={Colors.GRAY_MEDIUM} />
                    </View>
                </View>

                {/* E-mail */}
                <View style={{ marginTop: 20 }}>
                    <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>E-mail</Text>
                    <View style={[styles.gpInput]}>
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

                {/* Password */}
                <View style={{ marginTop: 20 }}>
                    <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>Password</Text>
                    <View style={[styles.gpInput]}>
                        <TextInput
                            value={password}
                            placeholder=''
                            keyboardType='name-phone-pad'
                            secureTextEntry={data.secureTextEntry}
                            onChangeText={(text) => setPassword(text)}
                            style={[Typography.BODY, styles.input]}
                            placeholderTextColor={Colors.GRAY_MEDIUM} />
                        <TouchableOpacity onPress={__updateSecureTextEntry} style={{ alignItems: 'flex-end', paddingRight: 15, justifyContent: 'center' }}>
                            {data.secureTextEntry ?
                                <Image source={hidden} resizeMode="contain" style={{ width: 25, height: 25 }} />
                                :
                                <Image source={view} resizeMode="contain" style={{ width: 25, height: 25 }} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ marginTop: 20 }}>
                    <Button
                        title='Send'
                        onPress={() => __register()} />
                </View>

                <View style={{ marginTop: 20 }}>
                    <Button
                        title={'Register with Google'}
                        color={Colors.BLACK}
                        google
                        secondary
                        onPress={() => __RegisterGoogle()} />
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
        paddingLeft: 10,
        width: "85%",
        flexDirection: 'row',
        borderRadius: 10,
        color: Colors.WHITE,
    },
    gpInput: {
        paddingLeft: 10,
        marginTop: 10,
        flexDirection: 'row',
        borderRadius: 10,
        color: Colors.WHITE,
        backgroundColor: Colors.LIGHT_BLACK
    },
    // Footer
    footerContainer: {
        padding: 20,
    },
});

export default Login;
