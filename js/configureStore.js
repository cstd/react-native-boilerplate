
import devTools from 'remote-redux-devtools';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['nav', 'status']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  const enhancer = compose(
    applyMiddleware(thunk),
    devTools({
      name: 'ReactNativeBoilerplate', realtime: true,
    }),
  );
  
  let store = createStore(persistedReducer, enhancer)
  let persistor = persistStore(store)
  return { store, persistor }
}