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
                }}
            }
        }
 
        fueComentado(){
             const posteoActualizar = db.collection("posts").doc(this.props.item.id)
             const comment={user: this.props.item.data.owner, comment: this.state.comment }
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

   
     
    render(){
        console.log(this.props.item);
    return(
        <View style={styles.container}>
            <Image 
            style={styles.imagen}
            source={{uri: this.props.item.data.photo}}
            />
            <Text  style={styles.texto}> Descripcion: {this.props.item.data.description}</Text>
            <Text  style={styles.texto}>{Math.ceil((Date.now() - this.props.item.data.createdAt)/1000/3000)} hour/hours ago</Text>
            <Text  style={styles.texto}> Usuario: {this.props.item.data.owner}</Text>
            <Text  style={styles.texto}> Likes: {this.state.likes} </Text> 
          
            {
                        !this.state.likeado ?
                         <TouchableOpacity style = {styles.button}  onPress = {()=>  this.fueLikeado()}>
                                 <Text  style={styles.text}>
                                 {" "} Like {" "}
                                 </Text>
                         </TouchableOpacity>
                    :
                         <TouchableOpacity style = {styles.button}  onPress = {()=> this.quitarLikeado()}>
                                 <Text  style={styles.text}>
                                 {" "} Unlike {" "}
                                 </Text>
                         </TouchableOpacity>
            }
           
                          <Text  > {" "} </Text> 
          
                         <TouchableOpacity style = {styles.button}   onPress={()=>{this.showModal()}}>
                                 <Text  style={styles.text}>
                                 {" "} Ver comentarios {" "}
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
                                        <Text>X</Text>
                                </TouchableOpacity>
                                
                                {
                                this.props.item.data.comments.length !== 0 ?
                                <FlatList
                                        data={this.props.item.data.comments}
                                        keyExtractor={(comment, id) =>  id.toString()}
                                        renderItem={ ({item}) => <Text  style={styles.texto}> Usuario: "{item.user}" comento lo siguiente: {item.comment}   </Text> }  
                                     />
                                     :
                                     <Text  style={styles.texto}> Aún no hay comentarios. Sé el primero en opinar </Text>
                             }
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
                                      onPress={() => this.fueComentado()}
                                      disabled={this.state.comment == "" ? true : false}>
                                     <Text style={styles.textBtn}>Comentar</Text>
                                 </TouchableOpacity>
                            
                            </View>
                          </Modal>
                        :null}
            <Text  > {" "} </Text> 
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
         button: { 
            backgroundColor: "#00acee",
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
           backgroundColor: "#00acee",
           color: "black",
           padding: 7,
           marginTop: 5,
           borderRadius: 15,
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
           width: '100%',
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
         text: {
            color: '#ffffff',
            fontSize: 20,
            textAlign: 'center'
         },
         texto: {
            color: '#ffffff'
         }
    })