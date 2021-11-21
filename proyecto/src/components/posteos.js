import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native'
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

export default class Posteos extends Component{

        constructor(props){
            super(props);
            this.state = {
                likeado: false,  
                likes: 0,
                showModal: false,
            }
        }


        componentDidMount(){
            if (this.props.item){
            if (this.props.item.data.likes.lenght !== 0){
                this.setState({
                    likes: this.props.item.data.likes.lenght
                })
                if (this.props.item.data.likes.includes(auth.currentUser.email)){
                    this.setState({
                        likeado: true
                    })
                } } }
    }
 



fueLikeado(){
    const posteoActualizar = db.collection('posts').doc(this.props.item.id)
        
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
    const posteoActualizar = db.collection('posts').doc(this.props.item.id)
    
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
 
    showModal(){
        console.log('Mostrando modal')
        this.setState({
            showModal: true,
        })
    }
    
    closeModal(){
        console.log('Cerrando modal')
        this.setState({
            showModal: false,
        })
    }
   
    render(){
        console.log(this.props.item);
    return(
        <View stlye={styles.container}>
            <Image 
            style={styles.imagen}
            source={{uri: this.props.item.data.photo}}
            />
            <Text>{this.props.item.data.description}</Text>
            <Text>{Math.ceil((Date.now() - this.props.item.data.createdAt)/1000/3000)} hour/hours ago</Text>
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
                 <TouchableOpacity onPress={()=>{this.showModal()}}>
                    <Text>
                        Ver comentarios
                    </Text>
                </TouchableOpacity>
                {
                    this.state.showModal ?

                        <Modal 
                        animationType = "fade"
                        transparent = {false}
                        visible = {this.state.showModal}
                        style = {styles.modal}
                        >
                            <View style={styles.modalView}>
                              
                                <TouchableOpacity style={styles.closeModal} onPress={()=>{this.closeModal()}}>
                                        <Text style={styles.modalText} >X</Text>
                                </TouchableOpacity>
                                <Text>
                                    Aquí también irán los comentarios!  
                                </Text>
                                <Text>
                                    Aquí también debe ir la posibilidad de agregar un comentario
                                </Text>
                            </View>

                        </Modal>
                        :
                        null
                }
            
        </View>
    )
}
}
const styles = StyleSheet.create({
    image: {
        height: 200,
    
    },
    container:{
        flex: 1,
        justifyContent: 'center',
        padding: 5,
    },
    
    closeModal:{
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: '#dc3545',
        marginTop:2,
        marginBotom: 10,
        borderRadius: 4,
    },

    modalText:{
        fontWeight: 'bold',
        color:'#fff',
    },
    modalView:{
        backgroundColor: 'green',
        borderRadius: 10,
    },
    modal: {
        border: 'none',
    },
    imagen: {
        height: 300,
        width: '90%'
    }
})