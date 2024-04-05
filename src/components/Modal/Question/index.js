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
                backgroundColor: theme.darkmode ? Colors.DARK_BLACK : Colors.WHITE,
                borderRadius: 20,
                height: "70%",
            }}>
                <View style={{ alignItems: 'center', paddingVertical: 50 }}>
                    <Lottie style={{ width: 250 }} source={require('../../../assets/JSON/question.json')} autoPlay loop={false}/>
                </View>
                <View style={{ marginBottom: 10, paddingVertical: 20 }}>
                    <Text style={[Typography.H4, { textAlign: 'center', color: theme.darkmode ? Colors.WHITE : Colors.DARK_BLACK }]}>{props.msg}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 20
                }}>
                    <View style={{
                        width: "48%"
                    }}>
                        <Button
                            title={'No'}
                            primary
                            borderColor={Colors.BLACK}
                            color={Colors.BLACK}
                            onPress={() => props.onClose()} />
                    </View>
                    <View style={{
                        width: "48%"
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