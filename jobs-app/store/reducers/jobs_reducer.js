import { FETCH_JOBS } from '../actions/types';

const initialState = {
  results: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS:
      return {
        ...state,
        results: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
