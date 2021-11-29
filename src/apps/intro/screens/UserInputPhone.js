import React, {Component} from 'react';

import {View, TouchableOpacity, Text, Button, SafeAreaView, StyleSheet,Dimensions,Image, TextInput, NativeEventEmitter} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import auth from '@react-native-firebase/auth';


const styles = StyleSheet.create({
  body:{
    width:wp('100%'),
    height:hp('100%'),
    paddingTop:hp('8%'),
    paddingBottom:hp('8%'),
    paddingLeft:wp('6%'),
    paddingRight:wp('6%'),
    backgroundColor:'#f5f5f5',
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
    height:45,
    marginTop:hp('5%'),
    display:'flex',
    flexDirection:'row',
  },
  countryCode:{
    flexGrow:3.5,
    marginRight:wp('4%'),
    elevation:2,
    backgroundColor:'white',
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center',
  },
  phoneBox:{
    flexGrow:7,
    elevation:2,
    backgroundColor:'white',
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center',
    paddingLeft:wp('1.5%'),
    display:'flex',
    flexDirection:'row',
  },
  phoneCode:{
    fontFamily:"Nunito-SemiBold",
    fontSize:wp('4.8%'),
    flexGrow:1,
    textAlign:'center',
  },
  phoneInput:{
    flexGrow:7,
    fontSize:wp('4.5%'),
    paddingTop:hp('2%'),
    fontFamily:'Nunito-Regular',
  },
  ctnBtn:{
    borderRadius:30,
    width:wp('82%'),
    height:60,
    marginTop:hp('10%'),
    marginRight:'auto',
    marginLeft:'auto',
    justifyContent:'center',
    alignItems:'center',

  },
  btnText:{
    fontSize:wp('5%'),
    fontFamily:'Nunito-SemiBold',
  }
});
export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      phoneNo:'',
      confirmResult: null,
      verificationCode: '',
      userId: ''
    };
    this.eventMaster = new NativeEventEmitter();
  }

  setPhone(value){
    this.setState({
      phoneNo:value,
    });
  }

  verifyPhoneNoFormat(){
    var phn = this.state.phoneNo;
    if( (phn[0]==0) || ( (phn[0]!=7)&&(phn[0]!=8)&&(phn[0]!=9)) ){
      return false;
    }
    if( ((phn[0]==7))&&(phn[1]==1)  ){
      return false;
    }
    return true;
  }


  handleSendCode(){
    this.eventMaster.emit('appActivity',{state:1});
    // Request to send OTP
    if (this.verifyPhoneNoFormat()) {
        auth()
        .signInWithPhoneNumber("+234"+this.state.phoneNo,true)
        .then(confirmResult => {
          this.setState({ confirmResult })
          this.props.navigation.navigate('UserVerifyPhone',{phone:"+234"+this.state.phoneNo,confirmResult:confirmResult});
        })
        .catch(error => {
          //alert("An error occured, try again later");
          alert(error.message)

        })
        //this.eventMaster.emit('appActivity',{state:0});
        //this.props.navigation.navigate('UserVerifyPhone',{phone:"+234"+this.state.phoneNo,confirmResult:this.state.confirmResult});
    } else {
      alert('Invalid Phone Number');
      this.eventMaster.emit('appActivity',{state:0});
    }
  }


  continueProcess(){
    this.handleSendCode();
  }

  render(){
    return(
      <SafeAreaView style={styles.body}>
          <Text style={styles.topText}>Enter Your Phone Number</Text>
          <Text style={styles.subText}>Confirm your country code, then enter your phone number</Text>
          <View style={styles.phoneCont}>
            <TouchableOpacity style={styles.countryCode} activeOpacity={0.8}>
              <Image source={require('../../../assets/images/icons/flag.png')} style={{width:"70%",height:"70%"}} resizeMode={"contain"}/>
            </TouchableOpacity>
            <View style={styles.phoneBox}>
              <Text style={styles.phoneCode}>234</Text>
              <TextInput style={styles.phoneInput} placeholder={"Enter number here"} value={this.state.phoneNo} maxLength={10} keyboardType={"numeric"} onChangeText={(value)=>this.setPhone(value)}/>
            </View>
          </View>
          <TouchableOpacity activeOpacity={(this.state.phoneNo.length<10)?1:0.8} style={{...styles.ctnBtn, ...{backgroundColor:(this.state.phoneNo.length<10)?'#EEEEEE':'#FF4800'}}} onPress={()=>this.continueProcess()}>
            <Text style={{...styles.btnText, ...{color:(this.state.phoneNo.length<10)?'#707070':'#FFFFFF'} }}> Continue </Text>
          </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
