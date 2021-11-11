import React from "react"; 
import Home from "./src/screens/home";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'; 
import Login from './src/screens/login';
import MiPerfil from './src/screens/miperfil';
import Registro from './src/screens/registro';



export default function App() {

  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={()=> <Home/> }/>
        <Drawer.Screen name="Login" component={()=> <Login/> }/>
        <Drawer.Screen name="MiPerfil" component={()=> <MiPerfil/> }/>
        <Drawer.Screen name="Registro" component={()=> <Registro/> }/>
      </Drawer.Navigator>
    </NavigationContainer>
     
  );
}
