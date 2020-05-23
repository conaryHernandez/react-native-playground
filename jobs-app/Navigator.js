import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
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

const MainTabNavigator = createBottomTabNavigator({
  Map: MapScreen,
  Deck: DeckScreen,
  Review: {
    screen: ReviewNavigator,
    navigationOptions: {
      tabBarLabel: 'Review Jobs',
    },
  },
});

const MainNavigator = createBottomTabNavigator({
  Map: MapScreen,
  Auth: AuthScreen,
  Main: {
    screen: MainTabNavigator,
  },
});

export default createAppContainer(MainNavigator);
