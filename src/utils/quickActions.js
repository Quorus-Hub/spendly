import React from 'react';
import {
    View,
    Pressable,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Colors } from '../styles';

const QuickActions = (item, updateItem, deleteItem, theme) => {
    return (
        <View style={styles.container}>
            <View style={[styles.button, {marginLeft: 10, backgroundColor: Colors.SUCCESS}]}>
                <TouchableOpacity onPress={() => updateItem(item)}>
                    <Icon name="pen" color={theme.darkmode ? Colors.BLACK : Colors.WHITE} size={15} />
                </TouchableOpacity>
            </View>
            <View style={[styles.button, {backgroundColor: Colors.ALERT, marginLeft: 10}]}>
                <TouchableOpacity onPress={() => deleteItem(item.id)}>
                    <Icon name="trash" color={theme.darkmode ? Colors.BLACK : Colors.WHITE} size={15} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        width: 60,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default QuickActions;