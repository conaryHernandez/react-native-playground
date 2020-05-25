import React from 'react';
import { View, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import { clearLikedJobs } from '../store/actions';

const SettingsScreen = () => {
  const dispatch = useDispatch();

  return (
    <View>
      <Button
        title="Reset Liked Jobs"
        large
        icon={{ name: 'delete-forever' }}
        buttonStyle={{ backgroundColor: '#F44336' }}
        onPress={dispatch(clearLikedJobs)}
      />
    </View>
  );
};

export default SettingsScreen;
