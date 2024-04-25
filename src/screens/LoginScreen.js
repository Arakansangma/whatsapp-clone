import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native"
import { FIREBASE_AUTH } from '../../firebaseConfig'
import { signInWithEmailAndPassword , createUserWithEmailAndPassword } from 'firebase/auth';



const LoginScreen = () => {

  const navigation = useNavigation();
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const auth = FIREBASE_AUTH; 
  
  const signIn = async () =>{
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth,email, password);
      console.log(response);
     
    } catch (error) {
      console.log(error);
      alert('Sign in failed: ' + error.message);
    }finally{
      setLoading(false);
    }
  };

  






  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container }>
          <MaterialIcons
            name="wechat"
            size={60}
            style={{ color: "#DCF8C5", borderRadius: 50, backgroundColor: "green", padding: 5 }}
          />
          <Text style={styles.heading}>Login to your account</Text>
          <View style={styles.card}>
            <Text style={styles.text}>Email Address</Text>
            <TextInput
              value = {email}
              onChangeText={setemail}
              keyboardType='default'
              style={styles.input}
              placeholder="abcd@email.com"
              autoCapitalize='none'
              placeholderTextColor="grey"
            />
            <Text style={styles.text}>Password</Text>
            <TextInput
              onChangeText={setPassword}
              value ={password}
              style={styles.input}
              secureTextEntry ={true}
              placeholder="******"
              placeholderTextColor="grey"
              autoCapitalize='none'
            />
            <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
            { loading ? (<ActivityIndicator size="large" />
            ) : ( <>

            <Pressable
              onPress={()=>signIn()}
            >
              <View style={styles.button}>
                <Text style ={{color: 'black'}}>Sign in</Text>
              </View>
            </Pressable>
            <View style ={{flexDirection:'row',marginTop:10}}>
              <Text style={{fontSize: 15 , color: 'gray'}} >Dont have an account  </Text>
            <Pressable
              onPress={()=>navigation.navigate("Outside")}
            >
                <Text style={{fontSize: 15 , color:'blue'}}>Sign Up</Text>
            </Pressable>
            </View>
            </>
            )}
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  card: {
    width: "90%",
    backgroundColor: 'lightgray',
    borderRadius: 10,
    alignItems: 'flex-start',
    padding: 20,
    paddingTop: 20,
  },
  heading: {
    fontSize: 30,
    marginTop: 10,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    width: '100%',
    height: 40,
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    color:'black',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    opacity: 0.8,
  },
  button: {
    width: 220,
    borderRadius: 20,
    backgroundColor: '#DCF8C5',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
});

export default LoginScreen;
