import ChatListItem from "../components/ChatListItem/index";
import chats from "../../assets/data/chats.json";
import { Text,FlatList, View,StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { FIREBASE_DB } from "../../firebaseConfig";
import { collection, getDocs,  doc, setDoc, addDoc, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";




const Homescreen = () =>{
    const [users, setUsers] = useState ([]);
    const auth = getAuth();
    const currentuser = auth.currentUser;

    useEffect(()=>{
        const getData = async () => {
            const queryRef =  collection(FIREBASE_DB, "users");
            const unsubscribe = onSnapshot ( queryRef, (querySnap)=>{
                const newUsers = querySnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                .filter(users => users.email !== currentuser.email );
                setUsers(newUsers);   
            })
           return () =>unsubscribe();
                      
               
        }
 
        getData();
    }, []);

    
    return (
        <View style={styles.container}>
        {/* <View style={styles.Headerbar}>
          <Text style={styles.Header}>Chats</Text>
        </View> */}
        <FlatList
            data={users}
            renderItem={({ item }) => <ChatListItem users={item} />}
            keyExtractor={(item, index) => index.toString()}
        />
        </View>

    
    )
    
};
const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: "#f0f0f0",
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
            _backgroundColor: '#f0f0f0',
            get backgroundColor() {
                return this._backgroundColor;
            },
            set backgroundColor(value) {
                this._backgroundColor = value;
            },
            borderBottomWidth:StyleSheet.hairlineWidth

        },
    
    })
export default Homescreen;