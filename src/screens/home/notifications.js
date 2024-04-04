import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import Lottie from 'lottie-react-native';
import { getTheme } from '../../utils/theme';

import { Colors, Typography } from '../../styles';

import BackHeader from '../../components/Headers/BackHeader';

const Notifications = ({ navigation }) => {

    const [theme, setTheme] = useState({});

    useEffect(() => {
        getTheme(setTheme)
    }, []);

    return (
        <View style={styles(theme).container}>
            {/* Header */}
            <BackHeader title='Notifications' theme={theme} />

            {/* Body */}
            <View style={styles(theme).bodyContainer}>
                <Lottie style={{ width: 250 }} source={require('../../assets/JSON/search.json')} autoPlay />
                <Text style={[Typography.BODY, { textAlign: 'center', color: theme.darkmode ? Colors.WHITE : Colors.BLACK }]}>You don't have received any notification !</Text>
            </View>
        </View>
    );
};

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.darkmode ? Colors.BLACK : Colors.GRAY_THIN
    },
    // Body
    bodyContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Notifications;
