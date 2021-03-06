import React, { Component } from "react";
import  { View, StyleSheet,  FlatList } from "react-native";
import Posteos from '../components/Posteos';
import { db } from '../firebase/config';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      posts: []
  }
  }


  componentDidMount(){
    db.collection('posts').orderBy("createdAt", "desc").onSnapshot(
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
    <View  style={styles.container}>
            
            <FlatList
               data = {this.state.posts}
               keyExtractor = {posts => posts.id.toString()}
              renderItem = { ({item}) => 
                    <Posteos item = {item}></Posteos> }
                />
                
    </View>
  );
}
}
const styles = StyleSheet.create({
  
  button: {
      width: '30%',
      backgroundColor: "#FF712D",
  },
  container: {
    flex: 1, 
    backgroundColor: '#170e33',
    
    },
  text: {
      color: '#ffffff',
      fontSize: 20,
      textAlign: 'center'
  }
}) 