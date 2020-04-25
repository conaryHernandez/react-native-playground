import { createStackNavigator } from 'react-navigation-stack';

import FiltersScreen from '../screens/FiltersScreen';
import { defaultStackNavOptions } from './defaultNavOptions';

const FiltersNavigator = createStackNavigator(
  {
    Filters: FiltersScreen,
  },
  {
    // You can set options here
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

export default FiltersNavigator;
