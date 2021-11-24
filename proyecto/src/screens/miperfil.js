import React, { Component } from "react";
import  {  Text, View, StyleSheet,  FlatList, Image, TouchableOpacity } from "react-native";
import { auth, db } from "../firebase/config";
import Posteos from "../components/Posteos";
import { styles } from "../components/MyCamera";

export default class MiPerfil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    }
  } 

  componentDidMount() {
    db.collection("posts")
      .where("owner", "==", auth.currentUser.displayName).orderBy("createdAt", "desc").onSnapshot(
        docs => {
            let postsAux = [] 
            docs.forEach( doc => {
                postsAux.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
          this.setState({
            posts: postsAux,
          })
        } 
      )
  } 
 
  borrarPosteo(posts){
    db.collection('posts').doc(posts.id).delete()
    .then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    } 

  render() {
    console.log(this.state.posts);
    return (
      <View style={me.container}>
        <Text style={me.text}>Usuario: {auth.currentUser.displayName}</Text>
        <Text style={me.text}>E-mail: {auth.currentUser.email}</Text>
        <Text style={me.text}>
          Última fecha de ingreso: {auth.currentUser.metadata.lastSignInTime}
        </Text>
        <Text  style={me.text}>Publicaciones: {this.state.posts.length}</Text> 
        <TouchableOpacity
          style={me.button}
          onPress={() => this.props.deslogueo()}
        >
          <Text style={me.sign}> Cerrar sesión </Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.posts}
          keyExtractor={(posts) => posts.id.toString()}
          renderItem = { ({item}) => <View style={me.container}>
            <Image source= {item.data.photo} style= {me.imagen}/>
            <Text style={me.text}> Descripcion: {item.data.description} </Text>
            <Text  style={me.text}> Likes: {item.data.likes.length} </Text> 
            <TouchableOpacity
          style={me.button}
          onPress={() => this.borrarPosteo(item)} >
          <Text style= {me.sign}> Borrar Posteo </Text>
        </TouchableOpacity>
        </View>
              }
        />
      
      </View>
    )
  }
}

const me = StyleSheet.create({ 
  button: {
    width: '30%',
    marginLeft: '35%',
    backgroundColor: "#00acee",
  }, 
  container: {
    flex: 1, 
    backgroundColor: '#170e33',
    
    },
  text: {
    color: "#ffffff",
    textAlign: "center",
  },
  sign: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
},
imagen: {
  height: 300,
  width: '90%'
}
})
