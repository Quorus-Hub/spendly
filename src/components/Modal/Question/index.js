import React from 'react';
import {
    View,
    Text
} from 'react-native';
import Lottie from 'lottie-react-native';
import Modal from "react-native-modal";
import { Colors, Typography } from "./../../../styles";
import Button from '../../Button';

const Question = (props) => {

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
                backgroundColor: Colors.WHITE,
                borderRadius: 20,
                height: "60%",
            }}>
                <View style={{ alignItems: 'center', paddingVertical: 30 }}>
                    <Lottie style={{ width: 200 }} source={require('../../../assets/JSON/question.json')} autoPlay />
                </View>
                <View style={{ marginBottom: 10, paddingVertical: 20 }}>
                    <Text style={[Typography.H4, { textAlign: 'center', color: Colors.DARK_BLACK }]}>{props.msg}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 20
                }}>
                    <View style={{
                        width: "50%"
                    }}>
                        <Button
                            title={'No'}
                            primary
                            borderColor={Colors.BLACK}
                            color={Colors.BLACK}
                            onPress={() => props.onClose()} />
                    </View>
                    <View style={{
                        width: "50%"
                    }}>
                        <Button
                            title={"Yes"}
                            tertiary
                            borderColor={Colors.BLACK}
                            color={Colors.WHITE}
                            onPress={() => props.onClick()} />
                            
                    </View>
                </View>

            </View>
        </Modal>
    )
}

export default Question;