import React, {Component} from 'react';

import {View, TouchableOpacity, Text, Button, SafeAreaView, StyleSheet,Dimensions,Image, TextInput, ScrollView, KeyboardAvoidingView, FlatList, NativeEventEmitter} from 'react-native';

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
    marginTop:hp('1%'),
    borderRadius:wp('4%'),
    justifyContent:'center',
    alignItems:'center'
  },
  categoryText:{
    fontFamily:'Nunito-Regular',
    fontSize:wp('3.5%'),
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
  dateText:{
    fontFamily:'Nunito-SemiBold',
    fontSize:wp('4.2%'),
    color:'#707070',
    marginTop:hp('1%'),
    textAlign:'right',
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
      orders:[],
    };
    this.eventMaster = new NativeEventEmitter();
    this.eventListeners = [];
    this.categoryColors = {Document:'#FF0200',Food:'#009B22',Glassware:'#A0C5D4',Electronics:'#FF0800',Fabric:'#E7C200',Other:''};
    this.categoryBg = {Document:'#FFF8F6',Food:'#F0FFF0',Glassware:'#F8F8F8',Electronics:'#FFF7F7',Fabric:'#FFFCF1',Other:''};
  }

  componentDidMount(){
    this.eventMaster.emit('appActivity',{state:1});
    this.focusListener = this.props.navigation.addListener('focus',()=>{
      this.getOrderHistory();
      this.reloadOrders = setInterval(()=>{
        this.getOrderHistory();
      },3000);
    });
    this.blurListener = this.props.navigation.addListener('blur',()=>{
      clearInterval(this.reloadOrders);
    });
  }


  getOrderHistory(){
    getter.getOrderHistory(sessionManager.getUserData().uid).then((data)=>{
      if(data){
        this.setState({orders:data});
        this.eventMaster.emit('appActivity',{state:0});
      }
    });
  }

  goBack(){
    this.props.navigation.goBack();
  }

  orderCard(data){

    return(
      <TouchableOpacity onPress={()=>this.props.navigation.navigate('OrderDetails',{orderData:data})}>
        <View style={styles.orderCard}>
          <View style={styles.nameCategory}>
            <Text style={styles.nameText}>{data.order_code}</Text>
            <View style={{...styles.categoryBox, ...{backgroundColor:this.categoryBg[data.category]} }}>
              <Text style={{...styles.categoryText, ...{color:this.categoryColors[data.category]}}}> {data.category}</Text>
            </View>
          </View>
          <View style={styles.priceDate}>
            <Text style={styles.priceText}>₦{data.amount}</Text>
            <Text style={styles.dateText}> {data.date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render(){
    return(
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.body}>
        <SafeAreaView>
          <View style={styles.headerArea}>
            <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()} style={styles.touchArea}>
              <Image source={require('../../../assets/images/icons/menu.png')} style={{width:wp('5%'),height:wp('5%')}} resizeMode={"contain"} />
            </TouchableOpacity>
            <Text style={styles.headingText}> History</Text>
            <TouchableOpacity style={styles.notifyIcon}>
              <Image source={require('../../../assets/images/icons/notify.png')} style={{width:'50%',height:'50%'}} resizeMode={"contain"} />
            </TouchableOpacity>
          </View>
            <View style={styles.historyList}>
              <FlatList
                data={this.state.orders}
                renderItem={({item}) => this.orderCard(item)}
              />
            </View>
        </SafeAreaView>
      </KeyboardAvoidingView>

    );
  }
}
