import React from 'react';
import { useSelector } from 'react-redux';

import MealList from '../components/MealList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';

const FavoritesScreen = ({ navigation }) => {
  const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);

  return <MealList listData={favoriteMeals} navigation={navigation} />;
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
