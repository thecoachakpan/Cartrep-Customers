import React, {Component} from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import {View, TouchableOpacity, Text, Button, SafeAreaView, StyleSheet,Dimensions,Image} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
//Import All Navigator Screens

import UserInputPhone from '../screens/UserInputPhone';
import UserVerifyPhone from '../screens/UserVerifyPhone';
import UserCompleteProfile from '../screens/UserCompleteProfile';
import AllowLocationAccess from '../screens/AllowLocationAccess';

const Stack = createStackNavigator();


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
      <SafeAreaView style={styles.body}>
        <Stack.Navigator initialRouteName="UserInputPhone" headerMode={"none"}>
          <Stack.Screen name="UserInputPhone" component={UserInputPhone} />
          <Stack.Screen name="UserVerifyPhone" component={UserVerifyPhone} />
          <Stack.Screen name="UserCompleteProfile" component={UserCompleteProfile} />
          <Stack.Screen name="AllowLocationAccess" component={AllowLocationAccess} />
        </Stack.Navigator>
      </SafeAreaView>
    );
  }
}
