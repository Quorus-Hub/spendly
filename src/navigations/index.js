import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import routes from '../config/routes';
import { Colors, Typography } from '../styles';
import AuthContext from '../context/AuthContext';

// Import Screens
import Home from '../screens/home';
import Transactions from '../screens/transactions';
import MoneyBox from '../screens/moneybox';
import Category from '../screens/category';
import Wallet from '../screens/wallet';
import Settings from '../screens/settings';
import Notifications from '../screens/home/notifications';
import AddMoneyBox from '../screens/moneybox/add-money-box';
import AddCategory from '../screens/category/add-category';
import AddTransaction from '../screens/transactions/add-transaction';
import AddWallet from '../screens/wallet/add-wallet';
import Splash from '../screens/splash';
import GetStarted from '../screens/auth';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import Password from '../screens/auth/password';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// Bottom Tab Bar Navigator

function MyTabs({ navigation, route }) {

  const { t, i18n } = route.params;

  return (
    <Tab.Navigator
      initialRouteName={routes.Home}
      activeColor={Colors.WHITE}
      inactiveColor={Colors.GRAY_DARK}
      barStyle={[Typography.BODY, { backgroundColor: Colors.LIGHT_BLACK, borderTopWidth: 0.3, borderColor: Colors.DARK_BLACK }]}>
      <Tab.Screen
        name={routes.Home}
        component={Home}
        initialParams={{ t: t, i18n: i18n }} 
        options={{
          tabBarLabel: <Text style={[Typography.TAGLINE, { color: Colors.WHITE }]}>{t(routes.Home)}</Text>,
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={23} />
          ),
        }} />
      <Tab.Screen
        name={routes.Transactions}
        component={Transactions}
        initialParams={{ t: t, i18n: i18n }} 
        options={{
          tabBarLabel: <Text style={[Typography.TAGLINE, { color: Colors.WHITE }]}>{t(routes.Transactions)}</Text>,
          tabBarIcon: ({ color }) => (
            <Icon name="repeat" color={color} size={23} />
          ),
        }} />
      <Tab.Screen
        name={routes.MoneyBox}
        component={MoneyBox}
        initialParams={{ t: t, i18n: i18n }} 
        options={{
          tabBarLabel: <Text style={[Typography.TAGLINE, { color: Colors.WHITE }]}>{t(routes.MoneyBox)}</Text>,
          tabBarIcon: ({ color }) => (
            <Icon name="gift" color={color} size={23} />
          ),
        }} />
      <Tab.Screen
        name={routes.Settings}
        component={Settings}
        initialParams={{ t: t, i18n: i18n }} 
        options={{
          tabBarLabel: <Text style={[Typography.TAGLINE, { color: Colors.WHITE }]}>{t(routes.Settings)}</Text>,
          tabBarIcon: ({ color }) => (
            <Icon name="settings" color={color} size={23} />
          ),
        }} />
    </Tab.Navigator>
  );
}

const RootNavigator = (props) => {
  const { state } = React.useContext(AuthContext);

  const { t, i18n } = props;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!state || state.isLoading ?
          <Stack.Screen name={routes.Splash} component={Splash} />
          : state.user == null ?
            <>
              <Stack.Screen name={routes.GetStarted} component={GetStarted} initialParams={{ t: t, i18n: i18n }} />
              <Stack.Screen name={routes.Login} component={Login} initialParams={{ t: t, i18n: i18n }} />
              <Stack.Screen name={routes.Register} component={Register} initialParams={{ t: t, i18n: i18n }} />
              <Stack.Screen name={routes.Password} component={Password} initialParams={{ t: t, i18n: i18n }} />
            </>
            :
            <>
              <Stack.Screen name='MyTabs' component={MyTabs} initialParams={{ t: t, i18n: i18n }} />
              <Stack.Screen name={routes.Notifications} component={Notifications} initialParams={{ t: t, i18n: i18n }} />
              <Stack.Screen name={routes.AddTransaction} component={AddTransaction} initialParams={{ t: t, i18n: i18n }} />
              <Stack.Screen name={routes.AddMoneyBox} component={AddMoneyBox} initialParams={{ t: t, i18n: i18n }} />
              <Stack.Screen name={routes.AddCategory} component={AddCategory} initialParams={{ t: t, i18n: i18n }} />
              <Stack.Screen name={routes.Category} component={Category} initialParams={{ t: t, i18n: i18n }} />
              <Stack.Screen name={routes.Wallet} component={Wallet} initialParams={{ t: t, i18n: i18n }} />
              <Stack.Screen name={routes.AddWallet} component={AddWallet} initialParams={{ t: t, i18n: i18n }} />
            </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;