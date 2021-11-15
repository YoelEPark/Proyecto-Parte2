import React, { Component } from "react";
import  {  Text, View, StyleSheet, TouchableOpacity } from "react-native";


export default class Home extends Component {
  constructor(props){
    super(props);
  }
render(){ 
  return (
    <View >
        <Text> funciona? </Text>
        <TouchableOpacity style = {styles.button} onPress={() => this.props.deslogueo()}>
                    <Text style = {styles.text}> Logout </Text>
                </TouchableOpacity>
    </View>
  );
}
}
const styles = StyleSheet.create({
  
  button: {
      width: '30%',
      backgroundColor: "green",
  },
  text: {
      color: 'yellow',
      fontSize: 20
  }
}) 