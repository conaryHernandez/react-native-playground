import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, AsyncStorage } from 'react-native';

import * as actions from '../store/actions';

const AuthScreen = ({ navigation }) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const onAuthComplete = (token) => {
    if (token) {
      navigation.navigate('Map');
    }
  };

  useEffect(() => {
    dispatch(actions.facebookLogin());
    onAuthComplete(token);
  }, [dispatch, actions, onAuthComplete, token]);

  return (
    <View>
      <Text>The Auth Screen</Text>
    </View>
  );
};

export default AuthScreen;
