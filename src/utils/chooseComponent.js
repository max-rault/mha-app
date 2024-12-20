import { Platform, Dimensions } from "react-native";
import { getDimensionModeOfScreen } from "../Styles/responsive/Helpers";
import { lazy } from "react";

const mobileComponent = {
  Accounts: lazy(()=>import('../pages/mobile/Accounts')),
  Requests: lazy(()=>import('../pages/mobile/Requests')),
  Dashboard: lazy(()=>import('../pages/mobile/Dashboard'))
}

const component = {
  Accounts: lazy(()=>import('../pages/Accounts')),
  Requests: lazy(()=>import('../pages/Requests')),
  Dashboard: lazy(()=>import('../pages/Dashboard'))

}

export function chooseComponentsType(){
  const window = Dimensions.get('window')
  const screenMode = getDimensionModeOfScreen(window)

  if(Platform.OS === 'android' | Platform.OS === 'ios' && screenMode === 'isMobileMode'){

    return mobileComponent

  } else{
    return component
  }
}