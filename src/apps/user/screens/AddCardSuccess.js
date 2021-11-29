import React, {Component} from 'react';

import {View, TouchableOpacity, Text, Button, SafeAreaView, StyleSheet,Dimensions,Image, TextInput, ScrollView, KeyboardAvoidingView} from 'react-native';

import {Picker} from '@react-native-picker/picker';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


const styles = StyleSheet.create({
  body:{
    width:wp('100%'),
    height:hp('100%'),
    paddingTop:hp('2%'),
    paddingBottom:hp('4%'),
    paddingLeft:wp('6%'),
    paddingRight:wp('6%'),
    backgroundColor:'#f5f5f5',
  },
  headingText:{
    fontSize:wp('5.2%'),
    fontFamily:'Nunito-SemiBold',
    color:'#00255E',
  },
  paymentCont:{
    width:wp('90%'),
    height:hp('70%'),
    marginLeft:'auto',
    marginRight:'auto',
    justifyContent:'center',
    alignItems:'center',
    justifyContent:'center',
  },
  subText:{
    fontSize:wp('3.8%'),
    fontFamily:'Nunito-Regular',
    color:'#707070',
  },
  ctnBtn:{
    borderRadius:wp('2%'),
    width:wp('87%'),
    height:60,
    marginTop:hp('1%'),
    justifyContent:'center',
    alignItems:'center',
    marginTop:hp('6%'),
  },
  btnText:{
    fontSize:wp('5%'),
    fontFamily:'Nunito-SemiBold',
  },
});
export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }

  continueProcess(){
    this.props.navigation.navigate('PaymentMethod');
  }

  goBack(){
    this.props.navigation.goBack();
  }

  render(){
    return(
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.body}>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.paymentCont}>
                <Image source={require('../../../assets/images/icons/Group1.png')} style={{width:'50%',height:'50%',marginBottom:hp('4%')}} resizeMode={"contain"} />
                <Text style={styles.subText}>Your card has been successfully added.</Text>
                <TouchableOpacity activeOpacity={0.7} style={{...styles.ctnBtn, ...{backgroundColor:'#FF4800'}}} onPress={()=>this.continueProcess()}>
                  <Text style={{...styles.btnText, ...{color:'#FFFFFF'} }}>Done</Text>
                </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>

    );
  }
}
