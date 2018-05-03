
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, Image, View, Text } from 'react-native';

import DeviceInfo from 'react-native-device-info';
import Communications from 'react-native-communications';

import AppNavigator from "./navigators/AppNavigator";

import { checkUpdate } from './actions/user';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
  },
});

class App extends Component {

  componentDidMount() {
    this.props.checkUpdate();
  }

  render() {
    const { updateStatus } = this.props;

    if (updateStatus.status) {
      return (
        <View style={{ flex: 1, alignSelf: 'stretch', justifyContent: 'center', padding: 20 }}>
          <Text style={{ textAlign: 'center', marginBottom: 15, fontSize: 19 }}>
            {`Phiên bản hiện tại ${DeviceInfo.getVersion()} (${DeviceInfo.getBuildNumber()})`}
          </Text>
          <Text style={{ textAlign: 'center', marginBottom: 15, fontSize: 19 }}>
            {`Phiên bản cập nhật ${updateStatus.version} (${updateStatus.build})`}
          </Text>
          <TouchableOpacity onPress={() => Communications.web(updateStatus.source)}>
            <Text style={{ textAlign: 'center', marginBottom: 15, fontSize: 19, fontWeight: 'bold' }}>
              {`Ấn vào đây để tải phiên bản cập nhật qua Play Store`}
            </Text>
            <Image source={require('../images/play_store.png')} style={{width: 80, height: 80, alignSelf: 'center'}}/>
          </TouchableOpacity>
        </View>
      );
    }

    return <AppNavigator />;
  }
}

function mapStateToProps(state) {
  return {
    updateStatus: state.user.updateStatus,
  };
}

function bindAction(dispatch) {
  return {
    checkUpdate: () => dispatch(checkUpdate()),
  };
}

export default connect(mapStateToProps, bindAction)(App);
