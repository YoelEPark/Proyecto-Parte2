import { Camera } from 'expo-camera';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import firebase from 'firebase';
import { storage } from '../firebase/config';

export default class MyCamera extends React.Component {
    constructor(props){
        super(props);
        this.camera; 
        this.state = {
            photo: '',
            permission: false,
        }
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(response => {
            console.log(response)
            this.setState({
                permission: response.granted
            })
        })
    }


    takePicture(){
        if(!this.camera) return;
        this.camera.takePictureAsync()
        .then(photo => {
            console.log(photo)
            this.setState({
                photo: photo.uri
            })
        })
    }

    uploadImage(){
        fetch(this.state.photo)
        .then(res =>{
            return res.blob();  
        })
        .then(image => {
            const ref = storage.ref(`camera/${Date.now()}.jpg`)
            ref.put(image)
            .then(() =>{
                ref.getDownloadURL()
                .then(url =>{
                    console.log(url);
                    this.setState({
                        photo: ''
                    })
                    this.props.savePhoto(url);
                })   
            })

        })
    }




}