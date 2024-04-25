import React from "react";
import { StyleSheet,StatusBar, Text, View, ScrollView } from "react-native";
import Homescreen from "./screens/Homescreen";
import ChatScreen from "./screens/ChatScreen";
import Navigator from "./Navigation";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";


export const App = () => (
  

      <View style={styles.container}>
        
    <StatusBar barStyle={"dark-content"} backgroundColor="transparent" translucent /> 
       <Navigator/>
     
      </View>

);


const styles = StyleSheet.create({
container: {

  flex: 1,
  backgroundColor: "white",
  alignItems: "stretch",
  
},

});
