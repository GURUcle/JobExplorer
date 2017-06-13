import {
  FETCH_JOBS,
} from '../Actions/types';

const INITIAL_STATE = {
  results: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_JOBS:
      return action.payload;
    default:
      return state;
  }
}
