import React, {Component} from 'react';

import {View, TouchableOpacity, Text, Button, SafeAreaView, StyleSheet,Dimensions,Image, TextInput, ScrollView, KeyboardAvoidingView} from 'react-native';

import {Picker} from '@react-native-picker/picker';

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
  mapCont:{
    width:wp('90%'),
    height:hp('40%'),
    marginLeft:'auto',
    marginRight:'auto',
    justifyContent:'center',
    alignItems:'center',
  },

  ctnBtn:{
    borderRadius:30,
    width:wp('82%'),
    height:60,
    marginTop:hp('5%'),
    marginRight:'auto',
    marginLeft:'auto',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#FF4000',
  },
  btnText:{
    fontSize:wp('4.5%'),
    fontFamily:'Nunito-Regular',
    color:'white',
  },
  manualBtn:{
    borderRadius:30,
    width:wp('82%'),
    height:60,
    marginTop:hp('2%'),
    marginRight:'auto',
    marginLeft:'auto',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'white',
    borderColor:'#FF4000',
    borderWidth:1,
  },
  manualBtnText:{
    fontSize:wp('4.5%'),
    fontFamily:'Nunito-Regular',
    color:'#FF4000',
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
      <SafeAreaView style={styles.body}>
          <Text style={styles.topText}>Allow Location Access</Text>
          <Text style={styles.subText}>Help us know you better by entering your details below</Text>

          <View style={styles.mapCont}>
              <Image source={require('../../../assets/images/icons/map.png')} style={{width:'60%',height:'60%'}} resizeMode={"contain"} />
          </View>

          <TouchableOpacity activeOpacity={0.7} style={styles.ctnBtn} onPress={()=>this.continueProcess()}>
            <Text style={styles.btnText}> Allow </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={styles.manualBtn} onPress={()=>{}}>
            <Text style={styles.manualBtnText}> Enter Manually </Text>
          </TouchableOpacity>
      </SafeAreaView>


    );
  }
}
