import React, { useState, useEffect } from 'react';
import { View, Text, Alert, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';

import _ from 'lodash';

import Slides from '../components/Slides';

const SLIDE_DATA = [
  {
    text: 'Welcome to Job App',
    color: '#03A9F4',
  },
  { text: 'Use this to get a job', color: '#009688' },
  { text: 'Set your location, then swipe away', color: '#03A9F4' },
];

const WelcomeScreen = ({ navigation }) => {
  const [token, setToken] = useState('');

  onSlideComplete = () => {
    navigation.navigate('Auth');
  };

  onGetToken = async () => {
    const token = await AsyncStorage.getItem('fb_token');

    if (token) {
      navigation.navigate('Map');
      setToken(token);
    } else {
      setToken('');
    }
  };

  useEffect(() => {
    onGetToken();
  }, [onGetToken]);

  if (_.isEmpty(token)) {
    return <AppLoading />;
  }

  return (
    <View>
      <Slides data={SLIDE_DATA} onComplete={onSlideComplete} />
    </View>
  );
};

export default WelcomeScreen;
