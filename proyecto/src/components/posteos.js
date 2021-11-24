import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, FlatList , TextInput} from 'react-native'
import { auth, db } from '../firebase/config';
import firebase from 'firebase';

export default class Posteos extends Component{

        constructor(props){
            super(props);
            this.state = {
                likeado: false,  
                likes: 0,
                showModal: false,
                comment: "",
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
 
    onComment(){
        const posteoActualizar = db.collection("posts").doc(this.props.item.id)
        const comment={user: auth.currentUser.email, comment: this.state.comment, fecha: new Date()}
        console.log(comment)
            posteoActualizar.update({
                comments: firebase.firestore.FieldValue.arrayUnion(comment)
            })
            .then(()=>{
                this.setState({
                    comment:"",
                })
            })
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

    quitarComentario(){
        let confirmDelete = confirm("seguro queres borrar el comentario?")
        
        const posteoActualizar = db.collection('posts').doc(this.props.item.id).delete();
        
        posteoActualizar.update({
            comment: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=> {
            this.setState({
                comment: false,
                comment: this.state.comment 

                
            })
        })
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
                                <FlatList
                                        data={this.props.item.data.comments}
                                        keyExtractor={(comment, id) =>  id.toString()}
                                        renderItem={ ({item}) => <Text  style={styles.modalText}> {item.comment}  {item.user}{/*  {item.fecha} */} </Text> }  
                                     />
                              
          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Esribe un comentario..."
            multiline={true}
            numberOfLines={2} 
            onChangeText={(text) => this.setState({ comment: text })}
            value={this.state.comment}
          />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.onComment()}
            disabled={this.state.comment == "" ? true : false}>
            <Text style={styles.textBtn}>Comentar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress = {()=> this.quitarComentario()}>
                        <Text  style={styles.modalText}>
                            Borrar comentario
                        </Text>
                    </TouchableOpacity>
    </View>
         </Modal>
         :null}
            
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
    input: {
        color: "grey",
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
    btn: {
        backgroundColor: "#f9ff21",
        color: "black",
        padding: 7,
        marginTop: 5,
        borderRadius: 15,
      },
    modalText:{ 
        color:'#ffffff',
    },
    textBtn: {
        color: "black",
        textAlign: "center",
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
    },
     comment: {
        padding: "5px",
        color: "white",
      },
      commentBold: {
        padding: "5px",
        color: "white",
        fontWeight: "bolder",
      },
})