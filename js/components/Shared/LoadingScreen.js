
import React, { Component } from 'react';
import { View, Image, StatusBar } from 'react-native';

import { BRAND_COLOR } from '../../constants';

const logo = require('../../../images/logo_white.png');

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BRAND_COLOR,
  },
  logo: {
    width: 119,
    height: 55,
  },
};

export default class LoadingScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={logo} />
      </View>
    );
  }
}
