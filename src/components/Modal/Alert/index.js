import React from 'react';
import {
    View,
    Text
} from 'react-native';
import Lottie from 'lottie-react-native';
import Modal from "react-native-modal";
import { Colors, Typography } from "./../../../styles";
import Button from '../../Button';

const Alert = (props) => {

    const theme = props.theme;

    return (
        <Modal
            useNativeDriverForBackdrop
            swipeDirection={['down']}
            isVisible={props.isVisible}
            onBackButtonPress={() => { props.onClose(); }}
            onBackdropPress={() => { props.onClose(); }}
            style={{
                justifyContent: 'flex-end',
                margin: 0,
            }}
        >
            <View style={{
                backgroundColor: theme ? theme.darkmode ? Colors.DARK_BLACK : Colors.WHITE : Colors.DARK_BLACK,
                borderRadius: 20,
                padding: 20,
                height: "70%",
            }}>
                <View style={{ alignItems: 'center', padding: 30 }}>
                    {props.error ?
                        <Lottie style={{ width: 220 }} source={require('../../../assets/JSON/error.json')} autoPlay loop />
                        :
                        <Lottie style={{ width: 240 }} source={require('../../../assets/JSON/right.json')} autoPlay loop />
                    }
                </View>
                <View style={{ marginBottom: 10, padding: 20 }}>
                    <Text style={[Typography.H4, { textAlign: 'center', color: theme ? theme.darkmode ? Colors.WHITE : Colors.DARK_BLACK : Colors.WHITE }]}>{props.msg}</Text>
                </View>
                <View style={{ marginBottom: 10, padding: 20 }}>
                    <Button
                        title={props.error ? 'Close' : 'Got it!'}
                        primary
                        borderColor={Colors.BLACK}
                        color={Colors.BLACK}
                        onPress={() => props.onClick()} />
                </View>
            </View>
        </Modal>
    )
}

export default Alert;