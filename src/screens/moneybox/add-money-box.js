import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TextInput
} from 'react-native';

import { Colors, Typography } from '../../styles';
import { insertMoneyBox, updateMoneyBox } from '../../dbHelpers/moneyboxHelper';
import { getTheme } from '../../utils/theme';

import Button from '../../components/Button';
import BackHeader from '../../components/Headers/BackHeader';

const AddMoneyBox = ({ navigation, route }) => {
    const [name, setName] = useState('');
    const [total, setTotal] = useState('');
    const [collected, setCollected] = useState('');
    const [theme, setTheme] = useState({});

    useEffect(() => {
        getTheme(setTheme);
        if (route.params?.item) {
            setName(route.params.item.name);
            setTotal((route.params.item.total).toString());
            setCollected((route.params.item.collected).toString());
        }
    }, []);

    // Insert MoneyBox
    const __insert = () => {
        insertMoneyBox({
            name: name,
            total: parseFloat(total),
            collected: parseFloat(collected)
        });
    }

    // Update MoneyBox
    const __update = () => {
        updateMoneyBox({
            id: route.params.item.id,
            name: name,
            total: parseFloat(total),
            collected: parseFloat(collected)
        });
    }

    // Save MoneyBox
    const __save = () => {
        if (route.params?.item) {
            __update();
        }
        else {
            __insert();
        }
        navigation.goBack();
    }

    return (
        <View style={styles(theme).container}>
            {/* Header */}
            <BackHeader theme={theme} title={route.params?.item ? 'Edit MoneyBox' : 'New MoneyBox'} />

            {/* Body */}
            <ScrollView style={styles(theme).bodyContainer} showsVerticalScrollIndicator={false}>
                <View style={styles(theme).inputContainer}>
                    <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_DARK : Colors.BLACK }]}>Title</Text>
                    <TextInput
                        theme={theme}
                        value={name}
                        placeholder=''
                        keyboardType='default'
                        onChangeText={(text) => setName(text)}
                        style={[styles(theme).input, Typography.BODY]}
                        placeholderTextColor={theme.darkmode ? Colors.WHITE : Colors.LIGHT_BLACK} />
                </View>

                <View style={styles(theme).inputContainer}>
                    <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_DARK : Colors.BLACK }]}>Total</Text>
                    <TextInput
                        theme={theme}
                        value={total}
                        placeholder=''
                        keyboardType='numeric'
                        onChangeText={(text) => setTotal(text)}
                        style={[styles(theme).input, Typography.BODY]}
                        placeholderTextColor={theme.darkmode ? Colors.WHITE : Colors.LIGHT_BLACK} />
                </View>

                <View style={styles(theme).inputContainer}>
                    <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_DARK : Colors.BLACK }]}>Collected</Text>
                    <TextInput
                        theme={theme}
                        value={collected}
                        placeholder=''
                        keyboardType='numeric'
                        onChangeText={(text) => setCollected(text)}
                        style={[styles(theme).input, Typography.BODY]}
                        placeholderTextColor={theme.darkmode ? Colors.WHITE : Colors.LIGHT_BLACK} />
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles(theme).footerContainer}>
                <Button
                    theme={theme}
                    title='Save'
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
        borderRadius: 10,
        color: theme.darkmode ? Colors.WHITE : Colors.BLACK,
        backgroundColor: theme.darkmode ? Colors.LIGHT_BLACK : Colors.GRAY_MEDIUM
    },
    // Footer
    footerContainer: {
        padding: 20,
    },
});

export default AddMoneyBox;
