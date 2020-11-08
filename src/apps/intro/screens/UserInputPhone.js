import React, {Component} from 'react';

import {View, TouchableOpacity, Text, Button, SafeAreaView, StyleSheet,Dimensions,Image} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


const styles = StyleSheet.create({
  body:{
    width:wp('100%'),
    height:hp('100%'),
    paddingTop:hp('8%'),
    paddingBottom:hp('8%'),
    paddingLeft:wp('6%'),
    paddingRight:wp('6%'),
  },
  topText:{
    fontSize:wp('6%'),
    fontFamily:'Nunito-SemiBold',
    marginTop:hp('1%'),
    marginBottom:hp('1%'),
  },
  subText:{
    fontSize:wp('3.2%'),
    fontFamily:'Nunito-Regular',
    color:'#707070',
    marginTop:hp('1%'),
    marginBottom:hp('1%'),
  },
  phoneCont:{
    width:wp('85%'),
    height:40,
    marginTop:hp('5%'),
    backgroundColor:'blue',
  },
  ctnBtn:{
    borderRadius:20,
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
          <Text style={styles.topText}>Enter Your Phone Number</Text>
          <Text style={styles.subText}>Confirm your country code, then enter your phone number</Text>
          <View style={styles.phoneCont}>

          </View>

          <TouchableOpacity style={styles.ctnBtn}>
            
          </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
