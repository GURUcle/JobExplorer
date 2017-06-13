import _ from 'lodash';
import { REHYDRATE } from 'redux-persist/constants'; // type that fetchs data from async storage
import {
  LIKE_JOB,
  CLEAR_LIKED_JOBS
} from '../Actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case REHYDRATE:
      return action.payload.likedJobs || []; // "||" is to catch the first time the app runs
    case CLEAR_LIKED_JOBS:
      return [];
    case LIKE_JOB:
      return _.uniqBy([
        action.payload, ...state
      ], 'jobkey');
    default:
      return state;
  }
}
