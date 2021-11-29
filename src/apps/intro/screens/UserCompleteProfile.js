import React, {Component} from 'react';

import {View, TouchableOpacity, Text, Button, SafeAreaView,ScrollView, StyleSheet,Dimensions,Image, TextInput, NativeEventEmitter,KeyboardAvoidingView} from 'react-native';

import {Picker} from '@react-native-picker/picker';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import poster from '../../../api/setter'

import sessionManager from '../../../sessions/manager';

import {locations} from '../../../data/locations';


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
  formBox:{
    width:wp('85%'),
    marginTop:hp('5%'),
  },
  label:{
    fontSize:wp('3.5%'),
    fontFamily:'Nunito-Regular',
    color:'black',
    marginBottom:hp('0.5%'),
  },
  formInput:{
    height:hp('7%'),
    fontFamily:'Nunito-Regular',
    fontSize:wp('4.5%'),
    backgroundColor:'white',
    borderColor:'#eeeeee',
    borderWidth:1,
    borderRadius:5,
    paddingLeft:wp('3%'),
    marginBottom:hp('3%'),
  },
  ctnBtn:{
    borderRadius:30,
    width:wp('82%'),
    height:60,
    marginTop:hp('4%'),
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
      uid:this.props.route.params.uid,
      phone:this.props.route.params.phone,
      fname:'',
      lname:'',
      email:'',
      address:'',
      area:'',
      landmark:'',
    };
    this.eventMaster = new NativeEventEmitter();
  }

  getAreas(){
    var areas = JSON.parse(JSON.stringify(locations.areas));
    for(var i in areas){
      var nm = areas[i];
      areas[i] = {key:i,name:nm};
    }
    var list = areas.map(area=>(
      <Picker.Item key={area.key} label={area.name} value={area.name} />
    ));
    return list;
  }

  getLandmarks(){
    if(locations.landmarks[this.state.area]!=undefined){
      var lnd = JSON.parse(JSON.stringify(locations.landmarks));
      var landmarks = lnd[this.state.area];
      for(var i in landmarks){
        var nm = landmarks[i];
        landmarks[i] = {key:i,name:nm};
      }
      var list = landmarks.map(landmark=>(
        <Picker.Item key={landmark.key} label={landmark.name} value={landmark.name} />
      ));
      return list;
    }
  }

  continueProcess(){
    //this.props.navigation.navigate('AllowLocationAccess',{});
    if((this.state.fname!='')&&(this.state.lname!='')&&(this.state.email!='')&&(this.state.address!='')&&(this.state.area!='')){
      this.eventMaster.emit('appActivity',{state:1});
      poster.registerUser(this.state.uid,this.state.fname,this.state.lname,this.state.phone,this.state.email,this.state.address,this.state.area,this.state.landmark).then((data)=>{
        sessionManager.setUserSession(this.state.uid,this.state.fname,this.state.lname,this.state.email,this.state.phone,this.state.address,this.state.area,this.state.landmark,'').then((data)=>{
          sessionManager.loadUserSession().then(()=>{
            this.eventMaster.emit('appActivity',{state:0});
            this.eventMaster.emit('changeAppLoggedState',{state:1});
          });
        });
      });
    }else{
      alert('Fill in all details');
    }
  }

  render(){
    return(
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.body}>
        <SafeAreaView>
          <ScrollView contentContainerStyle={{paddingBottom:hp('8%')}} keyboardShouldPersistTaps="handled">
            <Text style={styles.topText}>Complete Profile</Text>
            <Text style={styles.subText}>Help us know you better by entering your details below</Text>

            <View style={styles.formBox}>
              {(this.state.fname!='')&&<Text style={styles.label}> First Name</Text>}
              <TextInput style={styles.formInput} placeholder={"First Name"} value={this.state.fname} onChangeText={(value)=>{this.setState({fname:value})}}/>
              {(this.state.lname!='')&&<Text style={styles.label}>Last Name</Text>}
              <TextInput style={styles.formInput} placeholder={"Last Name"} value={this.state.lname} onChangeText={(value)=>{this.setState({lname:value})}}/>
              {(this.state.email!='')&&<Text style={styles.label}> Email Address</Text>}
              <TextInput style={styles.formInput} placeholder={"Email address"} value={this.state.email} onChangeText={(value)=>{this.setState({email:value})}}/>
              {(this.state.address!='')&&<Text style={styles.label}>Address</Text>}
              <TextInput style={styles.formInput} placeholder={"Address"} value={this.state.address} onChangeText={(value)=>{this.setState({address:value})}}/>
              {(this.state.area!='')&&<Text style={styles.label}> Area </Text>}
              <View>
                <TextInput style={{...styles.formInput, ...{position:'absolute',width:'100%'}}} placeholder={"Area"} value={this.state.area}/>
                <Picker
                  selectedValue={this.state.area}
                  style={{...styles.formInput, ...{opacity:0}}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({area: itemValue})
                  }>
                  <Picker.Item label="Select Area" value="" />
                  {this.getAreas()}
                </Picker>
              </View>
              {(locations.landmarks[this.state.area]!=undefined)&&<View>
                <TextInput style={{...styles.formInput, ...{position:'absolute',width:'100%'}}} placeholder={"Landmark"} value={this.state.landmark}/>
                <Picker
                  selectedValue={this.state.landmark}
                  style={{...styles.formInput, ...{opacity:0}}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({landmark: itemValue})
                  }>
                  <Picker.Item label="Select Landmark" value="" />
                  {this.getLandmarks()}
                </Picker>
              </View>}
            </View>

            <TouchableOpacity activeOpacity={((this.state.fname=='')||(this.state.lname=='')||(this.state.email=='')||(this.state.address=='')||(this.state.area=='') )?1:0.8} style={{...styles.ctnBtn, ...{backgroundColor:((this.state.fname=='')||(this.state.lname=='')||(this.state.email=='')||(this.state.address=='')||(this.state.area=='') )?'#EEEEEE':'#FF4800'}}} onPress={()=>this.continueProcess()}>
              <Text style={{...styles.btnText, ...{color:((this.state.fname=='')||(this.state.lname=='')||(this.state.email=='')||(this.state.address=='')||(this.state.area=='') )?'#707070':'#FFFFFF'} }}> Continue </Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
