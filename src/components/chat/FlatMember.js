import React from 'react';
import { ScrollView, FlatList } from 'react-native';
import { List, Avatar, Badge } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default function FlatMember(props){

  const { staffMembers } = useSelector(state => state.staff);
  const renderItem = ({ item }) => (
    <List.Item
      key={item.id}
      title={item.name}
      description="connecté"
      left={props => <Avatar.Image size={48} {...props} source={{
        uri: item.avatar
      }} />}
      right={props => <Badge size={12} theme={{colors: {error: '#2e7d32'}}} {...props}/>}
      onPress={()=> {

        props.closeDrawer()
        props.navigation?.navigate('chat',{title:`chat avec ${item.name}`})
      }}
    />
  );

  return (
    <FlatList
      data={staffMembers}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      extraData={props}
    />
  );
};