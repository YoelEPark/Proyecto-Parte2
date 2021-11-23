import React, { Component } from "react";
import  {  Text, View, StyleSheet,  FlatList } from "react-native";
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
deletePost(param) {
  db.collection("posts")
    .where("createdAt", "==", param)
    .get()
    .then((data) => {
      data.forEach((doc) => doc.ref.delete());
      const postsFiltered = this.state.posts.filter(
        (post) => post.createdAt != param
      );
      this.setState({ posts: postsFiltered });
    });
}
render(){ 
  return (
    <View  >
            
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
  text: {
      color: '#ffffff',
      fontSize: 20,
      textAlign: 'center'
  }
}) 