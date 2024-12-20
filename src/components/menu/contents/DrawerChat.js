import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  Avatar,
  Title,
  IconButton,
  Drawer,
} from 'react-native-paper';
import FlatMember from '../../chat/FlatMember';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DrawerChat(props) {
  const {navigation, closeDrawer} = props

  return (
      <View
        {...props}
        style={
          styles.drawerContent
        }
      >
        <FlatMember navigation={navigation} closeDrawer={closeDrawer}/>
      </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
});