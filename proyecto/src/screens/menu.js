import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'; 
import Home from './Home';
import Login from './Login';
import MiPerfil from './MiPerfil';
import Registro from './Registro';
import { auth } from '../firebase/config';
import CrearPosteo from './CrearPosteo';
import SearchBar from './SearchBar';




export default class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            logueado: false,
            error: null,
            mensaje: "",
            mensajes: ""

        }
    }
 
    componentDidMount(){
        auth.onAuthStateChanged( user => {
            if (user) {
                this.setState({
                    logueado: true
                })
            }
        })
    }

    
            registroNuevo(email, password, username) {
                auth.createUserWithEmailAndPassword(email, password)
                .then (response => {
                  console.log(response);
                  alert("Usuario Registrado!!!");
                  response.user.updateProfile({
                      displayName: username
                  })
                  this.setState({
                    logueado: true
                  })
                } )
               .catch(error => {  
                    this.setState({
                        mensaje: error.message});
               }) }

            logueoNuevo(email, password) {
                auth.signInWithEmailAndPassword(email, password)
                .then( response => {
                    console.log(response);
                    alert("Usuario logeado!!!");
                    this.setState({
                        logueado: true
                    })
                })
                .catch( error => {
                    this.setState({
                        mensajes: error.message
                    })
                })
            }

            deslogueo(){
                auth.signOut()
                .then(()=> {
                    this.setState({
                        logueado: false
                    })
                })
                .catch(error => {
                    console.log(error);
                })
            }

    render(){
          const Drawer = createDrawerNavigator();
         return (
          <NavigationContainer>
                <Drawer.Navigator>
                    {this.state.logueado === true ?
                    <>
                     <Drawer.Screen name = "Home" component={()=> <Home/> }/>
                    
                 <Drawer.Screen name ="Crear Posteo">
                 {props => <CrearPosteo {...props} />}
                     </Drawer.Screen>
                     <Drawer.Screen name="Mi Perfil"  >
                 {props => <MiPerfil {...props} deslogueo={()=>this.deslogueo()}/>}
                 </Drawer.Screen>
                 <Drawer.Screen name = "SearchBar" component={()=> <SearchBar/> }/>
                    </>
                        :
                        <>
                   
                  <Drawer.Screen name="Login">
                                {props => <Login {...props} logueoNuevo={(email, password)=>this.logueoNuevo(email, password)} falla= {this.state.mensajes}/>}
                  </Drawer.Screen>
                  
                  
                  <Drawer.Screen name = "Registro">
                                {props => <Registro {...props} registroNuevo={(email, password, username)=>this.registroNuevo(email, password, username)} error= {this.state.mensaje} />}
                             </Drawer.Screen>
                            </>
                            }
                </Drawer.Navigator>
          </NavigationContainer>
     
  )
}  
}