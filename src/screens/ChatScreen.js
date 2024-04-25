;
import { Text,FlatList,ImageBackground, View,StyleSheet } from "react-native";
import messages from "../../assets/data/messages.json";
import Message from "../components/Message";
import bg from "../../assets/images/BG.png";
import InputBox from "../components/InputBox";
import {useRoute, useNavigation} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { where,query,getDocs , collection, orderBy, onSnapshot } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";


const ChatScreen = (inbox) =>{

const route = useRoute();
const navigation = useNavigation();
const[chat, setChat] = useState([]);
const currentUser = FIREBASE_AUTH.currentUser;

useEffect(() => {
    navigation.setOptions({ title: route.params.name });

    const getMessage = async () =>{
    const queryRef = query(collection(FIREBASE_DB, 'inbox'), where('to','in',[currentUser.email,route.params.email]), where ('from','in',[route.params.email,currentUser.email]))
    const unsubscribe = onSnapshot(queryRef, ( querySnap) =>{
        const chatters = querySnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setChat(chatters) ;  
    });
       return () => unsubscribe()  ;
    }

    getMessage();
}, []); 
    return(
        <ImageBackground source={bg} style={{flex:1}}>
        <View style={styles.container}>
        {/* <View style={styles.Headerbar}>
          <Text style={styles.Header}>Name</Text>
        </View> */}
        
        <FlatList
        data={chat}
        renderItem={({item}) => <Message message = {item} />}
        style={{}}
        />
        <InputBox/>
        
        </View>
        </ImageBackground>
    )
};
const styles = StyleSheet.create({
    container: {    
      flex: 1,
      
      alignItems: "stretch",
      
    },
    Header:{
        fontSize:25,
        color:'black',
        alignSelf:'center'
    },
    Headerbar:{ 
        paddingTop:40,
        paddingBottom: 15,
        justifyContent:"center",
        paddingStart:15,
        alignItems:'flex-start',
        backgroundColor:'#f0f0f0',
        borderBottomWidth:StyleSheet.hairlineWidth

    },
    input:{
        paddingVertical:12,
        paddingHorizontal:10,
        height:70,
        backgroundColor:'#f0f0f0',
        borderTopWidth:StyleSheet.hairlineWidth,
        flexDirection:'row',
        alignItems:'center',

    },

})
export default ChatScreen;