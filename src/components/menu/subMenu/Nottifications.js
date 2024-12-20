import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Badge, IconButton, Avatar, Text, Button } from 'react-native-paper';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers
 } from "react-native-popup-menu";

export default function Nottifications(props){
  const {user, notifs, theme} = props;

  return(
    <Menu 
      renderer={renderers.Popover}
      rendererProps={{ anchorStyle: {backgroundColor: theme.colors.surfaceVariant} }}
    >
      <MenuTrigger>
        <View>
          <IconButton
            icon='bell-badge'
            size={25}
            style={styles.button}
          />
          <Badge 
            style={styles.badge}
            size={18}
          >
              {notifs.length}
          </Badge>
        </View>
      </MenuTrigger>
      <MenuOptions
        placement='bottom'
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
       {
        notifs.map((notif, index)=>(
          <Card mode='contained' key={index}>
             <Card.Title 
              title={notif.title} 
              subtitle={notif.subTitle} 
              left={(props)=> <Avatar.Image {...props} source={{
                uri: notif.avatar
              }} />} 
            />
             <Card.Content>
                <Text>{notif.date}</Text>
             </Card.Content>
            <Card.Actions>
              <Button>Cancel</Button>
              <Button>Ok</Button>
            </Card.Actions>
          </Card>
        ))
       }
      </MenuOptions>
    </Menu>
  );
  
}

const styles = StyleSheet.create({
  item: {
    margin: 16,
  },
  button: {
    opacity: 0.6,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
 });