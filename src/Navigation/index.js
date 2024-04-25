import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import ChatScreen from "../screens/ChatScreen";
import Homescreen from "../screens/Homescreen";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import { FIREBASE_AUTH } from '../../firebaseConfig'
import { TouchableOpacity,Text } from "react-native";

const Stack = createNativeStackNavigator();
const auth = FIREBASE_AUTH;
const OutsideStack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator initialRouteName="Chats" screenOptions={ { headerStyle: {backgroundColor: 'whitesmoke'}}} >
      <InsideStack.Screen 
      name="Chats" component={Homescreen} 
      options={({ navigation }) => ({  headerRight:() => (<TouchableOpacity onPress={() => FIREBASE_AUTH.signOut()} ><Text style={{color:'gray'}}>Logout</Text></TouchableOpacity>) })}/>
      <InsideStack.Screen name="Chat" component={ChatScreen} />               
    </InsideStack.Navigator>
  );
}

function OutsideLayout() {
  return (
    <InsideStack.Navigator initialRouteName="Registration" screenOptions={ { headerShown:false ,headerStyle: {backgroundColor: 'whitesmoke'}}} >
      <InsideStack.Screen name="Registration" component={RegistrationScreen} />           
    </InsideStack.Navigator>
  );
}





const Navigator = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in.
        setUser(user);
      } else {
        // User is signed out.
        setUser(null);
      }
    });

    // Clean up the subscription on unmount.
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={ { headerShown:false, headerStyle: {backgroundColor: 'whitesmoke'}}} >
   
          {user? (
              <Stack.Screen name="Inside" component={InsideLayout} />
          ) : (
            <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Outside" component={OutsideLayout} /> 
            </>
          )}

   
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;