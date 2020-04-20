import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMeal from '../screens/CategoryMealScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';

const MealsNavigator = createStackNavigator({
  Categories: CategoriesScreen,
  CategoriesMeals: CategoryMeal,
  MealDetail: MealDetailsScreen,
});

export default createAppContainer(MealsNavigator);
