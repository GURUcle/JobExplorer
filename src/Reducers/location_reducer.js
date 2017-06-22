import {
  FETCH_USER_LOCATION,
} from '../Actions/types';

export default function(state = {}, action) {
  switch(action.type){
    case FETCH_USER_LOCATION:
      return action.payload;
    default:
      return state;
  }
}
