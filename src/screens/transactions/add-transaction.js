import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    Switch,
    TextInput,
    Pressable,
    TouchableOpacity
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Colors, Typography } from '../../styles';
import { insertTransaction, updateTransaction } from '../../dbHelpers/transactionHelper';
import { getTheme } from '../../utils/theme';

import { categories } from '../../utils/categories';

import BackHeader from '../../components/Headers/BackHeader';
import Button from '../../components/Button';

const AddTransaction = ({ navigation, route }) => {
    const [category, setCategory] = useState();
    const [categorySelected, setCategorySelected] = useState();
    const [showCategory, setShowCategory] = useState(false);
    const [income, setIncome] = useState(false);
    const [showDate, setShowDate] = useState(false);
    const [date, setDate] = useState();
    const [amount, setAmount] = useState();
    const [theme, setTheme] = useState({});

    useEffect(async () => {
        await getTheme(setTheme);
        if (route.params?.item) {
            console.log('item', route.params?.item)
            await setCategorySelected(route.params.item.category);
            await setCategory({ name: route.params.item.category, icon: route.params.item.icon, color: route.params.item.color });
            await setDate(new Date(route.params.item.transaction_date));
            await setAmount((route.params.item.amount).toString());
            await setIncome(route.params.item.type == 'income' ? false : true);
        }
        else {
            await setCategory(categories[0]); // Set the first category as a default category
        }
    }, []);

    // Toggle Income / Expense Switch
    const toggleIncomeSwitch = () => setIncome(previousState => !previousState);

    // Change Date
    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDate(Platform.OS === 'ios');
        setDate(currentDate);
    }

    // Insert Transaction
    const __insert = () => {
        console.log('category', category)
        const stringDate = date.toLocaleDateString();
        insertTransaction({
            category: category.name,
            icon: category.icon,
            date: stringDate,
            amount: parseFloat(amount),
            type: income ? 'expense' : 'income',
            color: category.color,
        });
    }

    // Update Transaction
    const __update = () => {
        const stringDate = date.toLocaleDateString();
        updateTransaction({
            id: route.params.item.id,
            category: category.name,
            icon: category.icon,
            date: stringDate,
            amount: parseFloat(amount),
            type: income ? 'expense' : 'income',
            color: category.color,
        });
    }

    // Save Transaction
    const __save = () => {
        if (route.params?.item) {
            __update();
        }
        else {
            __insert();
        }
        navigation.goBack();
    }

        // Toggle Modal Date
        const __toggleDateModal = () => {
            setDate(new Date);
            setShowDate(!showDate);
        };

    // Toggle Modal
    const __toggleCategoryModal = () => {
        setShowCategory(!showCategory);
    };

    // Change Category
    const __changeCategory = (category) => {
        console.log('category', category);
        setCategory(category);
        setCategorySelected(category.name);
        __toggleCategoryModal();
    };

    return (
        <View style={styles(theme).container}>
            {/* Header */}
            <BackHeader theme={theme} title={route.params?.item ? 'Edit Transaction' : 'New Transaction'} />
            <Modal
                useNativeDriverForBackdrop
                swipeDirection={['down']}
                isVisible={showCategory}
                onBackButtonPress={() => { __toggleCategoryModal(); }}
                onBackdropPress={() => { __toggleCategoryModal(); }}
                style={{
                    justifyContent: 'flex-end',
                    margin: 0,
                }}
            >
                <View>
                    <ScrollView style={styles(theme).modalContainer} showsVerticalScrollIndicator={false} >
                        {categories.map((item, index) => (
                            <View key={index} >
                                <Pressable style={styles(theme).rowCategories} onPress={() => __changeCategory(item)} >
                                    <View style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20,
                                        backgroundColor: item.color,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Icon name={item.icon} size={15} color={theme.darkmode ? Colors.BLACK : Colors.WHITE} />
                                    </View>
                                    <View style={{
                                        paddingLeft: 10,
                                    }}>
                                        <Text style={[Typography.BODY, { color: theme.darkmode ? Colors.WHITE : Colors.BLACK, textAlign: 'center' }]}>{item.name}</Text>
                                    </View>
                                </Pressable>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </Modal>
            {/* Body */}
            <ScrollView style={styles(theme).bodyContainer} showsVerticalScrollIndicator={false}>
                {/* Category */}
                <View style={styles(theme).inputContainer}>
                    <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_DARK : Colors.BLACK }]}>Category</Text>
                    <TouchableOpacity
                        onPress={() => setShowCategory(true)}
                        style={[styles(theme).input, { paddingTop: 15, paddingBottom: 15 }]}>
                        <Text style={[Typography.BODY, { color: theme.darkmode ? Colors.WHITE : Colors.LIGHT_BLACK }]}>{categorySelected}</Text>
                    </TouchableOpacity>
                </View>

                {/* Transaction type */}
                <View style={styles(theme).inputContainer}>
                    <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_DARK : Colors.BLACK }]}>Transaction type</Text>
                    <View style={styles(theme).rowContainer}>
                        <Text style={[Typography.BODY, !income ? { color: Colors.PRIMARY } : { color: Colors.GRAY_DARK }]}>Income</Text>
                        <Switch
                            trackColor={{ false: Colors.GRAY_LIGHT, true: Colors.GRAY_LIGHT }}
                            thumbColor={income ? Colors.PRIMARY : Colors.PRIMARY}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleIncomeSwitch}
                            value={income}
                        />
                        <Text style={[Typography.BODY, income ? { color: Colors.PRIMARY } : { color: Colors.GRAY_DARK }]}>Expense</Text>
                    </View>
                </View>

                {/* Date */}
                <View style={styles(theme).inputContainer}>
                    <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_DARK : Colors.BLACK }]}>Date</Text>
                    <TouchableOpacity
                        onPress={() => __toggleDateModal()}
                        style={[styles(theme).input, { paddingTop: 15, paddingBottom: 15 }]}>
                        <Text style={[Typography.BODY, { color: theme.darkmode ? Colors.WHITE : Colors.LIGHT_BLACK }]}>{date ? date.toDateString() : ''}</Text>
                    </TouchableOpacity>
                </View>

                {showDate && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode='date'
                        display='calendar'
                        onChange={onChangeDate}
                    />
                )}

                {/* Amount */}
                <View style={styles(theme).inputContainer}>
                    <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_DARK : Colors.BLACK }]}>Amount</Text>
                    <TextInput
                        value={amount}
                        placeholder=''
                        keyboardType='numeric'
                        onChangeText={(text) => setAmount(text)}
                        placeholderTextColor={theme.darkmode ? Colors.GRAY_MEDIUM : Colors.LIGHT_BLACK}
                        style={[styles(theme).input, Typography.BODY]} />
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles(theme).footerContainer}>
                <Button
                    title='Save'
                    tertiary
                    onPress={() => __save()} />
            </View>
        </View>
    );
};

export const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.darkmode ? Colors.BLACK : Colors.GRAY_THIN
    },
    // Body
    bodyContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 10,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        padding: 10,
        marginTop: 10,
        borderRadius: 20,
        color: theme.darkmode ? Colors.WHITE : Colors.BLACK,
        backgroundColor: theme.darkmode ? Colors.LIGHT_BLACK : Colors.GRAY_MEDIUM
    },
    rowContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    rowCategories: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    // Footer
    footerContainer: {
        padding: 20,
    },
    // Modal 
    modalContainer: {
        height: '65%',
        margin: 0,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
        backgroundColor: theme.darkmode ? Colors.BLACK : Colors.GRAY_MEDIUM
    },
});

export default AddTransaction;
