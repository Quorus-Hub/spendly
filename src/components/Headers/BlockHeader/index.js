import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { Colors, Typography } from '../../../styles';

const BlockHeader = (props) => {

    const theme = props.theme;
    const t = props.t;

    return (
        <View style={styles(theme).container}>
            <Text style={[Typography.H1, {color: theme.darkmode ? Colors.WHITE : Colors. BLACK}]}>{props.title}</Text>
            
            {props?.onPress ?
                <Pressable 
                    style={styles(theme).rowContainer}
                    onPress={props.onPress}>
                        <Text style={[Typography.TAGLINE, {color: theme.darkmode ? Colors.GRAY_MEDIUM : Colors.BLACK, marginRight: 5}]}>{t("All")}</Text>
                        <Icon name="chevron-right" color={theme.darkmode ? Colors.GRAY_MEDIUM : Colors.BLACK} size={10} />
                </Pressable>
            : null}
        </View>
    );
};

const styles = (theme) => StyleSheet.create({
    container: {
        marginTop: 20,
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
 
export default BlockHeader;
 