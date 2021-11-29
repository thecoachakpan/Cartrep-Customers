import React, {Component} from 'react';

import {View, TouchableOpacity, Text, Button, SafeAreaView,Keyboard, StyleSheet,Dimensions,Image, TextInput, ScrollView,KeyboardAvoidingView, NativeEventEmitter, Platform} from 'react-native';

import {Picker} from '@react-native-picker/picker';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import sessionManager from '../../../sessions/manager';

import {locations} from '../../../data/locations';

const styles = StyleSheet.create({
  body:{
    width:wp('100%'),
    height:hp('100%'),
    backgroundColor:'#f5f5f5',
  },
  subSection:{
    paddingTop:hp('3%'),
    paddingBottom:hp('4%'),
    paddingLeft:wp('6%'),
    paddingRight:wp('6%'),
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
    marginLeft:wp('5%'),
  },
  notifyIcon:{
    flexGrow:2,
    justifyContent:'center',
    alignItems:'center',
    marginRight:wp('5%'),
  },
  profileIcon:{
    flexGrow:1,
    borderRadius:wp('10%'),
    backgroundColor:'silver',
    height:wp('8%'),
    width:wp('5%'),
    marginRight:wp('2%'),
  },
  details1:{
    width:wp('90%'),
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    marginTop:hp('4%'),
  },
  subHeading:{
    fontSize:wp('4%'),
    fontFamily:'Nunito-SemiBold',
    color:'black',
    marginLeft:wp('1.5%'),
  },
  editText:{
    position:'absolute',
    right:wp('5%'),
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

  modalCont:{
    position:'absolute',
    width:wp('100%'),
    height:hp('100%'),
    justifyContent:'center',
    alignItems:'center'
  },
  modalOverlay:{
    position:'absolute',
    width:'100%',
    height:'100%',
    backgroundColor:'#535D6B',
    opacity:0.7
  },
  modalBox:{
    width:wp('90'),
    backgroundColor:'white',
    borderRadius:wp('5%'),
    paddingTop:hp('1%'),
    paddingBottom:hp('1%'),
  },
  modalTitle:{
    width:'100%',
    borderBottomWidth:1,
    borderColor:'#CCCCCC',
    paddingTop:hp('1%'),
    paddingBottom:hp('1%'),
    justifyContent:'center',
    alignItems:'center',
  },
  modalTitleText:{
    fontSize:wp('5%'),
    fontFamily:'Nunito-Regular',
    color:'#00255E',
  },
  modalBody:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:hp('2%'),
    paddingBottom:hp('2%'),
    paddingLeft:hp('2%'),
    paddingRight:hp('2%'),
  },
  modalSubText:{
    fontSize:wp('4%'),
    fontFamily:'Nunito-SemiBold',
    color:'#707070',
  },
  modalBoldText:{
    fontSize:wp('4.3%'),
    fontFamily:'Nunito-SemiBold',
    color:'#00255E',
  },
  btnRow:{
    display:'flex',
    flexDirection:'row',
    marginTop:hp('3%'),
  },
  ctnBtn1:{
    backgroundColor:'#FFFFFF',
    borderRadius:30,
    height:50,
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    flexGrow:1,
    marginRight:wp('4%'),
    borderColor:'black',
    borderWidth:1,
  },
  btnText1:{
    fontSize:wp('4.2%'),
    fontFamily:'Nunito-SemiBold',
    color:'black',
  },
  ctnBtn2:{
    backgroundColor:'#FF4800',
    borderRadius:30,
    height:50,
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    flexGrow:1,
    marginRight:wp('4%'),
  },
  btnText2:{
    fontSize:wp('4.2%'),
    fontFamily:'Nunito-SemiBold',
    color:'white',
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
      recAddress:'',
      recName:'',
      recPhone:'',
      area:'',
      landmark:'',
      costConfirm:false,
      farCheck:0,
    };
    this.eventMaster = new NativeEventEmitter();
    //this.props.navigation.openDrawer();
  }

  componentDidMount(){
    this.setState({farCheck:0});
    sessionManager.loadUserSession();
    //this.eventMaster.emit('appActivity',{state:0});
  }

  componentDidUpdate(){
    sessionManager.loadUserSession();
  }

  verifyFarDistance(){
    var allLocations = JSON.parse(JSON.stringify(locations));
    var far = 0;

    var senderArea = sessionManager.getUserData().area;
    var senderLandmark = sessionManager.getUserData().landmark;
    if(allLocations.farPairs[senderLandmark]!=undefined){
      var farDistances = allLocations.farPairs[senderLandmark];
      for(var i in farDistances){
        if( (farDistances[i]==this.state.area) || (farDistances[i]==this.state.landmark) ){
          far = 1;
        }
      }
    }

    if(allLocations.farPairs[this.state.landmark]!=undefined){
      var farDistances = allLocations.farPairs[this.state.landmark];
      for(var i in farDistances){
        if( (farDistances[i]==senderArea) || (farDistances[i]==senderLandmark) ){
          far = 1;
        }
      }
    }

    var groupedPairs = allLocations.farPairs.groupedPairs;
    for(var i in groupedPairs){
      var gp = groupedPairs[i];
      if( (gp.from.includes(senderArea)||gp.from.includes(senderLandmark)) &&  (gp.to.includes(this.state.area)||gp.to.includes(this.state.landmark)) ){
        far = 1;
      }
      if( (gp.to.includes(senderArea)||gp.to.includes(senderLandmark)) &&  (gp.from.includes(this.state.area)||gp.from.includes(this.state.landmark)) ){
        far = 1;
      }
    }

    if(far == 1){
      return true;
    }else{
      return false;
    }

  }

  continueProcess(){
    Keyboard.dismiss();
    if((this.state.recAddress=='')||(this.state.recName=='')||(this.state.recPhone=='')||((this.state.area=='')) ){
      alert('Fill in all required delivery details');
    }else{


      //Perform validation checks on inputs
      var error = 0;
      var errorMsg ="";
      if(this.state.recPhone.length!=11){
        error = 1;
        errorMsg+="Mobile number must be 11 digits in length.\n";
      }
      if(!(/^\d+$/.test(this.state.recPhone))){
        error = 1;
        errorMsg+='Mobile number must contain only digits.\n';
      }
      if(sessionManager.getUserData().address==''){
        error = 1;
        errorMsg+='You must add an address first in your profile.\n';
      }


      //----------------------------------------------------
      if(error == 0){
        if(this.verifyFarDistance()){
          if(this.state.farCheck == 1){
            this.setState({costConfirm:false});
            this.eventMaster.emit('appActivity',{state:1});
            var unique = Math.floor(Math.random()*100000);
            unique = unique.toString().split("");
            var len = this.state.area.length;
            for(var i = 2;i>=0;i--){
              var j = eval(i);
              var index;
              while((index==undefined)||(this.state.area[index]==undefined)||(this.state.area[index]==' ')){
                index = Math.floor(Math.random() * len);
              }
              unique.splice((j+j),0,this.state.area[index].toUpperCase());
            }
            unique = unique.join("");
            var stateHolder = JSON.parse(JSON.stringify({address:this.state.recAddress,name:this.state.recName,phone:this.state.recPhone,area:this.state.area,landmark:this.state.landmark,price:500,generated:unique}));
            this.setState({
              recAddress:'',
              recName:'',
              recPhone:'',
              area:'',
              landmark:'',
              costConfirm:false,
              farCheck:0,
            });
            this.props.navigation.navigate('InputItemDetails',stateHolder);
            this.eventMaster.emit('appActivity',{state:0});
          }else{
            this.setState({costConfirm:true,farCheck:1});
          }
        }else{
          this.eventMaster.emit('appActivity',{state:1});
          var unique = Math.floor(Math.random()*100000);
          unique = unique.toString().split("");
          var len = this.state.area.length;
          for(var i = 2;i>=0;i--){
            var j = eval(i);
            var index;
            while((index==undefined)||(this.state.area[index]==undefined)||(this.state.area[index]==' ')){
              index = Math.floor(Math.random() * len);
            }
            unique.splice((j+j),0,this.state.area[index].toUpperCase());
          }
          unique = unique.join("");
          var stateHolder = JSON.parse(JSON.stringify({address:this.state.recAddress,name:this.state.recName,phone:this.state.recPhone,area:this.state.area,landmark:this.state.landmark,price:300,generated:unique}));
          this.setState({
            recAddress:'',
            recName:'',
            recPhone:'',
            area:'',
            landmark:'',
            costConfirm:false,
            farCheck:0,
          });
          this.props.navigation.navigate('InputItemDetails',stateHolder);
          this.eventMaster.emit('appActivity',{state:0});
        }
      }else{
        alert(errorMsg);
      }
    }
  }

  editDetails(){
    this.props.navigation.navigate('EditDetails',{});
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
  /*JSX components


  <TouchableOpacity style={styles.notifyIcon}>
    <Image source={require('../../../assets/images/icons/notify.png')} style={{width:'60%',height:'60%'}} resizeMode={"contain"} />
  </TouchableOpacity>

  --------------------*/
  render(){
    return(
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.body}>
        <SafeAreaView style={styles.subSection}>

            <View style={styles.headerArea}>
              <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()} style={styles.touchArea}>
                <Image source={require('../../../assets/images/icons/menu.png')} style={{width:wp('5%'),height:wp('5%')}} resizeMode={"contain"} />
              </TouchableOpacity>
              <Text style={styles.headingText}> Find Delivery Service</Text>
            </View>

              <ScrollView contentContainerStyle={{paddingBottom:hp('8%')}} keyboardShouldPersistTaps="handled">

                <View style={styles.details1}>
                    <Image source={require('../../../assets/images/icons/vector1.png')} style={{width:wp('3%'),height:wp('3%')}} resizeMode={"contain"}/>
                    <Text style={styles.subHeading}>Your Details</Text>
                    <TouchableOpacity style={styles.editText} onPress={()=>this.editDetails()}>
                      <Text style={{...styles.subHeading,...{color:'#FF4000'}}}>Edit</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.detailsCard}>
                  {sessionManager.getUserData().firstName&&<Text style={styles.detailHeading}> {(sessionManager.getUserData().firstName+" "+sessionManager.getUserData().lastName)}</Text>}
                  {(sessionManager.getUserData().address!='')&&<Text style={styles.detailSubText}> {sessionManager.getUserData().address}</Text>}
                  <Text style={styles.detailSubText}> { sessionManager.getUserData().phone}</Text>
                </View>

                <View style={styles.details2}>
                    <Image source={require('../../../assets/images/icons/vector2.png')} style={{width:wp('3%'),height:wp('3%')}} resizeMode={"contain"}/>
                    <Text style={styles.subHeading}>Recipient Details</Text>
                </View>
                <Text style={styles.detailSubText}>Enter recipient’s information in the form below.</Text>

                <View style={styles.formBox}>
                  {(this.state.recAddress!='')&&<Text style={styles.label}> Recipient Address</Text>}
                  <TextInput style={styles.formInput} placeholder={"Recipient Address"} value={this.state.recAddress} onChangeText={(value)=>{this.setState({recAddress:value})}}/>
                  {(this.state.recName!='')&&<Text style={styles.label}>Recipient Name</Text>}
                  <TextInput style={styles.formInput} placeholder={"Recipient Name"} value={this.state.recName} onChangeText={(value)=>{this.setState({recName:value})}}/>
                  {(this.state.recPhone!='')&&<Text style={styles.label}> Recipient Phone</Text>}
                  <TextInput style={styles.formInput} placeholder={"Recipient Phone"} value={this.state.recPhone} maxLength={11} onChangeText={(value)=>{this.setState({recPhone:value})}}/>
                  {(this.state.area!='')&&<Text style={styles.label}> Area</Text>}
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
                  {(this.state.landmark!='')&&(locations.landmarks[this.state.area]!=undefined)&&<Text style={styles.label}>Landmark</Text>}
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

                <TouchableOpacity activeOpacity={((this.state.recAddress=='')||(this.state.recName=='')||(this.state.recPhone=='')||((this.state.area=='')) )?1:0.7} style={{...styles.ctnBtn, ...{backgroundColor:((this.state.recAddress=='')||(this.state.recName=='')||(this.state.recPhone=='')||((this.state.area=='')) )?'#EEEEEE':'#FF4800'}}} onPress={()=>this.continueProcess()}>
                  <Text style={{...styles.btnText, ...{color:((this.state.recAddress=='')||(this.state.recName=='')||(this.state.recPhone=='')||((this.state.area=='')) )?'#707070':'#FFFFFF'} }}> Next </Text>
                </TouchableOpacity>

              </ScrollView>

        </SafeAreaView>
        {this.state.costConfirm&&<View style={styles.modalCont}>
          <View style={styles.modalOverlay}></View>
          <View style={styles.modalBox}>
            <View style={styles.modalTitle}>
              <Text style={styles.modalTitleText}> Notice</Text>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalSubText}> This ride will cost ₦600 due to distance.</Text>
              <Text style={styles.modalBoldText}> Proceed?</Text>
              <View style={styles.btnRow}>
                <TouchableOpacity activeOpacity={0.7} style={styles.ctnBtn1} onPress={()=>this.setState({costConfirm:false})}>
                  <Text style={styles.btnText1}> Cancel </Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.ctnBtn2} onPress={()=>this.continueProcess()}>
                  <Text style={styles.btnText2}> Continue </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>}
      </KeyboardAvoidingView>
    );
  }
}
