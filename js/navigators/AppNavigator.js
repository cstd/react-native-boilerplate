import React, { Component } from "react";
import { connect } from 'react-redux';
import { StatusBar, View, BackHandler, Button, TouchableOpacity } from "react-native";
import { addNavigationHelpers, StackNavigator, DrawerNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

// import DrawBar from "../components/SideBar";
import AuthenticationPage from "../components/AuthenticationPage/";
import HomePage from "../components/HomePage/";
import InfoPage from "../components/InfoPage/";

import { sync } from '../actions/user';
import { navigate } from '../actions/nav';

import { alertMe } from '../utils';
import { BRAND_COLOR } from '../constants';

// const DrawNav = DrawerNavigator(
//   {
//     delivery_page: { screen: DeliveryPage },
//     delivered_page: { screen: DeliveredPage },
//     history_page: { screen: HistoryPage },
//   },
//   {
//     contentComponent: props => <DrawBar {...props} />
//   }
// )

export const AppNavigator = StackNavigator({
  authentication_page: {
    screen: AuthenticationPage,
    navigationOptions: {
      header: null
    }
  },
  home_page: {
    screen: HomePage,
    navigationOptions: (props) => ({
      title: "React Native Boilerplate",
      // title: props.navigation.state.params.item.name,
      headerStyle: {
        backgroundColor: BRAND_COLOR,
        elevation: 0,
      },
      headerTintColor: 'white',
      // headerRight: (
      //   <TouchableOpacity
      //     onPress={() => props.navigation.dispatch(navigate({routeName: "other_page", params: {item: props.navigation.state.params.item}}))}
      //   >
      //     <Icon name="ios-camera" size={30} style={{color: 'white', paddingHorizontal: 20}}/>
      //   </TouchableOpacity>
      // ),
    })
  },
  info_page: {
    screen: InfoPage,
    navigationOptions: (props) => ({
      title: props.navigation.state.params.product.name,
      headerStyle: {
        backgroundColor: BRAND_COLOR,
        elevation: 0,
      },
      headerTintColor: 'white',
    })
  },
  // home_page: {
  //   screen: DrawNav,
  //   navigationOptions: {
  //     header: null
  //   }
  // },
});


class App extends Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index > 0) {
      dispatch(NavigationActions.back());
    } else {
      alertMe("Ấn phím Trở lại 2 lần liên tiếp để thoát.");
      if (this._closedTime && new Date() - this._closedTime < 500) {
        BackHandler.exitApp();
      }
      this._closedTime = new Date();
    }
    return true;
  }

  render() {
    const { dispatch, nav } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={BRAND_COLOR}/>
        <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

const mapDispatchToProps = dispatch => ({
  dispatch: (action) => dispatch(action),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);