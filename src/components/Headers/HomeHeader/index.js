import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import routes from '../../../config/routes';
import { Colors, Typography } from '../../../styles';
import AuthContext from '../../../context/AuthContext';
import TextAvatar from 'react-native-text-avatar';

const HomeHeader = (props) => {
    const navigation = useNavigation();
    const theme = props.theme;

    const { state } = React.useContext(AuthContext);

    // Get User
    const user = state.user != null ? state.user.length > 0 ? JSON.parse(state.user) : state.user : { name: '', joined: Date.now() };
    const date = new Date(user.joined);
    const avatar =  state.user != null ? user.name != null ?  user.name.split(' ') : user.email.split(' ') : "";
    const nameAvatar = avatar ? avatar[0][0] : "";

    return (
        <View style={styles(theme).container}>
            <View style={{ paddingRight: 10 }}>
                <TextAvatar
                    backgroundColor={Colors.PRIMARY}
                    textColor={Colors.DARK_BLACK}
                    size={50}
                    type="circle"
                >
                    {nameAvatar}
                </TextAvatar>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={[Typography.TAGLINE, { color: Colors.GRAY_DARK }]}>Welcome back,</Text>
                <Text style={[Typography.H2, { color: Colors.WHITE }]}>{user.name}</Text>
            </View>
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate(routes.Notifications)} >
                <Icon name="bell" color={Colors.WHITE} size={25} />
            </TouchableOpacity>
        </View>
    );
};

const styles = (theme) => StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.darkmode ? Colors.BLACK : Colors.LIGHT_BLACK
    },
});

export default HomeHeader;
