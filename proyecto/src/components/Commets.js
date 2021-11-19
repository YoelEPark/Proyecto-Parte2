import React, {Component} from "react";
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
        const posteoActualizar = db.collection("posteos").doc(this.props.postId);
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
                    <Text>
                      {item.owner}: {item.comment}
                    </Text>
                    {item.owner == auth.currentUser.displayName
                    ? <TouchableOpacity
                        style={styles.closeModal}
                        onPress={() => {
                          this.props.deleteComment(item.id);
                      }}
                    >
                      <Text style={styles.modalText}>X</Text>
                    </TouchableOpacity>
                    : null
                }
                  </>
                )}
              /> ) : (
              <Text>Aún no hay comentarios.</Text>
            )}
            <TextInput
              keyboardType="default"
              placeholder="Comentario..."
              multiline={true}
              numberOfLines={2}
              onChangeText={(text) => this.setState({ comment: text })}
              value={this.state.comment}
            />
            <TouchableOpacity style={styles.btn} onPress={() => this.onComment()}>
              <Text style={styles.text}>Comentar</Text>
            </TouchableOpacity>
          </View>
        );
      } 
    } 




