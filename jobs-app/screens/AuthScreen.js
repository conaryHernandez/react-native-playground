import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text } from 'react-native';

import * as actions from '../store/actions';

const AuthScreen = () => {
  dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.facebookLogin());
  }, [dispatch, actions]);

  return (
    <View>
      <Text>The Auth Screen</Text>
    </View>
  );
};

export default AuthScreen;
