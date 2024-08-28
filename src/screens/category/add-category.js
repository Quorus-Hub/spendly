import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    Pressable
} from 'react-native';

import { Colors, Typography } from '../../styles';
import { insertCategory, updateCategory } from '../../dbHelpers/categoryHelper';
import { getTheme } from '../../utils/theme';
import { colors } from '../../utils/colors';
import { icons } from '../../utils/icons';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome5';

import Alert from '../../components/Modal/Alert';
import Button from '../../components/Button';
import BackHeader from '../../components/Headers/BackHeader';

const AddCategory = ({ navigation, route }) => {

    const { t } = route.params;

    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [colorSelected, setColorSelected] = useState('');
    const [icon, setIcon] = useState('');
    const [iconSelected, setIconSelected] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [showColor, setShowColor] = useState(false);
    const [showIcon, setShowIcon] = useState(false);
    const [theme, setTheme] = useState({});

    useEffect(() => {
        getTheme(setTheme);
        if (route.params?.item) {
            console.log('teste', route.params?.item)
            setName(route.params.item.name);
            setColor((route.params.item.color).toString());
            setIcon((route.params.item.icon).toString());
            setColorSelected(colors.filter((item) => {
                return item.color == route.params.item.color
            })[0]);
            setIconSelected(icons.filter((item) => {
                return item.icon == route.params.item.icon
            })[0]);
        }
    }, []);

    // Insert Category
    const __insert = () => {
        return insertCategory({
            name: name,
            color: color,
            icon: icon
        });
    }

    // Update Category
    const __update = () => {
        return updateCategory({
            id: route.params.item.id,
            name: name,
            color: color,
            icon: icon
        });
    }

    // Save Category
    const __save = () => {
        if (route.params?.item) {
            if (__update()) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
                navigation.goBack();
            }
        }
        else {
            if (__insert()) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
                navigation.goBack();
            }
        }
    }

    const __close = () => {
        setIsVisible(false);
    }

    // Toggle Modal
    const __toggleIconModal = () => {
        setShowIcon(!showIcon);
    };

    // Toggle Modal
    const __toggleColorModal = () => {
        setShowColor(!showColor);
    };

    // Change Color
    const __changeColor = (color) => {
        setColor(color.color);
        setColorSelected(color);
        __toggleColorModal();
    };

    // Change Icon
    const __changeIcon = (icon) => {
        setIcon(icon.icon);
        setIconSelected(icon);
        __toggleIconModal();
    };


    return (
        <View style={styles(theme).container}>
            {/* Header */}
            <BackHeader theme={theme} title={route.params?.item ? t('Edit Category') : t('New Category')} />
            {/* Modal */}
            <Alert isVisible={isVisible} msg={t('Please, write correct data.')} error={true} onClick={__close} theme={theme} t={t} />
            {/* Color */}
            <Modal
                useNativeDriverForBackdrop
                swipeDirection={['down']}
                isVisible={showColor}
                onBackButtonPress={() => { __toggleColorModal(); }}
                onBackdropPress={() => { __toggleColorModal(); }}
                style={{
                    justifyContent: 'flex-end',
                    margin: 0,
                }}
            >
                <View>
                    <ScrollView style={styles(theme).modalContainer} showsVerticalScrollIndicator={false} >
                        {colors.map((item, index) => (
                            <View key={index} style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Pressable style={styles(theme).rowColors} onPress={() => __changeColor(item)} >
                                    <View style={{
                                        width: 300,
                                        height: 50,
                                        borderRadius: 20,
                                        backgroundColor: item.color,
                                        alignItems: 'center',
                                        alignSelf: "center",
                                        justifyContent: 'center'
                                    }}>
                                    </View>
                                </Pressable>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </Modal>
            {/* Icon */}
            <Modal
                useNativeDriverForBackdrop
                swipeDirection={['down']}
                isVisible={showIcon}
                onBackButtonPress={() => { __toggleIconModal(); }}
                onBackdropPress={() => { __toggleIconModal(); }}
                style={{
                    justifyContent: 'flex-end',
                    margin: 0,
                }}
            >
                <View>
                    <ScrollView style={styles(theme).modalContainer} showsVerticalScrollIndicator={false} >
                        <View style={{
                            justifyContent: 'flex-start',
                            flexDirection: 'row',
                            flexWrap: 'wrap'
                        }}>
                            {icons.map((item) => (
                                <Pressable style={styles(theme).rowIcons} onPress={() => __changeIcon(item)} >
                                    <View style={[styles(theme).iconContainer, { backgroundColor: theme.darkmode ? Colors.GRAY_DARK : Colors.GRAY_MEDIUM}]}>
                                        <Icon name={item.icon} color={theme.darkmode ? Colors.BLACK : Colors.BLACK} size={25} />
                                    </View>
                                </Pressable>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </Modal>
            {/* Body */}
            <ScrollView style={styles(theme).bodyContainer} showsVerticalScrollIndicator={false}>
                <View style={styles(theme).inputContainer}>
                    <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_DARK : Colors.BLACK }]}>{t("Name")}</Text>
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
                    <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_DARK : Colors.BLACK }]}>{t("Color")}</Text>
                    <TouchableOpacity
                        onPress={() => setShowColor(true)}
                        style={[styles(theme).input, { paddingTop: 15, paddingBottom: 15 }]}>
                        <View style={{
                            flexDirection: "row"
                        }}>
                            <Text style={[Typography.BODY, { color: theme.darkmode ? Colors.WHITE : Colors.LIGHT_BLACK }]}>{t(colorSelected.name)}</Text>
                            <View style={{
                                marginLeft: 10,
                                width: 20,
                                height: 20,
                                borderRadius: 10,
                                backgroundColor: colorSelected.color,
                            }}></View>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles(theme).inputContainer}>
                    <Text style={[Typography.TAGLINE, { color: theme.darkmode ? Colors.GRAY_DARK : Colors.BLACK }]}>{t("Icon")}</Text>
                    <TouchableOpacity
                        onPress={() => setShowIcon(true)}
                        style={[styles(theme).input, { paddingTop: 15, paddingBottom: 15 }]}>
                        <View style={{
                            flexDirection: "row"
                        }}>
                            <Text style={[Typography.BODY, { color: theme.darkmode ? Colors.WHITE : Colors.LIGHT_BLACK, paddingRight: 10 }]}>{t(iconSelected.name)}</Text>
                                <Icon name={iconSelected.icon} color={theme.darkmode ? Colors.WHITE : Colors.BLACK} size={15} />
                        </View>
                    </TouchableOpacity>
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
    rowColors: {
        marginTop: 10,
        flexDirection: 'row',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowIcons: {
        margin: 10,
        flexDirection: 'column',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
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
    // Modal 
    modalContainer: {
        height: '60%',
        width: "100%",
        margin: 0,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 20,
        backgroundColor: theme.darkmode ? Colors.BLACK : Colors.GRAY_MEDIUM,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AddCategory;
