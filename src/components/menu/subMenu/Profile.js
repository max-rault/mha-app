import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Avatar, Button, Icon } from 'react-native-paper';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers
 } from "react-native-popup-menu";
 import { useSelector } from 'react-redux';

export default function Profile(props){
  const {user, navigation, theme, setUsedTheme} = props;
  const { client } = useSelector(state => state.mqtt);

  return(
    <Menu 
      renderer={renderers.Popover}
      rendererProps={{ anchorStyle: {backgroundColor: theme.colors.surfaceVariant} }}
    >
      <MenuTrigger>
        <Avatar.Image
          source={{
            uri: user.avatar
          }}
          size={32}
        />
      </MenuTrigger>
      <MenuOptions
        placement='auto'
        preferredPlacement='bottom'
        customStyles={{
          optionsContainer: {
            borderRadius: 10,
            backgroundColor: theme.colors.surfaceVariant,
            padding: 5,
          },
          optionsWrapper: {
            backgroundColor: theme.colors.surfaceVariant,
          },
          optionWrapper: {
            backgroundColor: theme.colors.surfaceVariant,
            margin: 5,
          },
          
        }}
        
      >
        <Button
          style={{alignSelf: "flex-start"}}
          mode='text'
          icon={(props)=>(
            <Icon
              {...props}
              source={theme.dark ? "brightness-2":"brightness-7"}
              color={theme.dark ? "#fff":"#ff9b00"}
            />
          )} 
          compact
          onPress={() =>{
            if(theme.dark === true){
              setUsedTheme('light')
            } else{
              setUsedTheme('dark')
            }
          }}
        >
          <Text>
            theme: {theme.dark ? 'Nuit':'Jour'}
          </Text>
        </Button>
        <Button 
          icon='logout'
          mode='text'
          compact
          onPress={async ()=>{
            try {
              await client.disconnect()
              await AsyncStorage.clear()
              navigation.navigate('Auth')
            } catch (error) {
              console.log(error)
            }
          }}
        >
          <Text>Se déconnecter</Text>
        </Button>
      </MenuOptions>
    </Menu>
  );
  
}

const styles = StyleSheet.create({
  anchorStyle: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#7F8487",
  },
 });