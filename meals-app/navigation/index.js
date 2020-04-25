import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import { TabsNavigator } from './TabsNavigator';
import { FiltersNavigator } from './FiltersNavigator';

import Colors from '../constants/Colors';

const MainNavigator = createDrawerNavigator(
  {
    MealsFav: {
      screen: TabsNavigator,
      navigationOptions: {
        drawerLabel: 'Meals',
      },
    },
    Filters: FiltersNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.accentColor,
      labelStyle: {
        fontFamily: 'open-sans-bold',
      },
    },
  }
);

export default createAppContainer(MainNavigator);
