import AsyncStorage from '@react-native-async-storage/async-storage';
import init from 'react_native_mqtt';
import { Platform } from 'react-native';
import { MQTT } from '../constants';

let status = undefined
const onConnectionLost = (responseObject) =>{
  if (responseObject.errorCode !== 0) {
    status = 'error'
    toast.show(`onConnectionLost: ${responseObject.errorMessage}`, {type: 'danger', duration:null});
  }
}

const onSuccess = () =>{
  console.log('connected !!!')
  toast.show('connected !!!', {type:'success', duration:null})
  status = 'success'
}

const onFailure = (error) =>{
  toast.show(`status: failed\nmessage: ${error}`, {type:'danger', duration:null})
  console.log('error: ', error)
  status = 'error'
}

export async function createClient(dispatch){
  init({
    size: 10000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync : {}
  });
  
  const options = {
    //use for dev
    host: Platform.OS === 'web' ? 'localhost':'192.168.0.34',
    port: 8083,
    path: '/chat_'+parseInt(Math.random()*100000),
    id: 'id_' + parseInt(Math.random()*100000)
  };
  const client = new Paho.MQTT.Client(options.host, options.port, options.path)
  dispatch({
    type:MQTT.CREATE_CLIENT,
    payload: {
      client: client,
      id: options.id
    }
  })

  return{
    client: client,
    id: options.id
  }
}

export function connect(client, messageCB, dispatch){

  client.onConnectionLost = onConnectionLost
  client.onMessageArrived = messageCB 
  client.onConnected = () =>{
    dispatch({
      type:MQTT.STATUS,
      payload: 'success'
    })
  }

  client.connect({
    onSuccess: onSuccess,
    useSSL: false,
    timeout: 3,
    onFailure: onFailure
  })
  

  dispatch({
    type:MQTT.STATUS,
    payload: status
  })

  return client
}

export function sendMessage(client, topic, message, id){
  console.log('message: ', message)
  var message = new Paho.MQTT.Message(message);
  message.destinationName = topic;
  client.send(message);
}