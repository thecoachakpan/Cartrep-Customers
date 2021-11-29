import React, {Component} from 'react';

import {View, TouchableOpacity, Text, Button, SafeAreaView, StyleSheet,Dimensions,Image, TextInput, ScrollView, KeyboardAvoidingView,NativeEventEmitter} from 'react-native';

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
  historyList:{
    width:wp('90%'),
    marginLeft:'auto',
    marginRight:'auto',
  },
  orderCard:{
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
    alignItems:'center'
  },
  nameCategory:{

  },
  nameText:{
    fontFamily:'Nunito-SemiBold',
    fontSize:wp('4.8%'),
    color:'#00255E',
    marginLeft:wp('1%'),
  },
  categoryBox:{
    width:wp('20%'),
    height:hp('4%'),
    backgroundColor:'#FFF8F6',
    marginTop:hp('1%'),
    borderRadius:wp('4%'),
    justifyContent:'center',
    alignItems:'center'
  },
  categoryText:{
    fontFamily:'Nunito-Regular',
    fontSize:wp('3.5%'),
    color:'#FF4000',
  },
  priceDate:{
    position:'absolute',
    right:wp('7%'),
  },
  priceText:{
    fontFamily:'Nunito-SemiBold',
    fontSize:wp('4.8%'),
    color:'#FF4000',
    marginLeft:wp('1%'),
    textAlign:'right'
  },
  statusText:{
    fontFamily:'Nunito-SemiBold',
    fontSize:wp('4.2%'),
    color:'#009B22',
    marginTop:hp('1%'),
    textAlign:'right',
  },
  subHeading:{
    fontFamily:'Nunito-SemiBold',
    fontSize:wp('4.2%'),
    color:'#707070',
    marginTop:hp('3%'),
    marginBottom:hp('1%'),
  },
  subHeading2:{
    fontFamily:'Nunito-SemiBold',
    fontSize:wp('4.2%'),
    color:'#707070',
    marginBottom:hp('2%'),
  },
  detailCard:{
    paddingTop:hp('2%'),
    paddingBottom:hp('2%'),

    borderBottomWidth:1,
    borderColor:'#EEEEEE',
  },
  detailHeading:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  },
  detailHeadingText:{
    fontFamily:'Nunito-Regular',
    fontSize:wp('4.2%'),
    color:'#00255E',
    marginLeft:wp('1.5%'),
  },
  extraTextBox:{
    paddingLeft:wp('5%'),
    paddingRight:wp('5%'),
    marginTop:hp('1%'),
  },
  detailSubText:{
    fontFamily:'Nunito-Regular',
    fontSize:wp('4.2%'),
    color:'#707070',
    marginTop:hp('0.4%'),
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
      orderData:{}
    };
    this.eventMaster = new NativeEventEmitter();
    this.categoryColors = {Document:'#FF0200',Food:'#009B22',Glassware:'#A0C5D4',Electronics:'#FF0800',Fabric:'#E7C200',Other:''};
    this.categoryBg = {Document:'#FFF8F6',Food:'#F0FFF0',Glassware:'#F8F8F8',Electronics:'#FFF7F7',Fabric:'#FFFCF1',Other:''};
  }

  componentDidMount(){
    this.setState({orderData:this.props.route.params.orderData});
  }

  goBack(){
    this.props.navigation.goBack();
  }

  render(){
    return(
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.body}>
        <SafeAreaView>
          <View style={styles.headerArea}>
            <TouchableOpacity onPress={()=>this.goBack()} style={styles.touchArea}>
              <FontAwesomeIcon icon={['fas','arrow-left']} size={wp('5%')}/>
            </TouchableOpacity>
            <Text style={styles.headingText}> History</Text>
            <TouchableOpacity style={styles.notifyIcon}>
              <Image source={require('../../../assets/images/icons/notify.png')} style={{width:'50%',height:'50%'}} resizeMode={"contain"} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={styles.historyList}>
              <View style={styles.orderCard}>
                <View style={styles.nameCategory}>
                  <Text style={styles.nameText}>{this.state.orderData.order_code}</Text>
                  <View style={{...styles.categoryBox, ...{backgroundColor:this.categoryBg[this.state.orderData.category]} }}>
                    <Text style={{...styles.categoryText, ...{color:this.categoryColors[this.state.orderData.category]}}}> {this.state.orderData.category}</Text>
                  </View>
                </View>
                <View style={styles.priceDate}>
                  <Text style={styles.priceText}>₦{this.state.orderData.amount}</Text>
                  <Text style={styles.statusText}> {this.state.orderData.status} </Text>
                </View>
              </View>

              <Text style={styles.subHeading}> Delivery Date : {this.state.orderData.date}</Text>
              <Text style={styles.subHeading2}> Delivery Time : {(this.state.orderData.time!=undefined)?this.state.orderData.time.substr(0,this.state.orderData.time.length-3):''}</Text>

              <View style={styles.detailCard}>
                <View style={styles.detailHeading}>
                  <Image source={require('../../../assets/images/icons/vector13.png')} style={{width:wp('3%'),height:wp('3%')}} resizeMode={"contain"}/>
                  <Text style={styles.detailHeadingText}> Sender Details</Text>
                </View>
                <View style={styles.extraTextBox}>
                  <Text style={styles.detailSubText}>{this.state.orderData.sender_address+", "+this.state.orderData.sender_area}</Text>
                  {(this.state.orderData.sender_landmark!='')&&<Text style={styles.detailSubText}>Landmark:{this.state.orderData.sender_landmark}</Text>}
                  <Text style={styles.detailSubText}>{this.state.orderData.sender_name}</Text>
                  <Text style={styles.detailSubText}>{this.state.orderData.sender_phone}</Text>
                </View>
              </View>


              <View style={styles.detailCard}>
                <View style={styles.detailHeading}>
                  <Image source={require('../../../assets/images/icons/vector23.png')} style={{width:wp('3%'),height:wp('3%')}} resizeMode={"contain"}/>
                  <Text style={styles.detailHeadingText}> Recipient Details</Text>
                </View>
                <View style={styles.extraTextBox}>
                  <Text style={styles.detailSubText}>{this.state.orderData.rec_address+", "+this.state.orderData.rec_area}</Text>
                  {(this.state.orderData.rec_landmark!='')&&<Text style={styles.detailSubText}>Landmark:{this.state.orderData.rec_landmark}</Text>}
                  <Text style={styles.detailSubText}>{this.state.orderData.rec_name}</Text>
                  <Text style={styles.detailSubText}>{this.state.orderData.rec_phone}</Text>
                </View>
              </View>


              {(this.state.orderData.rider_data!=undefined)&&<View style={styles.detailCard}>
                <View style={styles.detailHeading}>
                  <Image source={require('../../../assets/images/icons/vector33.png')} style={{width:wp('3%'),height:wp('3%')}} resizeMode={"contain"}/>
                  <Text style={styles.detailHeadingText}>Assigned Rider</Text>
                </View>
                <View style={styles.extraTextBox}>
                <Text style={styles.detailSubText}>{this.state.orderData.rider_data.first_name+" "+this.state.orderData.rider_data.last_name}</Text>
                <Text style={styles.detailSubText}>{this.state.orderData.rider_data.phone}</Text>
                </View>
              </View>}


            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>

    );
  }
}
