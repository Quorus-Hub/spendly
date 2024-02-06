import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import Google from './../../assets/images/google.png'

import { Colors, Typography } from '../../styles';

const Button = (props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={props.secondary ? styles.secondary : styles.primary}
            onPress={props.onPress}>
            {props.google ?
                <Image
                    source={Google}
                    style={{
                        alignSelf: "flex-start",
                        height: 20,
                        width: 20,
                        marginRight: 10,
                    }}
                />
                : <></>}
            <Text style={[Typography.H3, { color: props.color ? props.color : Colors.WHITE }]}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    primary: {
        padding: 10,
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: Colors.PRIMARY
    },
    secondary: {
        padding: 10,
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: Colors.GRAY_LIGHT
    },
});

export default Button;
