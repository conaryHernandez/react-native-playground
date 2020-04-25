import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';

import MealList from '../components/MealList';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

const FavoritesScreen = ({ navigation }) => {
  const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);

  if (favoriteMeals.length === 0 || !favoriteMeals) {
    return (
      <View style={styles.content}>
        <DefaultText>No favorite meals found, Start adding some!</DefaultText>
      </View>
    );
  }

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

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FavoritesScreen;
