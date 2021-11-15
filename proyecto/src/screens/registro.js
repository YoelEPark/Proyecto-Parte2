import React, { Component } from 'react';
import  {  Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

export default class registro extends Component {
  constructor(props){
     super(props);
     this.state = {
       email: "",
       password: ""
     }
  }



  render(){  
  return (
    <View style = {styles.container}>
        <Text style={styles.text}> Registro </Text>
        <TextInput
          style={styles.field}
          placeholder="email"
          keyboardType="email-address"
          onChangeText={text => this.setState({email: text})}
          />
          <TextInput
          style={styles.field}
          placeholder="password"
          keyboardType="default"
          onChangeText={text => this.setState({password: text})}
          />
          <TouchableOpacity style = {styles.button} onPress={() => this.props.registroNuevo(this.state.email, this.state.password)}>
            <Text style={styles.text}> Sign Up  </Text>
          </TouchableOpacity>
    </View>
  );
   }
  }

  const styles = StyleSheet.create({
      container: {
          flex: 1,
          alignItems: 'center'
      },
      field: {
          width: '80%',
          backgroundColor: "yellow",
          color: 'blue',
          padding: 10,
          marginVertical: 10
      },
      button: {
          width: '30%',
          backgroundColor: "green",
      },
      text: {
          color: 'blue',
          fontSize: 20
      }
  })