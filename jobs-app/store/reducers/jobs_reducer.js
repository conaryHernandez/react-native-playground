import _ from 'lodash';
import { FETCH_JOBS, LIKE_JOB } from '../actions/types';

const initialState = {
  results: [],
  likedJobs: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS:
      return {
        ...state,
        results: action.payload,
      };
    case LIKE_JOB:
      return {
        ...state,
        likedJobs: _.uniqBy([action.payload, ...state.likedJobs], 'jobkey'),
      };
    default:
      return state;
  }
};

export default reducer;
