import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

export default (reducers) => {
  const persistedReducer = persistReducer(
    {
      key: 'fastFeet',
      storage: AsyncStorage,
      whitelist: ['user', 'auth'],
    },
    reducers
  );

  return persistedReducer;
};
