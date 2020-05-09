import React, { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import * as productsActions from '../../store/actions/products';
import * as cartActions from '../../store/actions/cart';
import Colors from '../../constants/Colors';

const ProductsOverviewScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setIsRefreshing] = useState(false);

  const [error, setError] = useState('');
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [setIsLoading, loadProducts]);

  const selectItemHandler = (id, title) => {
    navigation.navigate('ProductDetails', {
      productId: id,
      productTitle: title,
    });
  };

  const loadProducts = useCallback(async () => {
    setError('');
    setIsRefreshing(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (error) {
      setError(error.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = navigation.addListener('willFocus', loadProducts);

    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error ocurred</Text>
        <Button title="Please try again" onPress={loadProducts} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No Products found. Try adding some!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={refreshing}
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() =>
            selectItemHandler(itemData.item.id, itemData.item.title)
          }
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() =>
              selectItemHandler(itemData.item.id, itemData.item.title)
            }
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => dispatch(cartActions.addToCart(itemData.item))}
          />
        </ProductItem>
      )}
    />
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: 'All Products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS == 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS == 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default ProductsOverviewScreen;
