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

    const pieData = expensesByCategory.length > 0 ? expensesByCategory.map((item) => {
        return { "value": item.amount, "color": item.color, "gradientCenterColor": item.color }
    }) : 0;

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
      <Text style={{color: 'white', fontSize: 16, fontWeight: 'bold'}}>
        Performance
      </Text>
      <View style={{padding: 20, alignItems: 'center'}}>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={60}
          innerCircleColor={'#232B5D'}
        />
      </View>
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
