import React, {Component} from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import {View, TouchableOpacity, Text, Button, SafeAreaView, StyleSheet,Dimensions,Image} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//Import Custom Drawer

import CustomDrawer from '../screens/CustomDrawer';


//Import All Navigator components
import HomeNavigator from './MainNavigator';
import HistoryNavigator from './HistoryNavigator';
import PaymentsNavigator from './PaymentsNavigator';
import SettingsNavigator from './SettingsNavigator';





const Drawer = createDrawerNavigator();


//Import Pre App Screens

const styles = StyleSheet.create({
  body:{
    width:wp('100%'),
    height:hp('100%'),
  },
});

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
        <Drawer.Navigator initialRouteName="HomeNavigator" screenOptions={{headerShown:false}} drawerStyle={{width:wp('80%')}} drawerContent={(props) => <CustomDrawer {...props} />} backBehaviour="none">
          <Drawer.Screen name="HomeNavigator" component={HomeNavigator}/>
          <Drawer.Screen name="HistoryNavigator" component={HistoryNavigator}/>
          <Drawer.Screen name="PaymentsNavigator" component={PaymentsNavigator}/>
          <Drawer.Screen name="SettingsNavigator" component={SettingsNavigator}/>
        </Drawer.Navigator>
    );
  }
}
