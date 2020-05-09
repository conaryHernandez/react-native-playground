import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import ProductsOverviewScreen, {
  screenOptions as productsOverviewScreenOptions,
} from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen, {
  screenOptions as productDetailScreenOptions,
} from '../screens/shop/ProductDetailsScreen';
import CartScreen, {
  screenOptions as cartScreenOptions,
} from '../screens/shop/CartScreen';
import OrdersScreen, {
  screenOptions as ordersScreenOptions,
} from '../screens/shop/OrdersScreen';
import UserProductsScreen, {
  screenOptions as userProductsScreenOptions,
} from '../screens/user/UserProducts';
import EditProductsScreen, {
  screenOptions as editProductsScreenOptions,
} from '../screens/user/EditProducts';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const ProductsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={productsOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

/*
const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetails: ProductDetailsScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions,
  }
);*/

const OrdersStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

/*
const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions,
  }
); */

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator>
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="EditProduct"
        component={EditProductsScreen}
        options={editProductsScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

/*
const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductsScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions,
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});


export default createAppContainer(MainNavigator);
*/
