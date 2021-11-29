
import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Loader from './src/loader.js'


const App: () => React$Node = () => {
  return (
    <>
    <StatusBar barStyle="dark-content" />
    <NavigationContainer>{
      <SafeAreaView>
        <Loader></Loader>
      </SafeAreaView>
    }</NavigationContainer>

    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
