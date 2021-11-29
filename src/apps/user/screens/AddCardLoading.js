import React, {Component} from 'react';

import {View, TouchableOpacity, Text, Button, SafeAreaView, StyleSheet,Dimensions,Image, TextInput, ScrollView, KeyboardAvoidingView, Animated, Easing} from 'react-native';

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
  loadingCont:{
    width:wp('17%'),
    height:wp('17%'),
    marginTop:hp('2%'),
    marginBottom:hp('2%'),
  },
  fadedCircle:{
    backgroundColor:'#FFECE6',
    width:'100%',
    height:'100%',
    position:'absolute',
    borderRadius:wp('12%'),
  },
  saturatedSemiCircle:{
    backgroundColor:'#FF4800',
    width:'100%',
    height:'50%',
    borderTopLeftRadius:wp('12%'),
    borderTopRightRadius:wp('12%'),
    position:'absolute',
  },
  innerCircle:{
    width:'80%',
    height:'80%',
    backgroundColor:'white',
    borderRadius:wp('8%'),
  }
});
export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      cardNo:'',
      expiry:'',
      cvv:'',
    };
    this.deg = new Animated.Value(0);
  }

  componentDidMount(){
    this.runAnimation();
    var cardData = this.props.route.params.cardData;
    cardData['uid'] = sessionManager.getUserData().uid;
    setter.addCard(cardData).then(()=>{
      this.props.navigation.navigate('AddCardSuccess');
    });
  }

  runAnimation() {
    Animated.loop(
      Animated.timing(this.deg, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        delay:0,
        useNativeDriver: true
      })
    ).start();
  }

  continueProcess(){

  }

  goBack(){
    this.props.navigation.goBack();
  }

  render(){
    const spin = this.deg.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    return(
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.body}>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.paymentCont}>
                <Text style={styles.headingText}> Adding Card</Text>
                <Animated.View style={[styles.loadingCont, {transform:[{rotate:spin}]}]}>
                  <View style={styles.fadedCircle}>
                  </View>
                  <View style={styles.saturatedSemiCircle}>
                  </View>
                  <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                      <View style={styles.innerCircle}></View>
                  </View>
                </Animated.View>
                <Text style={styles.subText}>This will take a few seconds</Text>
                <Text style={styles.subText}>Please wait.</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>

    );
  }
}
