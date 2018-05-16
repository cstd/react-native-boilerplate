
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import LoadingScreen from './components/Shared/LoadingScreen';
import configureStore from './configureStore';

function setup():React.Component {
  class Root extends Component {
    render() {
      return (
        <Provider store={configureStore().store}>
          <PersistGate loading={<LoadingScreen />} persistor={configureStore().persistor}>
            <App />
          </PersistGate>
        </Provider>
      );
    }
  }

  return Root;
}

export default setup;
