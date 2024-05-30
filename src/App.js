import React, { useEffect, useState } from 'react';
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
import { getLanguage, storeLanguage } from './utils/language.js';

const App = () => {

  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState({
    id: '1',
    name: 'English',
    symbol: 'en'
  });


  useEffect(() => {
    getLanguage(setLanguage)
  }, []);

  useEffect(() => {
    if (language && language.symbol) {
      storeLanguage(language);
      i18n.changeLanguage(language.symbol);
    }

  }, [language]);

  return (
    <AuthProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.BLACK} />
        <RootNavigator t={t} i18n={i18n} />
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
