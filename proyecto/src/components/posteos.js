import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

export default class Posteos extends Component{

        constructor(props){
            super(props);
            this.state = {
                likeado: false,  
                likes: 0
            }
        }


        componentDidMount(){
            if (this.props.dataItem){
            if (this.props.item.likes.lenght !== 0){
                this.setState({
                    likes: this.props.item.data.likes.lenght
                })
                if (this.props.item.data.likes.includes(auth.currentUser.email)){
                    this.setState({
                        liked: true
                    })
                } } }
    }
 



fueLikeado(){
    const posteoActualizar = db.collection('posteos').doc(this.props.item.id)
        
    posteoActualizar.update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })
    .then(()=> {
        this.setState({
            likeado: true,
            likes: this.state.likes + 1
        })
    })
}
 

quitarLikeado(){
    const posteoActualizar = db.collection('posteos').doc(this.props.item.id)
    
    posteoActualizar.update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })
    .then(()=> {
        this.setState({
            likeado: false,
            likes: this.state.likes - 1
        })
    })
}

   
    render(){
    return(
        <View stlye={styles.container}>
            <Text>{this.props.item.data.description}</Text>
            <Text>{this.props.item.data.createdAt}</Text>
            <Text>{this.props.item.data.owner}</Text>
            <Text> Likes: {this.state.likes} </Text>

            {
                    !this.state.likeado ?
                    <TouchableOpacity onPress = {()=>  this.fueLikeado()}>
                    <Text>
                        Like
                    </Text>
                </TouchableOpacity>
                    :
                    <TouchableOpacity onPress = {()=> this.quitarLikeado()}>
                        <Text>
                            Unlike
                        </Text>
                    </TouchableOpacity>
                }

            
        </View>
    )
}
}
const styles = StyleSheet.create({
   
    container:{
        flex: 1,
        justifyContent: 'center',
        padding: 5,
    }
})