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
    paddingTop:hp('3%'),
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
  formBox:{
    width:wp('87%'),
    marginTop:hp('3%'),
  },
  label:{
    fontSize:wp('3.5%'),
    fontFamily:'Nunito-Regular',
    color:'#707070',
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
  formInput2:{
    height:hp('6%'),
    maxHeight:hp('6%'),
    fontFamily:'Nunito-Regular',
    fontSize:wp('4%'),
    backgroundColor:'white',
    borderColor:'#eeeeee',
    borderWidth:1,
    borderRadius:5,
    paddingLeft:wp('3%'),
    flexGrow:1,
  },
  formRow:{
    display:'flex',
    flexDirection:'row',
    marginBottom:hp('2%'),
  },
  rowFormCont:{
    flexGrow:1,
  },
  ctnBtn:{
    borderRadius:wp('2%'),
    width:wp('87%'),
    height:60,
    marginTop:hp('1%'),
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
      cardNo:'',
      expiry:'',
      cvv:''
    };
  }

  addCard(){
    if((this.state.cardNo!='')&&(this.state.expiry!='')&&(this.state.cvv!='')){
        this.props.navigation.navigate('AddCardLoading',{cardData:{cardNo:this.state.cardNo,expiry:this.state.expiry,cvv:this.state.cvv}});
    }else{
      alert('Fill in all required delivery details');
    }

  }

  goBack(){
    this.props.navigation.goBack();
  }

  render(){
    return(
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.body}>
        <SafeAreaView>
          <View style={styles.headerArea}>
            <TouchableOpacity onPress={()=>this.goBack()}>
              <FontAwesomeIcon icon={['fas','arrow-left']} size={wp('5%')}/>
            </TouchableOpacity>
            <Text style={styles.headingText}> Add Card</Text>
            <TouchableOpacity style={styles.notifyIcon}>
              <Image source={require('../../../assets/images/icons/notify.png')} style={{width:'50%',height:'50%'}} resizeMode={"contain"} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.paymentCont}>
              <Text style={styles.subText}> To add a card, enter the details below.</Text>

              <View style={styles.formBox}>
                {(this.state.cardNo!='')&&<Text style={styles.label}> Card Number</Text>}
                <TextInput style={styles.formInput} placeholder={"Card Number"} value={this.state.cardNo} onChangeText={(value)=>{this.setState({cardNo:value})}}/>

                <View style={styles.formRow}>
                  <View style={styles.rowFormCont}>
                    {((this.state.expiry!='')||(this.state.cvv!=''))&&<Text style={styles.label}>Expiry Date</Text>}
                    <TextInput style={styles.formInput2} placeholder={"Expiry Date"} value={this.state.expiry} onChangeText={(value)=>{this.setState({expiry:value})}}/>
                  </View>
                  <View style={styles.rowFormCont}>
                  {((this.state.expiry!='')||(this.state.cvv!=''))&&<Text style={{...styles.label,...{opacity:(this.state.cvv=="")?0:1}}}> CVV</Text>}
                  <TextInput style={styles.formInput2} placeholder={"CVV"} value={this.state.cvv} onChangeText={(value)=>{this.setState({cvv:value})}}/>
                  </View>


                </View>

              </View>



              <TouchableOpacity activeOpacity={((this.state.cardNo!="")&&(this.state.expiry!="")&&(this.state.cvv!=""))?0.7:1} style={{...styles.ctnBtn, ...{backgroundColor:((this.state.cardNo!="")&&(this.state.expiry!="")&&(this.state.cvv!=""))?'#FF4800':'#EEEEEE'}}} onPress={()=>this.addCard()}>
                <Text style={{...styles.btnText, ...{color:((this.state.cardNo!="")&&(this.state.expiry!="")&&(this.state.cvv!=""))?'#FFFFFF':'#707070'} }}>Done</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>

    );
  }
}
