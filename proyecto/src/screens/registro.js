import React from "react";
import  {  Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";


export default class registro extends Component {
  constructor(props){
     super(props);
     this.state = {
       email: "",
       password: ""
     }
  }

handleRegister() {
  alert (`Registo: usuario: ${this.state.email}, password: ${this.state.password}´)

}

  render(){  
  return (
    <View >
        <Text> funciona???? </Text>
    </View>
  );
   }
}