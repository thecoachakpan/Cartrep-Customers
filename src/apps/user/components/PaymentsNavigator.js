import React, {Component} from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import {View, TouchableOpacity, Text, Button, SafeAreaView, StyleSheet,Dimensions,Image} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
//Import All Navigator Screens

import PaymentMethod from '../screens/PaymentMethod2';
import AddCard from '../screens/AddCard';
import AddCardLoading from '../screens/AddCardLoading';
import AddCardSuccess from '../screens/AddCardSuccess';


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
        <Stack.Navigator initialRouteName="PaymentMethod" headerMode={"none"}>
          <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
          <Stack.Screen name="AddCard" component={AddCard} />
          <Stack.Screen name="AddCardLoading" component={AddCardLoading} />
          <Stack.Screen name="AddCardSuccess" component={AddCardSuccess} />
        </Stack.Navigator>
      </SafeAreaView>
    );
  }
}
