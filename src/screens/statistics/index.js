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
import { getExpensesByCategory } from './../../dbHelpers/transactionHelper';
import { PieChart } from "react-native-gifted-charts";

import { Colors, Typography } from '../../styles';

import { getTheme } from '../../utils/theme';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Statistics = ({ navigation, route }) => {

    const { t } = route.params;

    const focused = useIsFocused();

    const [theme, setTheme] = useState({});
    const [expensesByCategory, setExpensesByCategory] = useState({});

    useEffect(() => {
        getExpensesByCategory(setExpensesByCategory);
        getTheme(setTheme);
        console.log('res', expensesByCategory)
    }, [focused]);


    const arrayColor = theme.darkmode ? [Colors.DARK_BLACK, Colors.BLACK, Colors.DARK_BLACK] : [Colors.GRAY_LIGHT, Colors.GRAY_THIN, Colors.GRAY_LIGHT];

    // const pieData = expensesByCategory.length > 0 ? expensesByCategory.map((item) => {
    //     return { "value": item.amount, "color": item.color, "gradientCenterColor": item.color }
    // }) : 0;

    const pieData = [
        {
            value: 47,
            color: '#009FFF',
            gradientCenterColor: '#006DFF',
            focused: true,
        },
        { value: 40, color: '#93FCF8', gradientCenterColor: '#3BE9DE' },
        { value: 16, color: '#BDB2FA', gradientCenterColor: '#8F80F3' },
        { value: 3, color: '#FFA5BA', gradientCenterColor: '#FF7F97' },
    ];

    const renderDot = color => {
        return (
            <View
                style={{
                    height: 10,
                    width: 10,
                    borderRadius: 5,
                    backgroundColor: color,
                    marginRight: 10,
                }}
            />
        );
    };

    const renderLegendComponent = () => {
        return (
            <>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 10,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 120,
                            marginRight: 20,
                        }}>
                        {renderDot('#006DFF')}
                        <Text style={{ color: 'white' }}>Excellent: 47%</Text>
                    </View>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('#8F80F3')}
                        <Text style={{ color: 'white' }}>Okay: 16%</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: 120,
                            marginRight: 20,
                        }}>
                        {renderDot('#3BE9DE')}
                        <Text style={{ color: 'white' }}>Good: 40%</Text>
                    </View>
                    <View
                        style={{ flexDirection: 'row', alignItems: 'center', width: 120 }}>
                        {renderDot('#FF7F97')}
                        <Text style={{ color: 'white' }}>Poor: 3%</Text>
                    </View>
                </View>
            </>
        );
    };

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
                {expensesByCategory.length > 0 ?
                    <View
                        style={{
                            paddingVertical: 100,
                            backgroundColor: '#34448B',
                            flex: 1,
                        }}>
                        <View
                            style={{
                                margin: 20,
                                padding: 16,
                                borderRadius: 20,
                                backgroundColor: '#232B5D',
                            }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                                Performance
                            </Text>
                            <View style={{ padding: 20, alignItems: 'center' }}>
                                <PieChart
                                    data={pieData}
                                    donut
                                    showGradient
                                    sectionAutoFocus
                                    radius={90}
                                    innerRadius={60}
                                    innerCircleColor={'#232B5D'}
                                    centerLabelComponent={() => {
                                        return (
                                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                <Text
                                                    style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>
                                                    47%
                                                </Text>
                                                <Text style={{ fontSize: 14, color: 'white' }}>Excellent</Text>
                                            </View>
                                        );
                                    }}
                                />
                            </View>
                            {renderLegendComponent()}
                        </View>
                    </View>
                    :
                    <View style={styles(theme).emptyContainer}>
                        <Lottie style={{ width: 250 }} source={require('../../assets/JSON/search.json')} autoPlay />
                        <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.WHITE : Colors.BLACK, textAlign: 'center' }]}>{t("You don't have any transactions!")}</Text>
                    </View>
                }

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
