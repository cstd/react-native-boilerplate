
import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';

import { BRAND_COLOR } from '../../constants';

const styles = {
  btn: {
    paddingHorizontal: 25,
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
};

export default class FlatButton extends Component {
  onPress() {
    this.props.onPress();
  }

  render() {
    return (
      <TouchableOpacity
        style={{
          ...styles.btn,
          backgroundColor: this.props.backgroundColor || BRAND_COLOR,
          ...(this.props.disabled ? { backgroundColor: this.props.disabledBackgroundColor || 'rgba(0,0,0,0.1)' } : {}),
        }}
        onPress={() => this.onPress()}
        disabled={this.props.disabled}
      >
        <Text style={{
          ...styles.btnText,
          ...(this.props.disabled ? { color: this.props.disabledColor || BRAND_COLOR } : { color: this.props.color || BRAND_COLOR }),
        }}
        >{this.props.children}
        </Text>
      </TouchableOpacity>
    );
  }
}
