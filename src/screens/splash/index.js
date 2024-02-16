import React from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';
import Lottie from 'lottie-react-native';
import { Colors } from '../../styles';
import LinearGradient from 'react-native-linear-gradient';

const Splash = () => {
    return (
        <LinearGradient colors={[Colors.DARK_BLACK, Colors.BLACK, Colors.GRAY_BLUE]} style={styles.container}>
                <Lottie
                    source={require('../../assets/JSON/logo.json')}
                    speed={1}
                    autoPlay
                    loop
                />
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: Colors.BLACK
    },
});

export default Splash;
