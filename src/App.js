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
import { getLanguage, storeLanguage, languages } from './utils/language.js';
import { getLocales } from "react-native-localize";

const App = () => {

  const { t, i18n } = useTranslation();
  const locale = getLocales();
  let arr = [];
  languages.map((item) => {
    arr.push(item.symbol);
  })
  const [language, setLanguage] = useState({
    id:  arr.indexOf(locale[0].languageCode) > 0 ? languages[arr.indexOf(locale[0].languageCode)].id : '1',
    name: arr.indexOf(locale[0].languageCode) > 0 ? languages[arr.indexOf(locale[0].languageCode)].name : 'English',
    symbol: arr.indexOf(locale[0].languageCode) > 0 ? locale[0].languageCode : 'en'
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
