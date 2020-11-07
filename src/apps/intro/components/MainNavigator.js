import React, {Component} from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import {View, TouchableOpacity, Text, Button, SafeAreaView, StyleSheet,Dimensions,Image} from 'react-native';
//Import All Navigator Screens

import UserInputPhone from '../screens/UserInputPhone';

const Stack = createStackNavigator();


//Import Pre App Screens



export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return(
      <SafeAreaView>
        <Stack.Navigator initialRouteName="UserInputPhone">
          <Stack.Screen name="UserInputPhone" component={UserInputPhone} />
        </Stack.Navigator>
      </SafeAreaView>
    );
  }
}
