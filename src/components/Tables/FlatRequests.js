import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import {  DataTable, Chip, Text  } from 'react-native-paper';
import { useSelector } from 'react-redux';
import NoData from "../NoData";

export default function FlatRequests(props){

  const { requests } = useSelector(state => state.requests);
  const renderItem = ({ item }) => (
    <DataTable.Row 
      key={item.id}
      onPress={()=> props.navigation.navigate('RequestModal', {
        title: `demande de ${item.Staff?.name}`,
        member: item.Staff,
        request: item
      })}
    
    >
      <DataTable.Cell>{item?.Staff.name}</DataTable.Cell>
      <DataTable.Cell>{item?.title}</DataTable.Cell>
      <DataTable.Cell style={{justifyContent: 'space-around'}} >
        <Chip
          compact
          style={[styles.status, {backgroundColor: item.status.color}]}
          textStyle={{paddingHorizontal: 0, marginHorizontal:0, flex: 1, textAlign:'center'}}
        >
          {item.status.label}
        </Chip>
      </DataTable.Cell>
      <DataTable.Cell>
        <Text>{`du ${item.startPeriod} au ${item.endPeriod}`}</Text>
      </DataTable.Cell>
    </DataTable.Row>
  );

  return (
    <FlatList
      data={requests}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={NoData}
      extraData={props}
    />
  );
};

const styles = StyleSheet.create({
  status:{
    width:'55%',
    // padding:'5px 0 5px 0',
    borderRadius:10,
    justifyContent:'center'
  }
});