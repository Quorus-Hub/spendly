import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

import { Colors, Typography } from '../../styles';

import { getTheme } from '../../utils/theme';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Statistics = ({ navigation, route }) => {

    const { t } = route.params;

    const focused = useIsFocused();

    const [theme, setTheme] = useState({});

    useEffect(() => {
        getTheme(setTheme);
    }, [focused]);


    const arrayColor = theme.darkmode ? [Colors.DARK_BLACK, Colors.BLACK, Colors.DARK_BLACK] : [Colors.GRAY_LIGHT, Colors.GRAY_THIN, Colors.GRAY_LIGHT];

    return (
        <View style={styles(theme).container}>
            {/* Header */}
            <View style={styles(theme).headerContainer}>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{ padding: 5, alignItems: 'flex-start' }}
                    onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" color={theme.darkmode ? Colors.WHITE : Colors.BLACK} size={20} />
                </TouchableOpacity>
                <Text style={[Typography.H1, { color: theme.darkmode ? Colors.WHITE : Colors.BLACK, marginBottom: 10 }]}>{t("Statistics")}</Text>
                <View></View>
            </View>

            {/* Body */}
            <View style={styles(theme).bodyContainer}>

            </View>
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
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY
    },
    // Body
    bodyContainer: {
        flex: 1,
        paddingRight: 20,
        paddingTop: 10,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loading: {
        alignSelf: 'center',
        width: '90%',
        borderRadius: 15,
        height: 60,
        marginHorizontal: 20,
        textAlign: 'center',
        marginTop: 20,
    },
    gpLoading: {
        width: "100%",
        marginLeft: 10,
    }
});

export default Statistics;
