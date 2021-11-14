import React, { Component } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import { auth } from '../firebase/config';

export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            logueado: false,
            error: ""
        }
    }

    logueoNuevo() {
        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        .then( response => {
            console.log(response);
            alert("Usuario logeado!!!");
            this.setState({
                logueado: true
            })
        })
        .catch( response => {
            console.log(response);
            alert("Error en el logeo");
            this.setState({
                error: "Error en logeo :("
            })
        })
    }

    render() {
        console.log(this.state.logueado);
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
                <TouchableOpacity style = {styles.button} onPress={() => this.logueoNuevo()}>
                    <Text style = {styles.text}> Login </Text>
                </TouchableOpacity>
            </View>
        )
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