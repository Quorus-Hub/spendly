import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar
} from 'react-native';

import { Colors } from './styles';

import RootNavigator from './navigations';
import AuthProvider from './context/AuthProvider';
import './utils/languages/i18n.js';
import { useTranslation } from 'react-i18next';

const App = () => {

  const { t, i18n } = useTranslation();

  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.BLACK} />
        <RootNavigator t={t} i18n={i18n}/>
      </SafeAreaView>
    </AuthProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
