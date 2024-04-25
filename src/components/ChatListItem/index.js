import { Image,StyleSheet,Text,View, Pressable } from "react-native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useNavigation, useRoute } from "@react-navigation/native"
import { doc, setDoc, collection } from "firebase/firestore";
import { FIREBASE_DB } from "../../../firebaseConfig";

dayjs.extend(relativeTime);

const ChatListItem = ({ users }) => {
    const router = useRoute();
    const navigation = useNavigation();
    return (
    <View>
    <Pressable
        key={users.id}
        style ={({pressed}) => [
            pressed && { backgroundColor: 'silver'}
        ] }
        onPress ={()=> navigation.navigate("Chat",{id:users.id, name: users.name,email: users.email})} >
    <View style={styles.messagebox}>
       <Image source={{ uri:"https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg" }} style={styles.image}/>
          <View style={{flex:1}} >
           <View style={styles.user}>
            <Text numberOfLines={1} style={styles.name}>
               {users.name}
            </Text>
             {/* <Text style={styles.time}>
              {dayjs(chat.lastMessage.createdAt).fromNow()}
            </Text> */}
           </View>
           <View style={{flex:4}}>
          {/* <Text numberOfLines={2} style={styles.message}>
            {inbox.lastMessage.text}
          </Text> */}
          </View>
   </View>
   </View>
   </Pressable>
   </View>
   )
};
const styles = StyleSheet.create({
    messagebox : { 
        flex:1,
        padding:10,
        flexDirection:"row",
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:'silver'},
    image :{
        height: 70,
        width:70,
        borderRadius:35
    },
    user :{
        flex:1,
        justifyContent:"space-between",
         flexDirection:"row",
    },
    name:{
        
        fontSize:21,color:'black' ,
        paddingLeft:15
    },
    time :{
        fontSize:12 ,
        color:'grey' ,
        paddingLeft:15,
        marginTop:5,
        marginEnd:5
    },
    message :{
        fontSize:12 ,
        color:'black' ,
        paddingLeft:15,
        marginEnd:5
    },           
    
})

export default ChatListItem;