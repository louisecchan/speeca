import AsyncStorage from '@react-native-community/async-storage';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducer from './Reducers/rootReducer';

const persistConfig = {
    key: 'root',
    storage:AsyncStorage,
    timeout:null,

  }
  
const persistedReducer = persistReducer(persistConfig, rootReducer)

    export const store= createStore(persistedReducer,{},composeWithDevTools());
    export const persistor = persistStore(store);

