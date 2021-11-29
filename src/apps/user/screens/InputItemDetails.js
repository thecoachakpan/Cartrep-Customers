import React, {Component} from 'react';

import {View, TouchableOpacity, Text, Button, SafeAreaView, StyleSheet,Dimensions,Image, TextInput, ScrollView, KeyboardAvoidingView,NativeEventEmitter} from 'react-native';

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
    fontFamily:'Nunito-Bold',
    color:'black',
    flexGrow:6,
    textAlign:'center',
    marginRight:wp('7%'),
  },
  subText:{
    fontSize:wp('3.5%'),
    fontFamily:'Nunito-Regular',
    color:'#707070',
    marginTop:10,
  },
  categories:{
    width:wp('90%'),
    marginTop:hp('3%'),
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
  },
  categoryCont:{
    width:wp('25%'),
    height:wp('40%'),
    marginRight:wp('5%'),
  },
  categoryBox:{
    width:'100%',
    height:'80%',
    elevation:2,
    justifyContent:'center',
    alignItems:'center',
  },
  categoryText:{
    fontSize:wp('3.8%'),
    fontFamily:'Nunito-Regular',
    color:'#707070',
    marginTop:5,
    textAlign:'center'
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
  formCont:{
    display:'flex',
    flexDirection:'row',
    height:hp('6%'),
    marginBottom:hp('1%'),
  },
  formInput:{
    height:hp('6%'),
    fontFamily:'Nunito-Regular',
    fontSize:wp('4.2%'),
    backgroundColor:'white',
    borderColor:'#eeeeee',
    borderWidth:1,
    borderRadius:5,
    paddingLeft:wp('3%'),
    marginBottom:hp('3%'),
    flexGrow:4,
  },
  inputButtons:{
    display:'flex',
    flexDirection:'row',
    flexGrow:2,
  },
  btn:{
    flexGrow:1,
    backgroundColor:'white',
    borderRadius:wp('15%'),
    marginLeft:wp('6%'),
    maxWidth:hp('6%'),
    justifyContent:'center',
    alignItems:'center',
  },
  inputBtnText:{
    fontSize:wp('10%'),
    fontFamily:'Nunito-Regular',
    marginBottom:8,
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
      category:'',
      quantity:'',
      note:'',
      deliveryDetails:{},
    };
    this.eventMaster = new NativeEventEmitter();
  }

  continueProcess(){
    this.eventMaster.emit('appActivity',{state:1});
    var deliver = this.state.deliveryDetails;
    deliver['name'] = this.props.route.params.name;
    deliver['address'] = this.props.route.params.address;
    deliver['phone'] = this.props.route.params.phone;
    deliver['area'] = this.props.route.params.area;
    deliver['landmark'] = this.props.route.params.landmark;
    deliver['orderCode'] = this.props.route.params.generated;
    deliver['price'] = this.props.route.params.price;
    if(!(this.state.category=='')){
      deliver['category'] = this.state.category;
      this.props.navigation.navigate('ConfirmRide',{deliver:deliver});
      this.eventMaster.emit('appActivity',{state:0});
    }else{
      this.eventMaster.emit('appActivity',{state:0});
      alert('You must select a category first!');
    }

  }

  goBack(){
    this.props.navigation.goBack();
  }

  render(){
    return(
      <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.body}>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.headerArea}>
            <TouchableOpacity onPress={()=>this.goBack()} style={styles.touchArea}>
              <FontAwesomeIcon icon={['fas','arrow-left']} size={wp('5%')}/>
            </TouchableOpacity>
              <Text style={styles.headingText}> Item Type</Text>
            </View>
            <Text style={styles.subText}> Select the category of item you are sending</Text>

            <View style={styles.categories}>
              <View style={styles.categoryCont}>
                <TouchableOpacity style={{...styles.categoryBox, ...{backgroundColor:(this.state.category=='Document')?'#FFF8F6':'white'}}} onPress={()=>this.setState({category:'Document'})}>
                  {(this.state.category!='Document')&&<Image source={require('../../../assets/images/icons/document.png')} resizeMode="contain" style={{width:'40%'}}/>}
                  {(this.state.category=='Document')&&<Image source={require('../../../assets/images/icons/document2.png')} resizeMode="contain" style={{width:'40%'}}/>}
                </TouchableOpacity>
                <Text style={styles.categoryText}>Documents</Text>
              </View>

              <View style={styles.categoryCont} >
                <TouchableOpacity style={{...styles.categoryBox, ...{backgroundColor:(this.state.category=='Glass')?'#FFF8F6':'white'}}} onPress={()=>this.setState({category:'Glass'})}>
                {(this.state.category!='Glass')&&<Image source={require('../../../assets/images/icons/glass.png')} resizeMode="contain" style={{width:'40%'}}/>}
                {(this.state.category=='Glass')&&<Image source={require('../../../assets/images/icons/glass2.png')} resizeMode="contain" style={{width:'40%'}}/>}
                </TouchableOpacity>
                <Text style={styles.categoryText}>Glass wares</Text>
              </View>

              <View style={styles.categoryCont}>
                <TouchableOpacity style={{...styles.categoryBox, ...{backgroundColor:(this.state.category=='Fabric')?'#FFF8F6':'white'}}} onPress={()=>this.setState({category:'Fabric'})}>
                {(this.state.category!='Fabric')&&<Image source={require('../../../assets/images/icons/fabric.png')} resizeMode="contain" style={{width:'40%'}}/>}
                {(this.state.category=='Fabric')&&<Image source={require('../../../assets/images/icons/fabric2.png')} resizeMode="contain" style={{width:'40%'}}/>}
                </TouchableOpacity>
                <Text style={styles.categoryText}>Fabric</Text>
              </View>


              <View style={styles.categoryCont}>
                <TouchableOpacity style={{...styles.categoryBox, ...{backgroundColor:(this.state.category=='Food')?'#FFF8F6':'white'}}} onPress={()=>this.setState({category:'Food'})}>
                {(this.state.category!='Food')&&<Image source={require('../../../assets/images/icons/food.png')} resizeMode="contain" style={{width:'40%'}}/>}
                {(this.state.category=='Food')&&<Image source={require('../../../assets/images/icons/food2.png')} resizeMode="contain" style={{width:'40%'}}/>}
                </TouchableOpacity>
                <Text style={styles.categoryText}>Food</Text>
              </View>


              <View style={styles.categoryCont}>
                <TouchableOpacity style={{...styles.categoryBox, ...{backgroundColor:(this.state.category=='Electronics')?'#FFF8F6':'white'}}} onPress={()=>this.setState({category:'Electronics'})}>
                {(this.state.category!='Electronics')&&<Image source={require('../../../assets/images/icons/electronics.png')} resizeMode="contain" style={{width:'40%'}}/>}
                {(this.state.category=='Electronics')&&<Image source={require('../../../assets/images/icons/electronics2.png')} resizeMode="contain" style={{width:'40%'}}/>}
                </TouchableOpacity>
                <Text style={styles.categoryText}>Electronics</Text>
              </View>

              <View style={styles.categoryCont}>
                <TouchableOpacity style={{...styles.categoryBox, ...{backgroundColor:(this.state.category=='Other')?'#FFF8F6':'white'}}} onPress={()=>this.setState({category:'Other'})}>
                {(this.state.category!='Other')&&<Image source={require('../../../assets/images/icons/other.png')} resizeMode="contain" style={{width:'40%'}}/>}
                {(this.state.category=='Other')&&<Image source={require('../../../assets/images/icons/other2.png')} resizeMode="contain" style={{width:'40%'}}/>}
                </TouchableOpacity>
                <Text style={styles.categoryText}>Other</Text>
              </View>
            </View>


            <TouchableOpacity activeOpacity={((this.state.category==''))?1:0.7} style={{...styles.ctnBtn, ...{backgroundColor:((this.state.category==''))?'#EEEEEE':'#FF4800'}}} onPress={()=>this.continueProcess()}>
              <Text style={{...styles.btnText, ...{color:((this.state.category==''))?'#707070':'#FFFFFF'} }}> Continue </Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>

    );
  }
}

/*
<View style={styles.formBox}>

  {(this.state.quantity!='')&&<Text style={styles.label}> Quantity</Text>}
  <View style={styles.formCont}>
    <TextInput style={styles.formInput} placeholder={"Quantity"} value={this.state.quantity} onChangeText={(value)=>{this.setState({quantity:value})}}/>
    <View style={styles.inputButtons}>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.inputBtnText}>-</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.inputBtnText}>+</Text>
      </TouchableOpacity>
    </View>
  </View>
  {(this.state.note!='')&&<Text style={styles.label}> Note</Text>}
  <TextInput style={styles.formInput} multiline={true} placeholder={"Note to rider"} value={this.state.note} onChangeText={(value)=>{this.setState({note:value})}}/>

</View>

*/
