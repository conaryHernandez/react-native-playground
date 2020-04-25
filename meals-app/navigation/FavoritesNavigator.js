import { createStackNavigator } from 'react-navigation-stack';

import FavoritesScreen from '../screens/FavoritesScreen';
import MealDetailScreen from '../screens/MealDetailsScreen';
import { defaultStackNavOptions } from './defaultNavOptions';

const FavoritesNavigator = createStackNavigator(
  {
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen,
  },
  { defaultNavigationOptions: defaultStackNavOptions }
);

export default FavoritesNavigator;
