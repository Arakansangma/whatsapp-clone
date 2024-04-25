import {View, Text, StyleSheet } from 'react-native'
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { useRoute } from '@react-navigation/native';




const Message = ({message}) => {

  const route = useRoute();

    const isMyMessage =() => {
        return route.params.email !== message.from;
    }

    return (
        <View
            style ={[
                styles.container,
            {
                backgroundColor: isMyMessage()? "#DCF8C5" : "white",
                alignSelf: isMyMessage() ? "flex-end" : "flex-start",
            },
        ]}
        >
        <Text style={styles.message}>{message.message}</Text>
        <Text style={styles.time}>{dayjs(message.createdAt).fromNow(true)}</Text>
        </View>
        );

};
const styles = StyleSheet.create({
    container: {
      margin: 5,
      padding: 10,
      borderRadius: 10,
      maxWidth: "80%",
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
  
      elevation: 1,
    },
    message: {
      color: "black",
      fontSize: 16,
    },
    time: {
      alignSelf: "flex-end",
      color: "grey",
      fontSize: 12,
    },
  });

export default Message;