import React, {Component} from 'react';

import {View, TouchableOpacity, Text, Button, SafeAreaView, StyleSheet,Dimensions,Image, TextInput, ScrollView, KeyboardAvoidingView, NativeEventEmitter} from 'react-native';

import {Picker} from '@react-native-picker/picker';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import sessionManager from '../../../sessions/manager';

import setter from '../../../api/setter';

import getter from '../../../api/getter';

import {locations} from '../../../data/locations';

const styles = StyleSheet.create({
  body:{
    width:wp('100%'),
    height:hp('100%'),
    paddingTop:hp('3%'),
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
    color:'black',
    flexGrow:6,
    marginLeft:wp('4%'),
  },
  subText:{
    fontSize:wp('3.5%'),
    fontFamily:'Nunito-Regular',
    color:'#707070',
    marginTop:10,
  },
  detailsCard:{
    width:wp('87%'),
    paddingLeft:wp('3%'),
    backgroundColor:'white',
    elevation:3,
    marginTop:hp('2%'),
    borderRadius:5,
    paddingTop:10,
    paddingBottom:10,
  },
  detailHeading:{
    fontSize:wp('4.4%'),
    fontFamily:'Nunito-SemiBold',
    color:'#FF4000',
  },
  detailSubText:{
    fontSize:wp('3.3%'),
    fontFamily:'Nunito-Regular',
    color:'#A0A0A0',
    marginTop:5,
  },
  details2:{
    width:wp('90%'),
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    marginTop:hp('4%'),
  },
  formBox:{
    width:wp('85%'),
    marginTop:hp('3%'),
  },
  label:{
    fontSize:wp('3.5%'),
    fontFamily:'Nunito-Regular',
    color:'black',
    marginBottom:hp('0.5%'),
  },
  formInput:{
    height:hp('6%'),
    fontFamily:'Nunito-Regular',
    fontSize:wp('4%'),
    backgroundColor:'white',
    borderColor:'#eeeeee',
    borderWidth:1,
    borderRadius:5,
    paddingLeft:wp('3%'),
    marginBottom:hp('2%'),
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
  },
  btnText:{
    fontSize:wp('5%'),
    fontFamily:'Nunito-SemiBold',
  },
  touchArea:{
    paddingTop:hp('2%'),
    paddingBottom:hp('2%'),
    paddingLeft:hp('2%'),
    paddingRight:hp('2%'),
    marginLeft:-(hp('1.5%'))
  }
});
export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      address:sessionManager.getUserData().address,
      fname:sessionManager.getUserData().firstName,
      lname:sessionManager.getUserData().lastName,
      phone:sessionManager.getUserData().phone,
      area:sessionManager.getUserData().area,
      landmark:sessionManager.getUserData().landmark
    };
    this.eventMaster = new NativeEventEmitter();
  }

  componentDidMount(){

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

  async saveChanges(){
    this.eventMaster.emit('appActivity',{state:1});
    setter.editProfile({
      uid:sessionManager.getUserData().uid,
      firstName:this.state.fname,
      lastName:this.state.lname,
      address:this.state.address,
      area:this.state.area,
      landmark:this.state.landmark,
    }).then(()=>{
      this.eventMaster.emit('appActivity',{state:0});
      alert('Profile Edited Successfully');
      getter.getUser(sessionManager.getUserData().uid).then(()=>{
        this.props.navigation.navigate('FindDeliveryService');
      });
    });
  }

  render(){
    return(
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.body}>
        <SafeAreaView>
          <ScrollView>
          <View style={styles.headerArea}>
          <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.touchArea}>
            <FontAwesomeIcon icon={['fas','arrow-left']} size={wp('5%')}/>
          </TouchableOpacity>
            <Text style={styles.headingText}> Edit your details</Text>
          </View>
          <Text style={styles.subText}> Update your information below</Text>

            <View style={styles.formBox}>
              {(this.state.fname!='')&&<Text style={styles.label}>First Name</Text>}
              <TextInput style={styles.formInput} placeholder={"First Name"} value={this.state.fname} onChangeText={(value)=>{this.setState({fname:value})}}/>
              {(this.state.lname!='')&&<Text style={styles.label}>Last Name</Text>}
              <TextInput style={styles.formInput} placeholder={"Last Name"} value={this.state.lname} onChangeText={(value)=>{this.setState({lname:value})}}/>
              {(this.state.phone!='')&&<Text style={styles.label}>Phone</Text>}
              <TextInput style={styles.formInput} placeholder={"Phone Number"} value={this.state.phone} onChangeText={(value)=>{this.setState({phone:value})}}/>
              {(this.state.address!='')&&<Text style={styles.label}>Address</Text>}
              <TextInput style={styles.formInput} placeholder={"Address"} value={this.state.address} onChangeText={(value)=>{this.setState({address:value})}}/>
              {(this.state.area!='')&&<Text style={styles.label}> Landmark</Text>}
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

            <TouchableOpacity activeOpacity={((this.state.fname=='')||(this.state.lname=='')||(this.state.phone=='') )?1:0.7} style={{...styles.ctnBtn, ...{backgroundColor:((this.state.fname=='')||(this.state.lname=='')||(this.state.phone=='') )?'#EEEEEE':'#FF4800'}}} onPress={()=>this.saveChanges()}>
              <Text style={{...styles.btnText, ...{color:((this.state.fname=='')||(this.state.lname=='')||(this.state.phone=='') )?'#707070':'#FFFFFF'} }}> Update</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    );
  }
}
