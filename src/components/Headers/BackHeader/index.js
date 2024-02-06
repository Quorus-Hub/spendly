import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Colors, Typography } from '../../../styles';

const BackHeader = (props) => {
    const navigation = useNavigation();
    const theme = props.theme;

    return (
        <View style={styles(theme).container}>
            <TouchableOpacity
                activeOpacity={0.8}
                style={{padding: 5, alignItems: 'flex-start'}}
                onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" color={theme.darkmode ? Colors.WHITE : Colors.BLACK} size={20} />
            </TouchableOpacity>

            <Text style={[Typography.H3, {color: theme.darkmode ? Colors.WHITE : Colors.BLACK}]}>{props.title}</Text>
            
            <Icon name="chevron-right" color={theme.darkmode ? Colors.BLACK : Colors.GRAY_THIN} size={25} />
        </View>
    );
};

const styles = (theme) => StyleSheet.create({
    container: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.darkmode ? Colors.BLACK : Colors.GRAY_THIN
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});
 
export default BackHeader;
 