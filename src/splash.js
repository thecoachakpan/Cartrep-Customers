import React, {Component} from 'react';

import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';


const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  body:{
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    height:height,
    width:width,
    position:'absolute',
    zIndex:10,
  },
  splash:{
    width:(width),
    height:(height),
    alignSelf:'center',
  }
});

export default class Splash extends Component{
  constructor(props){
    super(props);
    this.state = {};
  }


  render(){
    return(
      <View style={styles.body}>
        <View style={styles.splash}>
          <Image
            source={require('./assets/images/bg/splash.jpg')}
            resizeMode="contain"
            style={{width:'100%',height:'100%'}}
          />
        </View>
      </View>
    );
  }
}
