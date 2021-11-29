import React, {Component} from 'react';

import {View, TouchableOpacity, Text, Button, SafeAreaView, StyleSheet,Dimensions,Image, TextInput, NativeEventEmitter} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import auth from '@react-native-firebase/auth';

import getter from '../../../api/getter';

import sessionManager from '../../../sessions/manager';

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
  row:{
    display:'flex',
    flexDirection:'row',
    width:wp('80%'),
  },
  subText:{
    fontSize:wp('3.2%'),
    fontFamily:'Nunito-Regular',
    color:'#707070',
    marginTop:hp('1%'),
    marginBottom:hp('1%'),
  },
  changeText:{
    fontSize:wp('3.2%'),
    fontFamily:'Nunito-SemiBold',
    color:'#FF4800',
    marginTop:hp('1%'),
    marginBottom:hp('1%'),
  },
  boxInputs:{
    width:wp('80%'),
    display:'flex',
    flexDirection:'row',
    marginTop:hp('8%'),
    marginBottom:hp('6%'),
    paddingLeft:wp('2%'),
    paddingRight:wp('2%'),
    marginLeft:'auto',
    marginRight:'auto',
  },
  box:{
    width:wp('10%'),
    height:wp('10%'),
    borderRadius:5,
    backgroundColor:'white',
    borderWidth:1,
    fontSize:wp('4%'),
    textAlign:'center',
    fontFamily:'Nunito-Regular',
    fontWeight:'600',
    marginLeft:wp('2%'),
    marginRight:wp('2%'),
  },
  inputBox:{
    fontSize:wp('3.8%'),
    textAlign:'center',
    fontFamily:'Nunito-Regular',
    fontWeight:'600',
    borderRadius:5,
    backgroundColor:'white',
    borderWidth:1,
    borderColor:'silver',
    width:'100%',
  },
  codeTextRow:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
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
      phoneNo:this.props.route.params.phone,
      vcode:['','','','','',''],
      confirmResult:this.props.route.params.confirmResult,
      verificationCode:'',
      userId:'',
      timer:'05:00',
    };

    this.inputs=[0,0,0,0,0,0];
    this.eventMaster = new NativeEventEmitter();
    this.counter;
    this.countdown();
  }

  componentDidMount(){
      this.eventMaster.emit('appActivity',{state:0});
      this.automaticAuth();
  }
  componentWillUnmount(){
    clearInterval(this.counter);
  }

  continueProcess(){

    //if(this.checkCodeCount()){
      //this.props.navigation.navigate('UserCompleteProfile',{phone:this.props.route.params.phone});
    //}
    this.handleVerifyCode();
  }


  checkValue(value){
    try{
      eval(value);
      this.setState({verificationCode:value});
    }catch(err){

    }
  }

  checkCodeCount(){
    var vcode = this.state.vcode;
    for(var i in vcode){
      if(vcode[i]==''){
        return false;
        break;
      }
    }
    return true;
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
        }
      }
    },1000);
  }

  inputCodeSegment(index,value){
    try{
      if(value!=''){
        eval(value);
      }

      if((eval(value)>=0)&&(eval(value)<=9)){
        var vcode =  this.state.vcode;
        vcode[index] = value;
        var verificationCode = '';
        for(var i in vcode){
          verificationCode+=vcode[i];
        }
        this.setState({
          vcode:vcode,
          verificationCode:verificationCode,
        });

        //this.inputs[(index)].blur();

        if((index!=5)&&(value!='')){
          this.inputs[(index+1)].focus();
        }else{
          if(index!=0){
            this.inputs[(index-1)].focus();
          }
        }
      }
      if(value==''){
        var vcode =  this.state.vcode;
        vcode[index] = value;
        this.setState({
          vcode:vcode
        });
        if(index!=0){
          this.inputs[(index-1)].focus();
        }
      }
    }catch(err){

    }

  }
  resendCode(){
    if(this.state.timer=="00:00"){
      this.eventMaster.emit('appActivity',{state:1});
      // Request to send OTP
      auth()
      .signInWithPhoneNumber(this.state.phoneNo,true)
      .then(confirmResult => {
        this.setState({ confirmResult })
        this.setState({timer:"05:00"});
        this.countdown();
        this.eventMaster.emit('appActivity',{state:0});
      })
      .catch(error => {
        //alert("An error occured, try again later");
        alert(error.message);
        this.eventMaster.emit('appActivity',{state:0});
      });
    }else{
      alert('Code not expired.');
    }
  }

  handleKeyPress(event,index){
    if(index!=0){
      if(event.key === "Backspace"){
        var vcode =  this.state.vcode;
        vcode[(index-1)] = '';
        var verificationCode = '';
        for(var i in vcode){
          verificationCode+=vcode[i];
        }
        this.setState({
          vcode:vcode,
          verificationCode:verificationCode,
        });

        this.inputs[(index-1)].focus();
      }
    }
  }

  automaticAuth(){
    auth().onAuthStateChanged( (user) => {
    if (user) {
      this.eventMaster.emit('appActivity',{state:1});
      this.setState({ userId: user.uid })
      alert(`Verified Successfully!`)
      //this.eventMaster.emit('appActivity',{state:0});
      var userStat = false;
      getter.getUser(user.uid).then((response)=>{
        if(response!=undefined){
          userStat = true;
        }
        if(!userStat){
          this.props.navigation.navigate("UserCompleteProfile",{uid:user.uid,phone:user.phoneNumber});
          this.eventMaster.emit('appActivity',{state:0});
        }else{
          this.eventMaster.emit('appActivity',{state:1});
          var userdata = response;
          sessionManager.setUserSession(user.uid,userdata.first_name,userdata.last_name,userdata.email,userdata.phone,userdata.address,userdata.area,userdata.landmark,userdata.last_logged).then((data)=>{
            sessionManager.loadUserSession().then(()=>{
              this.eventMaster.emit('appActivity',{state:0});
              this.eventMaster.emit('changeAppLoggedState',{state:1});
            });
          });
        }
      });
    }
    else
    {
        // reset state if you need to
        //dispatch({ type: "reset_user" });
    }
  });
}

  handleVerifyCode(){
    this.eventMaster.emit('appActivity',{state:1});
    // Request for OTP verification

    if(this.state.timer == "00:00"){
      alert('Code expired, resend!');
    }else{
      const confirmResult = this.state.confirmResult;
      const verificationCode = this.state.verificationCode;
      if (verificationCode.length == 6) {
        confirmResult
        .confirm(verificationCode)
        .then((data) => {
          this.setState({ userId: data.user.uid })
          alert(`Verified Successfully!`)
          //this.eventMaster.emit('appActivity',{state:0});
          var userStat = false;
          getter.getUser(data.user.uid).then((response)=>{
            if(response!=undefined){
              userStat = true;
            }
            if(data.additionalUserInfo.isNewUser||!userStat){
              this.props.navigation.navigate("UserCompleteProfile",{uid:data.user.uid,phone:data.user.phoneNumber});
              this.eventMaster.emit('appActivity',{state:0});
            }else{
              this.eventMaster.emit('appActivity',{state:1});
              var userdata = response;
              sessionManager.setUserSession(data.user.uid,userdata.first_name,userdata.last_name,userdata.email,userdata.phone,userdata.address,userdata.area,userdata.landmark,userdata.last_logged).then((data)=>{
                sessionManager.loadUserSession().then(()=>{
                  this.eventMaster.emit('appActivity',{state:0});
                  this.eventMaster.emit('changeAppLoggedState',{state:1});
                });
              });
            }
          });
        })
        .catch(error => {
          alert(error.message)
          this.eventMaster.emit('appActivity',{state:0});
        })
      } else {
        alert('Please enter a 6 digit OTP code.')
        this.eventMaster.emit('appActivity',{state:0});
      }
    }
  }

  render(){
    return(
      <SafeAreaView style={styles.body}>
          <Text style={styles.topText}>Verify Phone Number</Text>
          <View style={styles.row}>
            <Text style={styles.subText}>Enter the 6 digit code that has been sent to {this.props.route.params.phone}</Text>
            <TouchableOpacity activeOpacity={0.7} style={{marginLeft:5}} onPress={()=>this.props.navigation.goBack()}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>

          {false&&<View style={styles.boxInputs}>
            <TextInput style={{...styles.box, ...{borderColor:(this.state.vcode[0]=='')?'#e5e5e5':'#FF4800'}}} value={this.state.vcode[0]} onChangeText={(value)=>this.inputCodeSegment(0,value)} onKeyPress={({ nativeEvent }) => this.handleKeyPress(nativeEvent,0)} keyboardType="numeric" maxLength={1} ref={(input)=>{this.inputs[0] = input}} editable={(this.state.vcode[1]=='')}/>
            <TextInput style={{...styles.box, ...{borderColor:(this.state.vcode[1]=='')?'#e5e5e5':'#FF4800'}}} value={this.state.vcode[1]} onChangeText={(value)=>this.inputCodeSegment(1,value)} onKeyPress={({ nativeEvent }) => this.handleKeyPress(nativeEvent,1)} keyboardType="numeric" maxLength={1} ref={(input)=>{this.inputs[1] = input}} editable={((this.state.vcode[2]=='')&&(this.state.vcode[0]!='') )}/>
            <TextInput style={{...styles.box, ...{borderColor:(this.state.vcode[2]=='')?'#e5e5e5':'#FF4800'}}} value={this.state.vcode[2]} onChangeText={(value)=>this.inputCodeSegment(2,value)} onKeyPress={({ nativeEvent }) => this.handleKeyPress(nativeEvent,2)} keyboardType="numeric" maxLength={1} ref={(input)=>{this.inputs[2] = input}} editable={((this.state.vcode[3]=='')&&(this.state.vcode[1]!='') )}/>
            <TextInput style={{...styles.box, ...{borderColor:(this.state.vcode[3]=='')?'#e5e5e5':'#FF4800'}}} value={this.state.vcode[3]} onChangeText={(value)=>this.inputCodeSegment(3,value)} onKeyPress={({ nativeEvent }) => this.handleKeyPress(nativeEvent,3)} keyboardType="numeric" maxLength={1} ref={(input)=>{this.inputs[3] = input}} editable={((this.state.vcode[4]=='')&&(this.state.vcode[2]!='') )}/>
            <TextInput style={{...styles.box, ...{borderColor:(this.state.vcode[4]=='')?'#e5e5e5':'#FF4800'}}} value={this.state.vcode[4]} onChangeText={(value)=>this.inputCodeSegment(4,value)} onKeyPress={({ nativeEvent }) => this.handleKeyPress(nativeEvent,4)} keyboardType="numeric" maxLength={1} ref={(input)=>{this.inputs[4] = input}} editable={((this.state.vcode[5]=='')&&(this.state.vcode[3]!='') )}/>
            <TextInput style={{...styles.box, ...{borderColor:(this.state.vcode[5]=='')?'#e5e5e5':'#FF4800'}}} value={this.state.vcode[5]} onChangeText={(value)=>this.inputCodeSegment(5,value)} onKeyPress={({ nativeEvent }) => this.handleKeyPress(nativeEvent,5)} keyboardType="numeric" maxLength={1} ref={(input)=>{this.inputs[5] = input}} editable={((this.state.vcode[4]!='') )}/>
          </View>}

          <View style={styles.boxInputs}>
            <TextInput style={styles.inputBox} value={this.state.verificationCode} onChangeText={(value)=>this.checkValue(value)} keyboardType="numeric" maxLength={6}/>
          </View>

          <View style={styles.codeTextRow}>
            <Text style={styles.subText}> Code Expires in </Text>
            <Text style={styles.changeText}> {this.state.timer} </Text>
          </View>

          <View style={styles.codeTextRow}>
            <Text style={styles.subText}> Didn't get the code? </Text>
            <TouchableOpacity onPress={()=>this.resendCode()}>
              <Text style={styles.changeText}> Resend Code </Text>
            </TouchableOpacity>
          </View>

          {false&&<TouchableOpacity activeOpacity={(this.state.vcode[5]=='')?1:0.8} style={{...styles.ctnBtn, ...{backgroundColor:(this.state.vcode[5]=='')?'#EEEEEE':'#FF4800'}}} onPress={()=>this.continueProcess()}>
            <Text style={{...styles.btnText, ...{color:(this.state.vcode[5]=='')?'#707070':'#FFFFFF'} }}> Verify </Text>
          </TouchableOpacity>}

          <TouchableOpacity activeOpacity={(this.state.verificationCode.length!=6)?1:0.8} style={{...styles.ctnBtn, ...{backgroundColor:(this.state.verificationCode.length!=6)?'#EEEEEE':'#FF4800'}}} onPress={()=>this.continueProcess()}>
            <Text style={{...styles.btnText, ...{color:(this.state.verificationCode.length!=6)?'#707070':'#FFFFFF'} }}> Verify </Text>
          </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
