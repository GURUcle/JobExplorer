import { combineReducers } from 'redux';
import auth from './auth_reducer';
import jobs from './jobs_reducer';
import likedJobs from './likes_reducer';
import currentLocation from './location_reducer';

export default combineReducers({
  auth,
  jobs,
  likedJobs,
  currentLocation
});
