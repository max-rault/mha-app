import React, { lazy, Suspense } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { chooseComponentsType } from '../../../utils/chooseComponent';
import DrawerContent from '../contents/DrawerContent';
import Header from '../contents/Header';
// const DashBoard = lazy(()=>import('../../../pages/Dashboard'));
// import DashBoard from "../../../pages/Dashboard";
const component = chooseComponentsType()
const Accounts = component.Accounts;
const Requests =  component.Requests;
const DashBoard = component.Dashboard;
// const MobileRequests =  lazy(()=>import('../../../pages/mobile/Requests'));
// const MobileAccounts = lazy(()=>import('../../../pages/mobile/Accounts'));
import SplashScreen from '../../../pages/SplashScreen';

const LeftDrawer = createDrawerNavigator();

export default function LeftDrawerScreens(props){

    const {setUsedTheme, theme, context} = props

    return(
    <LeftDrawer.Navigator
      initialRouteName='dashboard'
      screenOptions={{
        header: (props) => (
          <Header {...props} setUsedTheme={setUsedTheme} theme={theme} context={context}/>
        ),
        drawerPosition: 'left' 
      }}  
      drawerContent={(props) =><DrawerContent theme={theme} {...props}/>}
    >
      <LeftDrawer.Screen 
        name="Accounts"  
        options={{ 
          drawerLabel: 'comptes',
          title:'comptes'
        }}
      >
        {(props) =>(

          <Suspense fallback={<SplashScreen/>}>
            <Accounts theme={theme} {...props}/>
          </Suspense>
        )}
      </LeftDrawer.Screen>
      <LeftDrawer.Screen 
        name="requests"  
        options={{ 
          drawerLabel: 'Demandes',
          title: 'Demandes' 
        }}
      >
        {(props) =>(

          <Suspense fallback={<SplashScreen/>}>
            <Requests theme={theme} {...props}/>
          </Suspense>
        )} 
      </LeftDrawer.Screen>
      <LeftDrawer.Screen 
        name="dashboard" 
        options={{ 
          drawerLabel: 'Tableau de bord',
          title: 'Tableau de bord'
        }}
      >
        {(props) => (
            <Suspense fallback={<SplashScreen/>}>
               <DashBoard theme={theme} {...props}/>
            </Suspense>
           
        )}
      </LeftDrawer.Screen>
    </LeftDrawer.Navigator>
    )
  }