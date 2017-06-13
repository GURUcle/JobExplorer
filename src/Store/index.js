import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import reducers from '../Reducers';

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(thunk),
    autoRehydrate()
  )
);
// Whenever redux state changes, place that state into Async storage

persistStore(store, { storage: AsyncStorage, whitelist: ['likedJobs'] });
// add .purge() at end of statement to clear saved state

export default store;
