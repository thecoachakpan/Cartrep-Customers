import React, {Component} from 'react';

import {View, TouchableOpacity, Text, Button, SafeAreaView,BackHandler, StyleSheet,Dimensions,Image, TextInput, ScrollView, KeyboardAvoidingView, NativeEventEmitter} from 'react-native';

import {Picker} from '@react-native-picker/picker';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import BackgroundTimer from 'react-native-background-timer';

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
    justifyContent:'center',
  },
  subText:{
    fontSize:wp('4.3%'),
    fontFamily:'Nunito-Regular',
    color:'#707070',
    marginTop:10,
  },
  subText2:{
    fontSize:wp('4.2%'),
    fontFamily:'Nunito-Regular',
    color:'#FF4000',
    marginTop:10,
    width:wp('70%'),
    alignSelf:'center',
    textAlign:'center',
  },
  pageCont:{
    width:wp('90%'),
    height:hp('60%'),
    alignItems:'center',
  },
  textRow:{
    display:'flex',
    flexDirection:'row',
  },
  timeText:{
    fontSize:wp('4.3%'),
    fontFamily:'Nunito-Regular',
    color:'#FF4000',
    marginTop:10,
  },
  companyDetails:{
    width:'80%',
    borderRadius:wp('1%'),
    borderWidth:1,
    paddingTop:hp('1%'),
    paddingBottom:hp('1%'),
    paddingLeft:wp('4%'),
    paddingRight:wp('4%'),
    marginTop:hp('2%'),
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
  cancelBtn:{
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
  cancelBtnText:{
    fontSize:wp('4.5%'),
    fontFamily:'Nunito-Regular',
    color:'#FF4000',
  },
  textRow:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  rideText:{
    fontSize:wp('4.3%'),
    fontFamily:'Nunito-SemiBold',
    color:'#FF4000',
    marginTop:5,
  },
  starCont:{
    marginLeft:wp('2%'),
    marginRight:wp('2%'),
  },
});

export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      orderId:this.props.route.params.orderId,
      orderState:0,
      timer:'03:00',
      orderData:{}
    };

    this.counter;
    this.refreshOrderFunc;
    this.eventMaster = new NativeEventEmitter();
  }

  componentDidMount(){
    this.countdown();
    this.refreshOrderState();
    this.keepOrderAlive();
    BackHandler.addEventListener('hardwareBackPress',()=>{
      return true;
    });

    /*this.blurListener = this.props.navigation.addListener('blur',()=>{
      try{
        clearInterval(this.refreshOrderFunc);
        clearInterval(this.counter);
        clearInterval(this.keepAlive);
      }catch(err){

      }

    });*/
  }

  componentWillUnmount(){
    BackgroundTimer.stopBackgroundTimer();
    try{
      clearInterval(this.refreshOrderFunc);
      clearInterval(this.counter);
      clearInterval(this.keepAlive);
    }catch(err){

    }
  }

  keepOrderAlive(){
    BackgroundTimer.runBackgroundTimer(()=>{
      setter.keepOrderAlive(this.state.orderId).then(()=>{
      });
    },2000);
    /*this.keepAlive = setInterval(()=>{
      setter.keepOrderAlive(this.state.orderId).then(()=>{
      });
    },2000);*/
  }

  refreshOrderState(){
    this.refreshOrderFunc = setInterval(()=>{
      getter.getOrder(this.state.orderId).then((data)=>{
        if(data.vid!=''){
          this.setState({orderState:1,orderData:data});
          clearInterval(this.counter);
          this.setState({timer:'03:00'});
          this.countdown();
          clearInterval(this.refreshOrderFunc);
          //clearInterval(this.counter);
        }
      });
    },1000);
  }

  countdown(){
    this.counter = setInterval(()=>{
      var timer = this.state.timer;
      let minutes;
      let seconds;
      var timeSplit = timer.split(':');

      //Format timer string
      if(timeSplit[1][0]=='0'){
        timeSplit[1] = timeSplit[1][1];
      }

      if(eval(timeSplit[1])>0){
        seconds = eval(timeSplit[1]);
        seconds -= 1;
        if(seconds.toString().length==1){
          seconds = "0"+seconds.toString();
        }
        var newTime = [timeSplit[0],seconds];
        this.setState({timer:newTime.join(":")});
      }else{
        if(eval(timeSplit[0][1])>0){
          minutes = eval(timeSplit[0][1]);
          minutes-=1;
          minutes = "0"+minutes.toString();
          seconds = "59";

          var newTime = [minutes,seconds];
          this.setState({timer:newTime.join(":")});
        }else{
          clearInterval(this.counter);
          setter.refreshOrderState({orderId:this.state.orderId}).then(()=>{
            this.refreshOrderState();
            this.setState({orderState:0,timer:'03:00'});
            this.countdown();
          });
        }
      }
    },1000);
  }


  continueProcess(){
    clearInterval(this.refreshOrderFunc);
    clearInterval(this.counter);
    this.props.navigation.navigate('PaymentMethod',{order:this.state.orderData});
  }

  returnToIndex(){
    this.eventMaster.emit('appActivity',{state:1});
    setter.cancelOrder({oid:this.state.orderId}).then(()=>{
      clearInterval(this.refreshOrderFunc);
      clearInterval(this.counter);
      this.eventMaster.emit('appActivity',{state:0});
      this.props.navigation.navigate('FindDeliveryService',{});
    });
  }

  goBack(){
    this.props.navigation.goBack();
  }

  render(){
    return(
        <SafeAreaView style={styles.body}>
            <View style={styles.pageCont}>
              {(this.state.orderState==0)&&<Text style={styles.subText}> Please wait... </Text>}
                {(this.state.orderState==0)&&<Text style={styles.subText}>A  logistics service admin will contact you.</Text>}

              {(this.state.orderState==1)&&<Text style={styles.subText2}> Do not proceed to pay before being contacted by the delivery company</Text>}

              <View style={styles.textRow}>
                <Text style={styles.subText}>Rematching in </Text>
                <Text style={styles.timeText}>{this.state.timer}</Text>
              </View>

              {(this.state.orderState==1)&&<View style={styles.companyDetails}>
                <Text style={styles.subText}> {this.state.orderData.company_data.company_name} accepted your order </Text>
                <Text style={styles.subText}>Contact Info : {this.state.orderData.company_data.phone} </Text>
                <View style={{...styles.textRow,...{marginTop:hp('2%')}}}>
                  <TouchableOpacity style={styles.starCont} activeOpacity={0.7} >
                    <FontAwesomeIcon icon={['fas','star']} style={{color:(eval(this.state.orderData.company_data.rating)>=1)?'#FF4000':'#d5d5d5'}} size={Math.floor(eval( wp('5%') ))} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.starCont} activeOpacity={0.7} >
                    <FontAwesomeIcon icon={['fas','star']} style={{color:(eval(this.state.orderData.company_data.rating)>=2)?'#FF4000':'#d5d5d5'}} size={Math.floor(eval( wp('5%') ))} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.starCont} activeOpacity={0.7} >
                    <FontAwesomeIcon icon={['fas','star']} style={{color:(eval(this.state.orderData.company_data.rating)>=3)?'#FF4000':'#d5d5d5'}} size={Math.floor(eval( wp('5%') ))} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.starCont} activeOpacity={0.7} >
                    <FontAwesomeIcon icon={['fas','star']} style={{color:(eval(this.state.orderData.company_data.rating)>=4)?'#FF4000':'#d5d5d5'}} size={Math.floor(eval( wp('5%') ))} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.starCont} activeOpacity={0.7} >
                    <FontAwesomeIcon icon={['fas','star']} style={{color:(eval(this.state.orderData.company_data.rating)>=5)?'#FF4000':'#d5d5d5'}} size={Math.floor(eval( wp('5%') ))} />
                  </TouchableOpacity>
                </View>
              </View>}
              {(this.state.orderState==1)&&<TouchableOpacity activeOpacity={0.7} style={styles.ctnBtn} onPress={()=>this.continueProcess()}>
                <Text style={styles.btnText}> Proceed to Pay </Text>
              </TouchableOpacity>}
              <TouchableOpacity activeOpacity={0.7} style={styles.cancelBtn} onPress={()=>this.returnToIndex()}>
                <Text style={styles.cancelBtnText}> Cancel </Text>
              </TouchableOpacity>
            </View>
        </SafeAreaView>

    );
  }
}
