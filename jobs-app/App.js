import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { Provider } from 'react-redux';

import MainNavigator from './Navigator';
import store from './store';
import registerForNotifications from './services/push_notifications';
import { Notifications } from 'expo';

export default function App() {
  useEffect(() => {
    registerForNotifications();
    Notifications.addListener((notification) => {
      const {
        data: { text },
        origin,
      } = notification;

      if (origin === 'received' && text) {
        Alert.alert('New Push Notification', text, [{ text: 'Ok' }]);
      }
    });
  }, [registerForNotifications]);

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
