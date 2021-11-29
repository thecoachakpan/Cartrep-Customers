import React, {Component} from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import {View, TouchableOpacity, Text, Button, SafeAreaView, StyleSheet,Dimensions,Image} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
//Import All Navigator Screens

import FindDeliveryService from '../screens/FindDeliveryService';
import InputItemDetails from '../screens/InputItemDetails';
import ConfirmRide from '../screens/ConfirmRide';
import AwaitRideResponse from '../screens/AwaitRideResponse';
import RateRide from '../screens/RateRide';
import EditDetails from '../screens/EditDetails';
import PaymentMethod from '../screens/PaymentMethod2';

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
        <Stack.Navigator initialRouteName="FindDeliveryService" headerMode={"none"}>
          <Stack.Screen name="FindDeliveryService" component={FindDeliveryService} />
          <Stack.Screen name="InputItemDetails" component={InputItemDetails} />
          <Stack.Screen name="ConfirmRide" component={ConfirmRide} />
          <Stack.Screen name="AwaitRideResponse" component={AwaitRideResponse} />
          <Stack.Screen name="RateRide" component={RateRide} />
          <Stack.Screen name="EditDetails" component={EditDetails} />
          <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
        </Stack.Navigator>
      </SafeAreaView>
    );
  }
}
