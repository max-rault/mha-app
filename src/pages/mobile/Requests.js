import * as React from 'react';
import { View } from 'react-native';
import FlatRequests from '../../components/mobile/FlatRequests';

export default function MobileRequests(props){
  const { navigation } = props;
  
  return (
    <View style={{flex: 1}}>
      <FlatRequests navigation={navigation} />
    </View>
  );
}