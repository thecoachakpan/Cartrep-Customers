import React, {Component} from 'react';

import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';


const {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
  body:{
    backgroundColor:'#FF0200',
    alignItems:'center',
    justifyContent:'center',
    height:height,
    width:width,
    position:'absolute',
    zIndex:10,
    opacity:0,
  },
  splash:{
    width:(width/4),
    height:(width/4),
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
            source={require('./assets/images/logo/logoWhite.png')}
            resizeMode="contain"
            style={{width:'90%',height:'90%'}}
          />
        </View>
      </View>
    );
  }
}
