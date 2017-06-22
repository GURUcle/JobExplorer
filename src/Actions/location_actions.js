import { Location } from 'expo';
import {
  FETCH_USER_LOCATION,
} from './types';

export const fetchUserLocation = () => async (dispatch) => {
  let location = await Location.getCurrentPositionAsync({});
  dispatch({
    type: FETCH_USER_LOCATION,
    payload: location
  });
};
