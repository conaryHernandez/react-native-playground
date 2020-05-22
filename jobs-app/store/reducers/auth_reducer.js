import { FACEBOOK_LOGIN_FAIL, FACEBOOK_LOGIN_SUCCESS } from '../actions/types';

const initalState = {
  token: '',
};

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
      };
    case FACEBOOK_LOGIN_FAIL:
      return {
        ...state,
        token: '',
      };
    default:
      return state;
  }
};

export default reducer;
