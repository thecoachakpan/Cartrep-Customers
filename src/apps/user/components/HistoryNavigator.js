import React, {Component} from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import {View, TouchableOpacity, Text, Button, SafeAreaView, StyleSheet,Dimensions,Image} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
//Import All Navigator Screens

import DeliveryHistory from '../screens/DeliveryHistory';
import OrderDetails from '../screens/OrderDetails';


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
        <Stack.Navigator initialRouteName="DeliveryHistory" headerMode={"none"}>
          <Stack.Screen name="DeliveryHistory" component={DeliveryHistory} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} />
        </Stack.Navigator>
      </SafeAreaView>
    );
  }
}
