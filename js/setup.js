
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import App from './App';
import LoadingScreen from './components/Shared/LoadingScreen';
import configureStore from './configureStore';

var moment = require('moment'); //load moment module to set local language
require('moment/locale/vi'); //for import moment local language file during the application build
moment.locale('vi');//set moment local language to zh-cn

function setup():React.Component {
  class Root extends Component {

    constructor() {
      super();
      this.state = {
        isLoading: true,
        store: configureStore(() => this.setState({ isLoading: false })),
      };
    }

    render() {
      return (
        this.state.isLoading
        ?
        <LoadingScreen/>
        :
        <Provider store={this.state.store}>
          <App />
        </Provider>
      );
    }
  }

  return Root;
}

export default setup;
