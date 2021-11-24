import React, { Component } from 'react';
import  {  Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'; 

export default class Registro extends Component {
  constructor(props){
     super(props);
     this.state = {
       email: "",
       password: "",
       username: "",
       campos: ""
     }
  }
  
registroNuevo(){
  if (this.state.email !== "" && this.state.password !== "" && this.state.username != "") {
    this.props.registroNuevo(this.state.email, this.state.password, this.state.username)
  }
  else (this.setState({campos: "Falta rellenar algun campo"})); console.log(this.props);
}

  render(){  
  return (
    <View style = {styles.container}>
        <Text style={styles.text}> Registro </Text>
        <TextInput
          style={styles.field}
          placeholder="username"
          keyboardType="default"
          onChangeText={text => this.setState({username: text})}
          />
        
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
          secureTextEntry={true}
          onChangeText={text => this.setState({password: text})}
          /> 
            <Text style = {styles.textoDeError}> {this.state.campos} </Text> 
             <Text style = {styles.textoDeError}> {this.props.error} </Text>
          <TouchableOpacity style = {styles.button} onPress={() => this.registroNuevo()}>
            <Text style={styles.sign}> Sign Up  </Text>
          </TouchableOpacity>
    </View>
  );
   }
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#170e33'
    },
    field: {
        width: '80%',
        backgroundColor: "#2b1a5e",
        color: '#ffffff',
        padding: 10,
        marginVertical: 10
    },
    button: {
        width: '30%',
        backgroundColor: "#00acee",
    },
    text: {
        color: '#ffffff',
        fontSize: 20,
        textAlign: 'center'
    }, 
    textoDeError: {
      fontWeight: 'bold',
      color: '#ffffff'
  }, 
    sign: {
      color: '#ffffff',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 20,
  }
  })