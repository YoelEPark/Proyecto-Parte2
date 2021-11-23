/* import React, {Component} from "react";
import {View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput} from "react-native";
import { auth, db} from "../firebase/config";
import firebase from "firebase";

export default class Comments extends Component{
    constructor(props){
        super(props);
        this.state = {
            comment: "",
        };
    }

    onComment(){
        const posteoActualizar = db.collection("posts").doc(this.props.postId);
        if(this.state.comment == ""){
            alert('Escriba un comentario')
        } else{
            posteoActualizar.update({
                comments: firebase.firestore.FieldValue.arrayUnion({
                    id: Date.now(),
                    email: auth.currentUser.email,
                    owner: auth.currentUser.displayName,
                    comment: this.state.comment,
                }),
            })
            .then(()=>{
                this.setState({
                    comment:"",
                });
            });
        }
    }

    render() {
      return (
        <View style={styles.modalView}>
          {this.props.comments.length != 0 ? (
            <FlatList
              data={this.props.comments}
              keyExtractor={(comment) => comment.id}
              renderItem={({ item }) => (
                <>
                  <Text style={styles.comment}>
                    <Text style={styles.commentBold}>{item.owner}</Text>
                    {item.comment}
                    {item.owner == auth.currentUser.displayName ? (
                      <TouchableOpacity
                        style={styles.closeModal}
                        onPress={() => {
                          this.props.deleteComment(item.id);
                        }}
                      >
                        <Ionicons name="trash" size="15px" color="red" />
                      </TouchableOpacity>
                    ) : null}
                  </Text>
                </>
              )}
            />
          ) : (
            <Text style={styles.comment}>Aún no hay comentarios.</Text>
          )}
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
            disabled={this.state.comment == "" ? true : false}
          >
            <Text style={styles.textBtn}>Comentar</Text>
          </TouchableOpacity>
        </View>
      );
    } 
  } 
  
    const styles = StyleSheet.create({
      image: {
        height: 200,
      },
      container: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        padding: 10,
        margin: "auto",
        marginTop: 15,
        borderRadius: 15,
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: "rgba(0, 0, 0, 0.247)",
      },
      input: {
        color: "grey",
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
        color: "white",
        textAlign: "center",
      },
      textBtn: {
        color: "black",
        textAlign: "center",
      },
      btn: {
        backgroundColor: "#f9ff21",
        color: "black",
        padding: 7,
        marginTop: 5,
        borderRadius: 15,
      },
      closeModal: {
        alignSelf: "flex-end",
        padding: 10,
        marginTop: 2,
        marginBotom: 10,
        borderRadius: 4,
      },
      modalText: {
        fontWeight: "bold",
        color: "#fff",
      },
      modalView: {
        color: "white",
        borderRadius: 10,
        width: "100%",
      },
      modal: {
        border: "none",
      },
    }); //Styles

 */

