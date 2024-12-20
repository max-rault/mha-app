import React, { lazy } from 'react';
import { LogBox, Platform, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/pages/SplashScreen';
import Login from './src/pages/auth/Login';
import NewPassword from './src/pages/auth/NewPassword';
const  Main = lazy(()=> import('./src/Main'));
import { ToastProvider } from 'react-native-toast-notifications';
import Toast from "react-native-toast-notifications";
import { Provider } from 'react-redux';
import configureStore from './src/store/reducers/configureStore';
import { fr, registerTranslation } from 'react-native-paper-dates'
import { MenuProvider } from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import '@expo/metro-runtime';

//theme
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  PaperProvider
} from 'react-native-paper';
import merge from 'deepmerge';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);
const Stack = createStackNavigator();

registerTranslation('fr-FR', fr)

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
const store = configureStore()
const title = (text) => Platform.select({ web: `MHA | ${text}`, default: text });


function Auth(props){

  return(
    <Stack.Navigator>
      <Stack.Screen
        name='Login'
        component={Login}
        options={{
          headerShown: false,
          title: title('Login')
        }}
      />
       <Stack.Screen
        name='NewPass'
        component={NewPassword}
        options={{
          headerShown: false,
          title: title('Nouveau mot de passe')
        }}
      />
    </Stack.Navigator>
  )
}

export default function App() {
  const [usedTheme, setUsedTheme] = React.useState(CombinedDefaultTheme)
  const [initialRoute, setInitialRoute] = React.useState('Auth')
  const [ sbTheme, setSbTheme ] = React.useState('dark')

  React.useEffect(()=>{
    AsyncStorage.getItem('theme')
    .then((value)=>{
      if(value === 'dark'){
        setUsedTheme(CombinedDarkTheme)
        setSbTheme('light')
      }
    })
  },[])

  const switchTheme = (theme) =>{

    if(theme === 'dark'){
      setUsedTheme(CombinedDarkTheme)
      setSbTheme('light')
      AsyncStorage.setItem('theme','dark')
    } else {
      setUsedTheme(CombinedDefaultTheme)
      setSbTheme('dark')
      AsyncStorage.setItem('theme','light')
    }
  }

   return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <PaperProvider
          settings={{
            rippleEffectEnabled: false
          }}
          theme={usedTheme}
        >
          <StatusBar style={sbTheme}/>
          <ToastProvider
            swipeEnabled={true}
          >
              <NavigationContainer theme={usedTheme}>
                <Stack.Navigator initialRouteName='SplashScreen'>
                  <Stack.Screen
                    name='SplashScreen'
                    component={SplashScreen}
                    options={{
                      headerShown: false,
                      title: title('Chargement')
                    }}
                  />
                  <Stack.Screen
                    name='Auth'
                    component={Auth}
                    options={{
                      headerShown: false,
                      title: title('Authentification')
                    }}
                  />
                  <Stack.Screen
                    name='Main'
                    options={{
                      headerShown: false,
                      title: title('Application')
                    }}
                  >
                    {(props) =>(
                      <MenuProvider>
                        <Main setUsedTheme={switchTheme} theme={usedTheme} {...props}/>
                      </MenuProvider>
                    )}
                  </Stack.Screen>
                </Stack.Navigator>
              </NavigationContainer>
              <Toast 
                ref={(ref) => global['toast'] = ref}
                onPress={(id)=> toast.hide(id)}
              />
          </ToastProvider>
        </PaperProvider>
      </Provider>
    </SafeAreaView>
  );
}