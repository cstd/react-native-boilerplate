
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StatusBar, Image } from 'react-native';

import LoadingScreen from '../Shared/LoadingScreen'
import FlatButton from '../Shared/FlatButton';
import Input from '../Shared/Input';

import { login } from '../../actions/user';
import { resetRoute } from '../../actions/nav';
import { BRAND_COLOR } from '../../constants';

const logo = require('../../../images/logo_white.png');

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: BRAND_COLOR,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 30
  },
  logo: {
    width: 139,
    height: 65,
    alignSelf: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  error: {
    color: '#F07041',
    alignSelf: 'center',
    fontSize: 15,
    marginTop: 30
  }
}

class AuthenticationPage extends Component {
  
  state = {
    username: "",
    password: ""
  }

  componentWillMount() {
    const { resetRoute, token } = this.props;
    console.log("Token:", token);
    if (token) {
      resetRoute('home_page');
    }
  }
  
  onLogin() {
    this.props.login(this.state.username, this.state.password);
  }

  render() {
    const { authStatus } = this.props;
    const { username, password } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo}/>
        </View>
        <View style={styles.body}>
          <Input
            label="TÀI KHOẢN"
            value={this.state.username}
            onChange={username => this.setState({ username })} 
            returnKeyType="next"
            autoCapitalize="none"
            onSubmitEditing={() => { this.refs.password._input.focus(); }}
            blurOnSubmit={false}
          />
          <Input
            label="MẬT KHẨU"
            value={this.state.password}
            onChange={password => this.setState({ password })} 
            secureTextEntry={true}
            returnKeyType="next"
            autoCapitalize="none"
            ref="password"
          />
          <FlatButton
            disabled={(!username || !password) || authStatus.status === "loading"} 
            onPress={() => this.onLogin()}>
            <Text style={{color: 'white'}}>
              {authStatus.status === "loading" ? "ĐANG KẾT NỐI..." : "ĐĂNG NHẬP"}
            </Text>
          </FlatButton>
          {authStatus.status === "failed" ? <Text style={styles.error}>{authStatus.error}</Text> : null}
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    token: state.user.token,
    authStatus: state.status.authStatus,
  };
}

function bindActions(dispatch) {
  return {
    login: (username, password) => dispatch(login(username, password)),
    resetRoute: route => dispatch(resetRoute(route)),
  };
}

export default connect(mapStateToProps, bindActions)(AuthenticationPage);
