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

import Alert from '../../components/Modal/Alert';
import Button from '../../components/Button';
import BackHeader from '../../components/Headers/BackHeader';

const AddMoneyBox = ({ navigation, route }) => {

    const { t } = route.params;

    const [name, setName] = useState('');
    const [total, setTotal] = useState(0);
    const [collected, setCollected] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
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
        return insertMoneyBox({
            name: name,
            total: total.length > 0 ? parseFloat(total) : 0,
            collected: collected.length > 0 ? parseFloat(collected) : 0
        });
    }

    // Update MoneyBox
    const __update = () => {
       return updateMoneyBox({
            id: route.params.item.id,
            name: name,
            total: total.length > 0 ? parseFloat(total) : 0,
            collected: collected.length > 0 ? parseFloat(collected) : 0
        });
    }

    // Save MoneyBox
    const __save = () => {
        if (route.params?.item) {
            if(__update()){
                setIsVisible(true);
            }else{
                setIsVisible(false); 
                navigation.goBack();
            }
        }
        else {
            if(__insert()){
                setIsVisible(true);
            }else{
                setIsVisible(false); 
                navigation.goBack();
            }
        }
    }

    const __close = () => {
        setIsVisible(false);
    }

    return (
        <View style={styles(theme).container}>
            {/* Header */}
            <BackHeader theme={theme} title={route.params?.item ? t('Edit MoneyBox') : t('New MoneyBox')} />
            {/* Modal */}
            <Alert isVisible={isVisible} msg={t('Please, write correct data.')} error={true} onClick={__close} theme={theme} t={t}/>
            {/* Body */}
            <ScrollView style={styles(theme).bodyContainer} showsVerticalScrollIndicator={false}>
                <View style={styles(theme).inputContainer}>
                    <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_DARK : Colors.BLACK }]}>{t("Title")}</Text>
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
                    <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_DARK : Colors.BLACK }]}>{t("Total")}</Text>
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
                    <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_DARK : Colors.BLACK }]}>{t("Collected")}</Text>
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
                    title={t('Save')}
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
