import { AsyncStorage, Alert } from 'react-native';
import * as Facebook from 'expo-facebook';
import { FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_FAIL } from './types';
import keys from '../../keys';

const doFacebookLogin = async (dispatch) => {
  await Facebook.initializeAsync(keys.appId);

  let { type, token } = await Facebook.logInWithReadPermissionsAsync(
    keys.appId,
    {
      permissions: ['public_profile'],
    }
  );

  if (type === 'success') {
    // Get the user's name using Facebook's Graph API
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}`
    );
    Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
  } else {
    return dispatch({
      type: FACEBOOK_LOGIN_FAIL,
    });
  }

  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS });
};

export const facebookLogin = () => {
  return async (dispatch) => {
    let token = await AsyncStorage.getItem('fb_token');

    if (token) {
      dispatch({
        type: FACEBOOK_LOGIN_SUCCESS,
        payload: token,
      });
    } else {
      doFacebookLogin(dispatch);
    }
  };
};
