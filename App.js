import React, {Fragment, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import Main from './src/components/Main';
import { MenuProvider } from 'react-native-popup-menu';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
  AppRegistry,
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

const App: () => React$Node = () => {
  // useEffect( () => {
  //   SplashScreen.hide();
  // }, []);
  return (
    <MenuProvider>
      <Main />
    </MenuProvider>
  );
};

const styles = StyleSheet.create({

});

export default App;
