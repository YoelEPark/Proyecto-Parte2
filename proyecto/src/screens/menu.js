import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'; 
import Home from './home';
import Login from './login';
import MiPerfil from './miperfil';
import Registro from './registro';
import { auth } from '../firebase/config';




export default class menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            logueado: false,
            error: null,

        }
    }
 


    
            registroNuevo(email, password) {
                auth.createUserWithEmailAndPassword(email, password)
                .then (responce => {
                  console.log(responce);
                  alert("Usuario Registrado!!!")
                  this.setState({
                    logueado: true
                  })
                } )
              .catch( error => {
                console.log(error);
                alert("Ocurrio un error")
                this.setState({
                  error: "Fallo en el registro"
                })
              })
              } 

            logueoNuevo(email, password) {
                auth.signInWithEmailAndPassword(email, password)
                .then( response => {
                    console.log(response);
                    alert("Usuario logeado!!!");
                    this.setState({
                        logueado: true
                    })
                })
                .catch( response => {
                    console.log(response);
                    alert("Error en el logeo");
                    this.setState({
                        error: "Error en logeo :("
                    })
                })
            }

    render(){
          const Drawer = createDrawerNavigator();
         return (
          <NavigationContainer>
                <Drawer.Navigator>
                    {this.state.logueado === true ?
                     <Drawer.Screen name="Home" component={()=> <Home/> }/>
                        :
                        <>
                   
                  <Drawer.Screen name="Login">
                                {props => <Login {...props} logueoNuevo={(email, password)=>this.logueoNuevo(email, password)}/>}
                  </Drawer.Screen>
                            

                  <Drawer.Screen name="MiPerfil" component={()=> <MiPerfil/> }/>

                  <Drawer.Screen name = "Registro">
                                {props => <Registro {...props} registroNuevo={(email, password)=>this.registroNuevo(email, password)}/>}
                             </Drawer.Screen>
                            </>
                            }
                </Drawer.Navigator>
          </NavigationContainer>
     
  )
}  
}