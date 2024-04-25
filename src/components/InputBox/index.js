import { View, StyleSheet,TextInput, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { useState } from'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getDoc, collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { FIREBASE_DB, FIREBASE_AUTH } from "../../../firebaseConfig";
import { useRoute } from "@react-navigation/native";




const InputBox =() => {
    
    
    const route = useRoute();
    const currentUser =  FIREBASE_AUTH.currentUser;
    const [newMessage,setNewMessage] = useState('');
   



    const sendMessage = async () => {
       
        // function createInboxDocId(userId1, userId2) { const userIds = [userId1, userId2].sort(); return userIds.join('-'); }

        if (newMessage.trim() === '') {
            alert('Please enter a message');
            return;
          }
        
       
        const inboxDocRef =   doc ( collection( FIREBASE_DB, 'inbox'), new Date().toString())
        
        await setDoc ( inboxDocRef, {
                message: newMessage,
                CreatedAt: new Date(),
                from: currentUser.email,
                to: route.params.email,
                // isRead: false,
                // isDelivered: false,
                // isSeen: false,
                // isDeleted: false,
         });
        // const messageCollectionRef =  collection( inboxDocRef, currentUser.email);
        // const messageDocRef = doc( messageCollectionRef, new Date().toString() );
  
        //     await setDoc(messageDocRef, {
        //       message: newMessage,
        //       CreatedAt: new Date(),
        //       from: currentUser.email,
        //       to: route.params.email,
        //       // isRead: false,
        //       // isDelivered: false,
        //     });
  
         setNewMessage ("");     
        
    };


    return (
        <View style={styles.input}>
        <TouchableOpacity>
        <AntDesign name="plus" size={24} color='royalblue' style={{marginRight:10}} />
        </TouchableOpacity>  
           <TextInput
                value={newMessage}
                onChangeText={setNewMessage}
                style={{backgroundColor:'white',maxHeight:35,borderColor:'silver',borderWidth:1,borderRadius:30,flex:1,color:'black'}}/>
            <TouchableOpacity
              onPress={ sendMessage }
              >
        <MaterialIcons name="send" size={24} color='white' style={{marginLeft:10,borderRadius:24,backgroundColor:'royalblue',padding:5}}/>
        </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
   
    input:{
        paddingVertical:12,
        paddingHorizontal:10,
        height:70,
        backgroundColor:'transparent',
        flexDirection:'row',
        alignItems:'center',
        

    },

})

export default InputBox;