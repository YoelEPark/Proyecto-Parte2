import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Posteos ({item}){

    console.log(item);

    return(
        <View stlye={styles.container}>
            <Text>{item.data.description}</Text>
            <Text>{item.data.createdAt}</Text>
            <Text>{item.data.owner}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
   
    container:{
        flex: 1,
        justifyContent: 'center',
        padding: 5,
    }
})