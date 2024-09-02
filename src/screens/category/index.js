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
import SwipeableFlatList from 'react-native-swipeable-list';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { categories } from '../../utils/categories';

import routes from '../../config/routes';
import { Colors, Typography } from '../../styles';
import { getCategory, deleteCategory } from '../../dbHelpers/categoryHelper';

import QuickActions from '../../utils/quickActions';
import CategoryCard from '../../components/Cards/CategoryCard';
import { getTheme } from '../../utils/theme';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const Category = ({ navigation, route }) => {

    const { t } = route.params;

    const focused = useIsFocused();

    const [category, setCategory] = useState(null);
    const [theme, setTheme] = useState({});

    useEffect(() => {
       getTheme(setTheme);
       getCategory(setCategory);
    }, [focused]);

    // Delete Item
    const __delete = (id) => {
        deleteCategory(id);
        getCategory(setCategory);
    }

    // Update Item
    const __update = (item) => {
        navigation.navigate(routes.AddCategory, { item: item })
    }

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
                <Text style={[Typography.H1, { color: theme.darkmode ? Colors.WHITE : Colors.BLACK, marginBottom: 10 }]}>{t("Categories")}</Text>

                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles(theme).iconContainer}
                    onPress={() => navigation.navigate(routes.AddCategory)}>
                    <Icon name="plus" color={Colors.WHITE} size={15} />
                </TouchableOpacity>
            </View>

            {/* Body */}
            <View style={styles(theme).bodyContainer}>
                {!category ?
                    <View style={styles(theme).gpLoading}>
                        <ShimmerPlaceHolder
                            key={1}
                            LinearGradient={LinearGradient}
                            shimmerColors={arrayColor}
                            autoRun={true}
                            shimmerStyle={styles(theme).loading}
                        >
                        </ShimmerPlaceHolder>
                        <ShimmerPlaceHolder
                            key={2}
                            LinearGradient={LinearGradient}
                            shimmerColors={arrayColor}
                            autoRun={true}
                            shimmerStyle={styles(theme).loading}
                        >
                        </ShimmerPlaceHolder>
                        <ShimmerPlaceHolder
                            key={3}
                            LinearGradient={LinearGradient}
                            shimmerColors={arrayColor}
                            autoRun={true}
                            shimmerStyle={styles(theme).loading}
                        >
                        </ShimmerPlaceHolder>
                        <ShimmerPlaceHolder
                            key={4}
                            LinearGradient={LinearGradient}
                            shimmerColors={arrayColor}
                            autoRun={true}
                            shimmerStyle={styles(theme).loading}
                        >
                        </ShimmerPlaceHolder>
                    </View>
                    :
                    category.length == 0 ?
                        <View style={styles(theme).emptyContainer}>
                            <Lottie style={{ width: 250 }} source={require('../../assets/JSON/search.json')} autoPlay />
                            <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.WHITE : Colors.BLACK, textAlign: 'center' }]}>{t("You don't have any category!")}</Text>
                        </View>
                        :
                        <SwipeableFlatList
                            data={category}
                            maxSwipeDistance={140}
                            shouldBounceOnMount={true}
                            keyExtractor={(item, index) => index.toString()}
                            renderQuickActions={({ index, item }) => QuickActions(item, __update, __delete, theme)}
                            renderItem={({ item, index }) => {
                                return <CategoryCard key={index} item={item} category={item} theme={theme} t={t} />
                            }}
                        />
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

export default Category;
