import 'react-native-gesture-handler';

import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import './config/ReactotronConfig';

import { StatusBar } from 'react-native';
import { store, persistor } from './store';
import App from './App';

// import { Container } from './styles';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
}
