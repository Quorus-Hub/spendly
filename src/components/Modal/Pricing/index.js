import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import Lottie from 'lottie-react-native';
import Modal from "react-native-modal";
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors, Typography } from "./../../../styles";
import Button from '../../Button';

const Pricing = (props) => {

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
            <LinearGradient colors={[Colors.DARK_BLACK, Colors.BLACK, Colors.GRAY_BLUE]}>
                <View style={{
                    borderRadius: 20,
                    height: "100%",
                }}>
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        padding: 20
                    }}
                    onPress={() => props.onClose()}>
                        <Icon name="close-outline" color={Colors.GRAY_DARK} size={30} />
                    </TouchableOpacity>
                    <View style={{ paddingTop: 50, marginBottom: -80 }}>
                        <Text style={[Typography.H4, { textAlign: 'center', color: Colors.WHITE }]}>{"Choose your plan"}</Text>
                    </View>
                    <View style={{ alignItems: 'center', paddingVertical: 50 }}>
                        <Lottie style={{ width: 250 }} source={require('../../../assets/JSON/pig1.json')} autoPlay />
                    </View>
                    <View style={{ marginTop: -30 }}>
                        <Text style={[Typography.H1, { textAlign: 'center', color: Colors.WHITE }]}>{"Spendly Plus"}</Text>
                    </View>
                    {/* <View style={{
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
                    </View> */}

                </View>
            </LinearGradient>
        </Modal>
    )
}

export default Pricing;