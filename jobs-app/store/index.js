import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

export default store = createStore(
  reducers,
  {},
  compose(applyMiddleware(thunk))
);
