import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Icon } from 'react-native-elements';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';

const ReviewNavigator = createStackNavigator({
  Review: ReviewScreen,
  Settings: SettingsScreen,
});

const MainTabNavigator = createBottomTabNavigator(
  {
    Map: {
      screen: MapScreen,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Icon name="my-location" size={30} color={tabInfo.tintColor} />
          );
        },
      },
    },
    Deck: {
      screen: DeckScreen,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Icon name="description" size={30} color={tabInfo.tintColor} />
          );
        },
      },
    },
    Review: {
      screen: ReviewNavigator,
      navigationOptions: {
        tabBarLabel: 'Review Jobs',
        tabBarIcon: (tabInfo) => {
          return <Icon name="favorite" size={30} color={tabInfo.tintColor} />;
        },
      },
    },
  },
  {
    tabBarOptions: {
      labelStyle: { fontSize: 12 },
    },
  }
);

const MainNavigator = createBottomTabNavigator({
  Map: MainTabNavigator,
  Auth: AuthScreen,
  Main: {
    screen: MainTabNavigator,
  },
});

export default createAppContainer(MainNavigator);
