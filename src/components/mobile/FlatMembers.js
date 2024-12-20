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
      description={`${item.subCategory} - ${item.contractType} h`}
      left={props => <Avatar.Image size={48} {...props} source={{
        uri: item.avatar
      }} />}
      onPress={()=> {

        props.navigation?.navigate('AccountModal', {
          title: `compte de ${item.name}`,
          member: item
        })
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