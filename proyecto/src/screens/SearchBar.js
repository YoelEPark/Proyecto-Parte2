import React, { Component } from "react";
import  { TextInput, View, StyleSheet,  FlatList } from "react-native";
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
  Busqueda(text){
    db.collection('posts').where('owner','==', text).get().then(docs => {
        let posts=[];
        docs.forEach(doc => {
            posts.push({
                id: doc.id,
                data: doc.data()

            })
        })
        this.setState({
            posts: posts,
            search: text
        })
    })  
}
 

 render(){ 
    return (
      <View style = {styles.container}>
          <TextInput
           style={styles.field}
           keyboardType='default'
           placeholder="Buscar"  
           onChangeText  = { (text) => this.Busqueda(text)}
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
        backgroundColor: '#170e33'
    },
    field: {
        width: '100%',
        backgroundColor: "#2b1a5e",
        color: '#ffffff',
        padding: 10,
        marginVertical: 10,
      
    },
    button: {
        width: '30%',
        backgroundColor: "#ffffff",
    },
    text: {
        color: '#ffffff',
        fontSize: 20,
        textAlign: 'center'
    },
    
})