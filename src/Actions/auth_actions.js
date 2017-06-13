import { Facebook } from 'expo';
import { AsyncStorage } from 'react-native';
import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL
} from './types';

export const facebookLogin = () => async (dispatch) => { // notice where the async key word is
  let token = await AsyncStorage.getItem('fb_token');

  if(token) {
    // Send token to reducer
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });
  } else {
    // Start up FB Login Process
    doFacebookLogin(dispatch);
  }
};

// Helper Function to login with Facebook
const doFacebookLogin = async (dispatch) => {
  // Getting permission to read part of their profile
  // This line will pop a modal on the screen, and handle logging in
  // and return a token if user logs in correctly
  // result({ type, token }) containts a type and token property
  // 'type' reflects the status of the login in
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('1920613591520077', {
    permissions: ['public_profile']
  }); // passing in App ID

  // if login fails
  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL });
  }

  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token });

};
