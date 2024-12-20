import React from 'react';
import { ScrollView, FlatList } from 'react-native';
import { List, Avatar, Badge } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default function FlatRequests(props){

  const { requests } = useSelector(state => state.requests);
  const renderItem = ({ item }) => (
    <List.Item
      key={item.id}
      title={`demande de ${item.Staff?.name}`}
      description={`${item.title}  (${item.status?.label})`}
      left={props => <Avatar.Image size={48} {...props} source={{
        uri: item.Staff?.avatar
      }} />}
      onPress={()=> {

        props.navigation?.navigate('RequestModal', {
          title: `demande de ${item.Staff?.name}`,
          member: item.Staff,
          request: item
        })
      }}
    />
  );

  return (
    <FlatList
      data={requests}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      extraData={props}
    />
  );
};