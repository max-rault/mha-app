import * as React from "react";
import { StyleSheet, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { Appbar } from 'react-native-paper';
import { sendMessage } from "../../store/actions/Mqtt";
import { useSelector } from "react-redux";
import * as locale from 'dayjs/locale/fr'


export default function Chat(props){

  const { response, receiverID, navigation } = props
  const [ messages, setMessages ] = React.useState([])
  const { params } = props.route
  const { user } = useSelector(state => state.staff);
  const { client, id } = useSelector(state => state.mqtt);
  const [ chatTopic, setChatTopic ] = React.useState(`/chat/${receiverID}`)

  React.useEffect(()=>{
    console.log('response: ', response)
    if(response){
      setMessages([response, ...messages])
    }
  },[response])

  const onSend = React.useCallback((messages = []) =>{
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    )
    messages.forEach(message => {
      console.log('message (foreach): ', message)
      sendMessage(client, chatTopic, JSON.stringify(message), id)
      // messages.unshift(response ,message)
    }); 
  },[]) 

  React.useEffect(()=>{
    client.subscribe(`/chat/${user.id}`,{qos: 0})
  },[])
  return(
    <View style={styles.container}>
      <Appbar.Header>
       <Appbar.BackAction onPress={()=>{
          navigation.goBack()
        }}/>
      <Appbar.Content title={params?.title}/>
     </Appbar.Header>
      <GiftedChat 
        locale={locale}
        dateFormat="dddd DD MMMM YYYY"
        timeFormat="HH:mm"
        user={{
          _id: user.id,
          name: user.name,
          avatar: user.avatar
        }}
        messages={messages}
        showAvatarForEveryMessage={true}
        showUserAvatar={true}
        renderUsernameOnMessage={true}
        onSend={onSend}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});