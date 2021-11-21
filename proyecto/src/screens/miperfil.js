import React, { Component } from "react";
import  {  Text, View, StyleSheet,  FlatList, Image, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase/config";
import Posteos from "../components/Posteos";

export default class MiPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    }
  } 

  componentDidMount() {
    db.collection("posts")
      .where("owner", "==", auth.currentUser.displayName)
      .orderBy("createdAt", "desc")
      .onSnapshot(
        (docs) => {
          let postsAux = [];
          docs.forEach((doc) => {
            postsAux.push({
              id: doc.id,
              data: doc.data(),
            })
          })
          this.setState({
            posts: postsAux,
          })
        } 
      )
  } 
 

  render() {
    return (
      <View style={styles.container}>
        <Text>Usuario: {auth.currentUser.displayName}</Text>
        <Text>E-mail: {auth.currentUser.email}</Text>
        <Text>
          Última fecha de ingreso: {auth.currentUser.metadata.lastSignInTime}
        </Text>
        <Text>Publicaciones: {this.state.posts.length}</Text>{" "} 
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.deslogueo()}
        >
          <Text style={styles.text}> Cerrar sesión </Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.posts}
          keyExtractor={(posts) => posts.id.toString()}
          renderItem = { ({item}) => {return <Posteos item = {item}></Posteos> }  }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  field: {
    width: "80%",
    backgroundColor: "#09009B",
    color: "#FFA400",
    padding: 10,
    marginVertical: 10,
  },
  button: {
    width: "100%",
    backgroundColor: "#0F00FF",
  },
  text: {
    color: "#FFA400",
    textAlign: "center",
  },
  image: {
    height: 200,
  },
  container: {
    flex: 1,
    width: "60%",
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
  text: {
    color: "white",
    textAlign: "center",
  },
  btn: {
    backgroundColor: "red",
    padding: 7,
    marginTop: 5,
    borderRadius: 15,
  },
  closeModal: {
    alignSelf: "flex-end",
    padding: 10,
    backgroundColor: "#dc3545",
    marginTop: 2,
    marginBotom: 10,
    borderRadius: 4,
  },
  modalText: {
    fontWeight: "bold",
    color: "#fff",
  },
  modalView: {
    backgroundColor: "green",
    borderRadius: 10,
  },
  modal: {
    border: "none",
  },
});
