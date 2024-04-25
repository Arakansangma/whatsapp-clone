import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, ScrollView, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FIREBASE_AUTH , FIREBASE_DB } from '../../firebaseConfig';
import {  createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, collection, setDoc } from 'firebase/firestore';



const RegistrationScreen = () => {

  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const [user, setUser] = useState('');
  const auth = FIREBASE_AUTH; 

  
  const signUp = async () =>{
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth,email,password);
      console.log(response);
      alert('Account created') 
      
      const userDocRef = doc ( collection ( FIREBASE_DB, 'users'), response.user.uid)
      await setDoc( userDocRef, {
        name: user,
        email: response.user.email,
        createdAt: new Date(),
      });


    } catch (error) {
      console.log(error);
      alert('Sign up failed: ' + error.message);
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
        <View style={styles.container}>
          <MaterialIcons
            name="wechat"
            size={60}
            style={{ color: "#DCF8C5", borderRadius: 50, backgroundColor: "green", padding: 5 }}
          />
          <Text style={styles.heading}>Create a new account</Text>
          <View style={styles.card}>
            <Text style={styles.text}>User name</Text>
            <TextInput
              value = {user}
              onChangeText={setUser}
              keyboardType='default'
              style={styles.input}
              placeholder="Elon_musk"
              autoCapitalize='none'
              placeholderTextColor="grey"
            />
            <Text style={styles.text}>Email Address</Text>
            <TextInput
              value = {email}
              onChangeText={setemail}
              keyboardType='email-address'
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
            ) : (

            <Pressable
              onPress={()=>signUp()}
            >
              <View style={styles.button}>
                <Text style={{color:'black'}}>Register Account</Text>
              </View>
            </Pressable>
        
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
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    color:'black',
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

export default RegistrationScreen;
