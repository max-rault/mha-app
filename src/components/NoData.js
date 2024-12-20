import * as React from 'react';
import { Text, Surface} from 'react-native-paper';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get("window").width;

export default function NoData(){
  console.log('im in nodata component')
  return(
   <View style={styles.container}>
      <Surface style={styles.ImageContainer} elevation={5}>
        <Image source={require('../../assets/no_data.png')} style={styles.image} resizeMode='contain'/>
      </Surface>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  ImageContainer:{
    borderRadius: 15,
    marginVertical: 20,
    width: Dimensions.get('window').width * 0.35,
    height: Dimensions.get('window').height * 0.65

  },
  image: {
    width:Dimensions.get("window").width*0.35,
    height:Dimensions.get("window").height*0.75,
  },
});