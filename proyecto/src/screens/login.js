import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native'; 

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            campos: ""
        }
    }

   logueoNuevo(){
        if (this.state.email !== "" && this.state.password !== "") {
          this.props.logueoNuevo(this.state.email, this.state.password)
        }
        else (this.setState({campos: "Falta rellenar algun campo"})); 
      }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Login</Text>
                <TextInput
                    style={styles.field}
                    keyboardType="email-address"
                    placeholder="email"
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                    style={styles.field}
                    keyboardType='number-pad'
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                />
                 <Text> {this.state.campos} </Text>
                 <Text> {this.props.falla} </Text>
                <TouchableOpacity style = {styles.button} onPress={() => this.logueoNuevo()}>
                    <Text style = {styles.sign}> Login </Text>
                </TouchableOpacity>
            </View>
        )
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
    sign: {
      color: '#ffffff',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: 20,
  }
  })