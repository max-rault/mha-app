import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import FlatMember from '../../components/mobile/FlatMembers';

export default function MobileAccounts(props){
  const { navigation } = props;
  
  return (
    <View style={{flex: 1}}>
      <FAB 
        style={styles.fab} 
        icon='account-plus' 
        onPress={() => {
          navigation.navigate('AccountModal',{title: 'nouveau compte'})
        }}
      />
      <FlatMember navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 2,
    marginRight: 24
  },
})