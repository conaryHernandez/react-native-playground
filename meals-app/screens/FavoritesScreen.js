import React from 'react';
import MealList from '../components/MealList';
import { MEALS } from '../data/dummy-data';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';

const FavoritesScreen = ({ navigation }) => {
  const favMeals = MEALS.filter((meal) => meal.id === 'm1' || meal.id === 'm2');

  return <MealList listData={favMeals} navigation={navigation} />;
};

FavoritesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Favorites',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default FavoritesScreen;
