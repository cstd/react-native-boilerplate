
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, TouchableOpacity, Image, View, Text, Platform } from 'react-native';

import DeviceInfo from 'react-native-device-info';
import Communications from 'react-native-communications';

import AppNavigator from './navigators/AppNavigator';

import { checkUpdate } from './actions/user';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});

class App extends Component {
  componentDidMount() {
    this.props.checkUpdate();
  }

  render() {
    const { updateStatus } = this.props;

    if (updateStatus.required && updateStatus.build > DeviceInfo.getBuildNumber()) {
      return (
        <View style={styles.container}>
          <Text style={{ textAlign: 'center', marginBottom: 15, fontSize: 19 }}>
            {`Phiên bản hiện tại ${DeviceInfo.getVersion()} (${DeviceInfo.getBuildNumber()})`}
          </Text>
          <Text style={{ textAlign: 'center', marginBottom: 15, fontSize: 19 }}>
            {`Phiên bản cập nhật ${updateStatus.version} (${updateStatus.build})`}
          </Text>
          <TouchableOpacity onPress={() => Communications.web(updateStatus.link)}>
            <Text style={{
 textAlign: 'center', marginBottom: 15, fontSize: 19, fontWeight: 'bold',
}}
            >
              {`Ấn vào đây để tải phiên bản cập nhật qua ${Platform.OS === 'android' ? 'Play Store' : 'App Store'}`}
            </Text>
            {Platform.OS === 'android' ? (
              <Image source={require('../images/play_store.png')} style={{ width: 80, height: 80, alignSelf: 'center' }} />
            ) : (
              <Image source={require('../images/app_store.png')} style={{ width: 80, height: 80, alignSelf: 'center' }} />
            )}
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
