import React, { Component } from "react";
import  {  Text, View, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import Posteos from '../components/posteos';
import { db } from '../firebase/config';

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      posteos: []
  }
  }


  componentDidMount(){
    db.collection('posteos').orderBy("createdAt", "desc").onSnapshot(
        docs => {
            let postsAux = [] 
            docs.forEach( doc => {
                postsAux.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                posteos: postsAux
            })
        }
    )
}
render(){ 
  return (
    <View >
        <TouchableOpacity style = {styles.button} onPress={() => this.props.deslogueo()}>
                    <Text style = {styles.text}> Logout </Text>
                </TouchableOpacity>
               
                <FlatList
                data = {this.state.posteos}
                keyExtractor = {posteos => posteos.id.toString()}
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
      color: '#000000',
      fontSize: 20,
      textAlign: 'center'
  }
}) 