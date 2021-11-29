import React, {Component} from 'react';

import {View, TouchableOpacity, Text, Button, SafeAreaView, StyleSheet,Dimensions,Image, TextInput, ScrollView, KeyboardAvoidingView} from 'react-native';

import {Picker} from '@react-native-picker/picker';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import sessionManager from '../../../sessions/manager';

import setter from '../../../api/setter';

import getter from '../../../api/getter';

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
  headerArea:{
    width:wp('90%'),
    height:hp('6%'),
    marginLeft:'auto',
    marginRight:'auto',
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  headingText:{
    fontSize:wp('5.5%'),
    fontFamily:'Nunito-SemiBold',
    color:'#00255E',
    flexGrow:6,
    textAlign:'center',
  },
  notifyIcon:{
    flexGrow:2,
    justifyContent:'center',
    alignItems:'center',
  },
  paymentCont:{
    width:wp('90%'),
    marginLeft:'auto',
    marginRight:'auto',
    justifyContent:'center',
    alignItems:'center'
  },
  paymentCard:{
    width:'100%',
    paddingTop:hp('2%'),
    paddingBottom:hp('2%'),
    paddingLeft:wp('5%'),
    paddingRight:wp('5%'),
    backgroundColor:'white',
    marginTop:hp('3%'),
    display:'flex',
    flexDirection:'row',
    elevation:1,
    alignItems:'center',
    marginBottom:hp('5%'),
  },
  cashText:{
    fontSize:wp('4.5%'),
    fontFamily:'Nunito-Regular',
    marginLeft:wp('3%'),
    color:'#707070',
  },
  subText:{
    fontSize:wp('3.8%'),
    fontFamily:'Nunito-Regular',
    color:'#707070',
  },
  ctnBtn:{
    borderRadius:30,
    width:wp('82%'),
    height:60,
    marginTop:hp('1%'),
    marginRight:'auto',
    marginLeft:'auto',
    justifyContent:'center',
    alignItems:'center',
    marginTop:hp('4%'),
  },
  btnText:{
    fontSize:wp('5%'),
    fontFamily:'Nunito-SemiBold',
  },
  touchArea:{
    paddingTop:hp('2%'),
    paddingBottom:hp('2%'),
    paddingLeft:hp('1%'),
    paddingRight:hp('1%'),
  }
});
export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {

    };
  }

  continueProcess(){

  }

  goBack(){
    this.props.navigation.goBack();
  }

  render(){
    return(
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.body}>
        <SafeAreaView>
          <View style={styles.headerArea}>
            <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()} style={styles.touchArea}>
              <Image source={require('../../../assets/images/icons/menu.png')} style={{width:wp('5%'),height:wp('5%')}} resizeMode={"contain"} />
            </TouchableOpacity>
            <Text style={styles.headingText}>Payment Method</Text>
            <TouchableOpacity style={styles.notifyIcon}>
              <FontAwesomeIcon icon={['fas','plus']} style={{color:'#FF4000'}} size={Math.floor(eval( wp('5%') ))}/>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.paymentCont}>
              <View style={styles.paymentCard}>
                <FontAwesomeIcon icon={['fas','money-bill']} style={{color:'#AAAAAA'}} size={Math.floor(eval( wp('5%') ))}/>
                <Text style={styles.cashText}>Cash</Text>
                <Image source={require('../../../assets/images/icons/vector1.png')} style={{width:wp('3.5%'),height:wp('3.5%'),marginLeft:wp('58%')}} resizeMode={"contain"}/>
              </View>

              <Text style={styles.subText}> Add your debit card for payment purposes</Text>
              <Text style={styles.subText}> You can remove the card at anytime.</Text>

              <TouchableOpacity activeOpacity={0.7} style={{...styles.ctnBtn, ...{backgroundColor:'#FF4800'}}} onPress={()=>this.continueProcess()}>
                <Text style={{...styles.btnText, ...{color:'#FFFFFF'} }}> Add Card </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>

    );
  }
}
