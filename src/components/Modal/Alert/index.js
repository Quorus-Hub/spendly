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

    return (
        <Modal
            hasBackdrop={false}
            isVisible={props.isVisible}
        >
            <View style={{
                backgroundColor: Colors.WHITE,
                borderRadius: 20,
                width: 330,
                height: 250,
                padding: 20,
            }}>
                <View style={{ alignItems: 'center' }}>
                    {props.error ?
                        <Lottie style={{ width: 110 }} source={require('../../../assets/JSON/error.json')} autoPlay loop />
                        :
                        <Lottie style={{ width: 110 }} source={require('../../../assets/JSON/right.json')} autoPlay loop />
                    }
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={[Typography.H4, { textAlign: 'center', color: Colors.DARK_BLACK }]}>{props.msg}</Text>
                </View>
                <Button
                    title={props.error ? 'Close' : 'Got it!'}
                    primary
                    borderColor={Colors.BLACK}
                    color={Colors.BLACK}
                    onPress={() => props.onClick()} />

            </View>
        </Modal>
    )
}

export default Alert;