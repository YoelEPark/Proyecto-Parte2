import React, {Component} from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import { auth, db } from '../firebase/config';

export default class crearPosteo extends Component {
    constructor(props){
        super(props);
        this.state = {
            comment: ""
        }
    }

    posteoNuevo(){
        db.collection('posteos').add({
            owner: auth.currentUser.displayName,
            description: this.state.comment,
            email: auth.currentUser.email,
            createdAt: Date.now(),
            likes: [],
            comments: []
        })
        .then(response => {
            console.log(response);
            alert("Posteo realizado!");
            this.setState({
                comment: ""
            })
            this.props.navigation.navigate('Home');
        })
        .catch(error => {
            console.log(error);
            alert("Hubo un error");
        })
    }
    
    render(){
        
        return(
            <View style={styles.container}>
                <TextInput
                    style={styles.field}
                    keyboardType='default'
                    placeholder="Ingresa aqui lo que desees postear"
                    multiline={true}
                    numberOfLines = {4}
                    onChangeText={text => this.setState({ comment: text })}
                    value = {this.state.comment}
                />
                <TouchableOpacity style = {styles.button} onPress={() => this.posteoNuevo()}>
                    <Text style = {styles.text}> Postear </Text>
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
        backgroundColor: "#2DFF95",
        color: '#FF712D',
        padding: 10,
        marginVertical: 10
    },
    button: {
        width: '30%',
        backgroundColor: "#FF712D",
    },
    text: {
        color: '#000000',
        fontSize: 20,
        textAlign: 'center'
    }
})