import React, { Component } from 'react';
import  {  Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

export default class registro extends Component {
  constructor(props){
     super(props);
     this.state = {
       email: "",
       password: "",
       logueado: false,
       error: ""
     }
  }

registroNuevo() {
  auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
  .then (responce => {
    console.log(responce);
    alert("Usuario Registrado!!!")
    this.setState({
      logueado: true
    })
  } )
.catch( error => {
  console.log(error);
  alert("Ocurrio un error")
  this.setState({
    error: "Fallo en el registro"
  })
})
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
          <TouchableOpacity style = {styles.button} onPress={() => this.registroNuevo()}>
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