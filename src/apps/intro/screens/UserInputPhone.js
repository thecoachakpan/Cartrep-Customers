import React, {Component} from 'react';

import {View, TouchableOpacity, Text, Button, SafeAreaView, StyleSheet,Dimensions,Image} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


const styles = StyleSheet.create({
  body:{
    width:wp('100%'),
    height:hp('100%')
  },
  topText:{
    fontSize:50,
  }
});
export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }




  render(){
    return(
      <SafeAreaView style={styles.body}>
        <Text>Enter Your Phone Number</Text>
      </SafeAreaView>
    );
  }
}
