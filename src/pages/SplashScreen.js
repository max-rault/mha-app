import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Surface } from 'react-native-paper';

const duration = 2500;
const easing = Easing.bezier(0.25, -0.5, 0.25, 1)

const SplashScreen = ({navigation}) => { 

  const animation = useSharedValue(0)

  React.useEffect(() => {
    if(navigation){
      AsyncStorage.getItem('user_id').then((value) =>
        navigation.replace(
          !value || value == null || value == 'undefined' ? 'Auth' : 'Main'
        ),
      );
    }
   }, []);

  useEffect(() => {
    animation.value = withRepeat(withTiming(1, { duration: duration, easing: easing }), -1);
  }, []);

  const animationStyle = useAnimatedStyle(() =>(
    {transform: [{ rotate: `${animation.value * 360}deg` }]}
  ))

  return (
    <LinearGradient
      colors={['#6750a4', '#f04623', '#f8bc0c']}
      style={{flex: 1}}
      start={{x:0, y:0.5}}
    >
      <View style={styles.container}>
        <Surface style={styles.surface} elevation={5}>
          <Animated.Image 
            style={[styles.image, animationStyle]}
            source={require('../../assets/MHA_logo_nobg.png')}
          />
        </Surface>
      </View>
    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width: 150,
    height: 150,
    resizeMode: 'contain', 
  
    // marginHorizontal: 'auto',
  },
  surface:{
    width: 150,
    height: 150,
    backgroundColor:'#50ade6a1',
    borderRadius: 150/2
  }
});