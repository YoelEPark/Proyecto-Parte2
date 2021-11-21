import React, { Component } from "react";
import  {  Text, TextInput, View, StyleSheet,  FlatList, Image } from "react-native";
import Posteos from '../components/Posteos';
import { db } from '../firebase/config';

export default class SearchBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: [],
      search:""
  }
  }
 Busqueda(){
     this.setState({posts: [] })
    db.collection('posts').orderBy("createdAt", "desc").where("owner","==",this.state.search).onSnapshot( 
        docs => {
            let postsAux = [] 
            docs.forEach( doc => {
                postsAux.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                posts: postsAux
            })
        }
    )
}
 

 render(){ 
    return (
      <View >
          <TextInput
           style={styles.field}
           keyboardType='default'
           placeholder="Buscar"  
           onChangeText={text => this.setState({ search: text },this.Busqueda)}
           value= {this.state.search}   />
              <FlatList
                 data = {this.state.posts}
                 keyExtractor = {posts => posts.id.toString()}
                renderItem = { ({item}) => {return <Posteos item = {item}></Posteos> }  }
                  />
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
    },
    imagen: {
        height: 300,
        width: '90%'
    }
})