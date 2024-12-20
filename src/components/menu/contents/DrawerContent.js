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
// import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DrawerContent(props) {
  const {navigation} = props

  return (
    <DrawerContentScrollView {...props}>
      <View
        style={
          styles.drawerContent
        }
      >
        <Drawer.Item
          icon="view-dashboard"
          label="Tableau de bord"
          onPress={() => navigation.navigate('dashboard')}
        />
        <Drawer.Item
          icon="table-account"
          label="Comptes"
          onPress={() => navigation.navigate('Accounts')}
        />
         <Drawer.Item
          icon="clipboard-list"
          label="Demandes"
          onPress={() => navigation.navigate('requests')}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
});