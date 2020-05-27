import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import reducers from './reducers';

export default () => {
  const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

  let persistor = persistStore(store, {
    store: AsyncStorage,
    whitelist: ['likedJobs'],
  });
  return { store, persistor };
};

/*const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
*/
