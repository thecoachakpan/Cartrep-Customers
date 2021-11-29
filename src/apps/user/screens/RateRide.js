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
    justifyContent:'center',
  },
  subText:{
    fontSize:wp('4.3%'),
    fontFamily:'Nunito-Regular',
    color:'#707070',
    marginTop:5,
  },
  pageCont:{
    width:wp('90%'),
    height:hp('60%'),
    alignItems:'center',
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
  formBox:{
    width:wp('85%'),
    marginTop:hp('5%'),
  },
  label:{
    fontSize:wp('3.5%'),
    fontFamily:'Nunito-Regular',
    color:'#707070',
    marginBottom:hp('0.5%'),
  },
  formInput:{
    height:hp('8%'),
    fontFamily:'Nunito-Regular',
    fontSize:wp('4.2%'),
    backgroundColor:'white',
    borderColor:'#eeeeee',
    borderWidth:1,
    borderRadius:5,
    paddingLeft:wp('3%'),
    paddingBottom:hp('2%'),
    marginBottom:hp('3%'),
    flexGrow:4,
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
  }
});
export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      rating:'0',
      comment:'',
    };
  }

  continueProcess(){
    this.props.navigation.navigate('ConfirmRide',{});
  }

  goBack(){
    this.props.navigation.goBack();
  }

  render(){
    return(
        <SafeAreaView style={styles.body}>
            <View style={styles.pageCont}>
              <View style={styles.textRow}>
                <Text style={styles.subText}>Your ride, </Text>
                <Text style={styles.rideText}> AB1234 </Text>
                <Text style={styles.subText}>was successfully dispatched.</Text>
              </View>
              <Text style={styles.subText}>Rate this ride </Text>

              <View style={{...styles.textRow,...{marginTop:hp('8%')}}}>
                <TouchableOpacity style={styles.starCont} activeOpacity={0.7} onPress={()=>{this.setState({rating:'1'})}}>
                  <FontAwesomeIcon icon={['fas','star']} style={{color:(eval(this.state.rating)>=1)?'#FF4000':'#d5d5d5'}} size={Math.floor(eval( wp('9%') ))} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.starCont} activeOpacity={0.7} onPress={()=>{this.setState({rating:'2'})}}>
                  <FontAwesomeIcon icon={['fas','star']} style={{color:(eval(this.state.rating)>=2)?'#FF4000':'#d5d5d5'}} size={Math.floor(eval( wp('9%') ))} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.starCont} activeOpacity={0.7} onPress={()=>{this.setState({rating:'3'})}}>
                  <FontAwesomeIcon icon={['fas','star']} style={{color:(eval(this.state.rating)>=3)?'#FF4000':'#d5d5d5'}} size={Math.floor(eval( wp('9%') ))} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.starCont} activeOpacity={0.7} onPress={()=>{this.setState({rating:'4'})}}>
                  <FontAwesomeIcon icon={['fas','star']} style={{color:(eval(this.state.rating)>=4)?'#FF4000':'#d5d5d5'}} size={Math.floor(eval( wp('9%') ))} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.starCont} activeOpacity={0.7} onPress={()=>{this.setState({rating:'5'})}}>
                  <FontAwesomeIcon icon={['fas','star']} style={{color:(eval(this.state.rating)>=5)?'#FF4000':'#d5d5d5'}} size={Math.floor(eval( wp('9%') ))} />
                </TouchableOpacity>
              </View>

              <View style={styles.formBox}>

              <Text style={styles.label}> Comment</Text>
              <TextInput style={styles.formInput} multiline={true} placeholder={"Write something"} value={this.state.comment} onChangeText={(value)=>{this.setState({comment:value})}}/>

              </View>

              <TouchableOpacity activeOpacity={0.7} style={styles.ctnBtn} onPress={()=>this.continueProcess()}>
                <Text style={styles.btnText}> Submit </Text>
              </TouchableOpacity>
            </View>
        </SafeAreaView>

    );
  }
}
