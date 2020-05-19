import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';

const ReviewScreen = () => {
  return (
    <View>
      <Text>The ReviewScreen</Text>
    </View>
  );
};

ReviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Review Jobs',
    headerRight: () => (
      <Button
        title="Settings"
        onPress={() => navData.navigation.navigate('Settings')}
      />
    ),
  };
};

export default ReviewScreen;
