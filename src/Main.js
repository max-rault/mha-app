import React, {useEffect, lazy, Suspense} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import moment from 'moment';
const  AccountModal =  lazy(()=> import('./pages/modals/AccountModal'));
const  RequestModal = lazy(()=>import('./pages/modals/RequestModal'));
import RightDrawerScreens from './components/menu/containers/RightDrawer';
const Chat = lazy(()=>import('./pages/modals/Chat'));
import { fetchStaff } from './store/actions/Staff';
import { fetchRequests } from './store/actions/Requests';
import { fetchStats } from './store/actions/Stats';
import { sendMessage } from './store/actions/Mqtt';
import { useDispatch, useSelector } from 'react-redux';
import { connect, createClient } from './store/actions/Mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './pages/SplashScreen';

var frLocale = require('moment/locale/fr'); 
moment.updateLocale('fr', frLocale);
// moment.locale('fr');

const RootStack = createStackNavigator();

export default function Main(props){
  const {setUsedTheme, theme} = props

  const { status, client, id } = useSelector(state => state.mqtt);
    const { user } = useSelector(state => state.staff);
    const dispatch = useDispatch()
  
    const [mqttMessage, setMqttMessage] = React.useState(null)
    const [receiverID, setReceiverID] = React.useState(0)
  
    const onMessageArrived = (message)=> {
      setMqttMessage(JSON.parse(message?.payloadString))
    }
  
    useEffect(()=>{
  
      AsyncStorage.getItem('user_id')
      .then((value)=>{
        if(value === '6'){
          setReceiverID(32)
        } else {
          setReceiverID(6)
        }
        
  
      })
  
      createClient(dispatch)
      .then((mqttClient) =>{
        connect(mqttClient.client, onMessageArrived, dispatch)
        console.log(mqttClient.client)
      })
      .catch((err)=>console.log(err))
  
      fetchStaff(dispatch, '/staff/')
      .then(()=>{
        return fetchRequests(dispatch, 'all')
      })
      .then(()=>{
        console.log('stats')
        fetchStats(dispatch)
      })
      .catch((err)=>{
        console.log(err)
      })
      
      
    },[dispatch])
  
    React.useEffect(()=>{
      if(status === 'success'){
        sendMessage(client,`/user/status/${user.id}`, JSON.stringify({id: user.id, name:user.name, avatar:user.avatar, status:'connected'}), id)
        client.subscribe('/user/#')
      }
    },[status])

  return (
   <RootStack.Navigator>
    <RootStack.Group>
      <RootStack.Screen
        name='root'
        options={{ 
          headerShown: false,
          title: 'Principal'
        }} 
      >
        {(props) => <RightDrawerScreens theme={theme} setUsedTheme={setUsedTheme} {...props}/>}
      </RootStack.Screen>
    </RootStack.Group>
    <RootStack.Group screenOptions={{ presentation: 'modal' }}>
      <RootStack.Screen
         name="AccountModal" 
         options={{ 
          drawerLabel: 'Compte',
          title:'Compte', 
          headerShown: false 
        }}
      >
        {(props) => (
          <Suspense fallback={<SplashScreen/>}>
            <AccountModal theme={theme} {...props} />
          </Suspense>
        )}
      </RootStack.Screen>
      <RootStack.Screen
         name="RequestModal" 
         options={{ 
          drawerLabel: 'Demande', 
          title:'Demande',
          headerShown: false 
        }}
      >
        {(props) => (
          <Suspense fallback={<SplashScreen/>}>
            <RequestModal theme={theme} {...props} />
          </Suspense>
        )}
      </RootStack.Screen>
      <RootStack.Screen
         name="chat" 
         options={{ 
          drawerLabel: 'chat', 
          title:'chat',
          headerShown: false 
        }}
      >
        {(props) =>(
          <Suspense fallback={<SplashScreen/>}>
            <Chat theme={theme} response={mqttMessage} receiverID={receiverID} {...props} />
          </Suspense>
        )}
      </RootStack.Screen>
    </RootStack.Group>
   </RootStack.Navigator>
  );
}