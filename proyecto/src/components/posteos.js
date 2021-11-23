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
            if (this.props.item.data.likes.length !== 0){
                this.setState({
                    likes: this.props.item.data.likes.length
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
    deleteComment(deletedCommentId) {
        let filteredComments = this.props.dataItem.data.comments.filter(
          (element) => element.id != deletedCommentId
        );
        this.setState({
          filteredComments: filteredComments,
        });
    
        const posteoActualizar = db.collection("posts").doc(this.props.dataItem.id);
    
        posteoActualizar.update({
          comments: filteredComments,
        });
      }
      deletePost() {
        db.collection("posts").doc(this.props.dataItem.id).delete();
      }
   
    render(){
        console.log(this.props.item);
    return(
        <View style={styles.container}>
            <Image 
            style={styles.imagen}
            source={{uri: this.props.item.data.photo}}
            />
            <Text  style={styles.modalText}>{this.props.item.data.description}</Text>
            <Text  style={styles.modalText}>{Math.ceil((Date.now() - this.props.item.data.createdAt)/1000/3000)} hour/hours ago</Text>
            <Text  style={styles.modalText}> {this.props.item.data.owner}</Text>
            <Text  style={styles.modalText}> Likes: {this.state.likes} </Text>

            {
                    !this.state.likeado ?
                    <TouchableOpacity onPress = {()=>  this.fueLikeado()}>
                    <Text  style={styles.modalText}>
                        Like
                    </Text>
                </TouchableOpacity>
                    :
                    <TouchableOpacity onPress = {()=> this.quitarLikeado()}>
                        <Text  style={styles.modalText}>
                            Unlike
                        </Text>
                    </TouchableOpacity>
                }
                 <TouchableOpacity onPress={()=>{this.showModal()}}>
                    <Text  style={styles.modalText}>
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
                                        <Text  >X</Text>
                                </TouchableOpacity>
                                <Text  style={styles.modalText}>
                                    Aquí también irán los comentarios!  
                                </Text>
                                <Text  style={styles.modalText}>
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
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#170e33'
    },
    closeModal:{
        alignSelf: 'flex-end',
        paddingLeft: 8,
        paddingRight: 8,
        right: 1,
        backgroundColor: '#dc3545',
        marginTop:1,
        marginBotom: 5,
        borderRadius: 5,
    },

    modalText:{ 
        color:'#ffffff',
    },
    modalView:{
        backgroundColor: '#2b1a5e',
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