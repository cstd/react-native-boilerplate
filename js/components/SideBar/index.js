
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BackHandler, Image } from 'react-native';
import { Content, Text, List, ListItem, Icon, View, Badge, Left, Right } from 'native-base';

import styles from './styles';

import { navigate } from '../../actions/nav';

const logo = require('../../../images/logo-white.png');
const activeItemBgColor = '#f9cb66';

class SideBar extends Component {

  getCurrentRoute() {
    if (this.props.nav.routes && 
        this.props.nav.routes.length && 
        this.props.nav.routes[0].routes &&
        this.props.nav.routes[0].routes.length && 
        this.props.nav.routes[0].routes[0].routes &&
        this.props.nav.routes[0].routes[0].routes.length) {
      return this.props.nav.routes[0].routes[0].routes[this.props.nav.routes[0].routes[0].index].key;
    }
  }

  render() {
    const { profile } = this.props;
    const { name, phone } = profile;

    const categories = [
      {
        name: 'HOẠT ĐỘNG'
      },
      {
        name: 'Đồng bộ dữ liệu',
        action: () => BackHandler.exitApp(),
        icon: 'md-clipboard',
      },
      {
        name: 'Đồng bộ dữ liệu',
        route: 'home_page',
        icon: 'md-clipboard',
        badge: 9,
        bg: '#6390ff'
      },
      {
        name: 'HỆ THỐNG'
      },
      {
        name: 'Cài đặt',
        route: 'settings_page',
        icon: 'md-settings'
      },
      {
        name: 'Thoát',
        action: () => BackHandler.exitApp(),
        icon: 'md-log-out'
      },
    ]

    return (
      <Content
        bounces={false}
        style={{ flex: 1, backgroundColor: '#FCB71E', top: -1 }}
      >
        <View style={styles.drawerCover}>
          <View style={styles.drawerLogo}>
            <Image
              square
              style={styles.logo}
              source={logo}
            />
          </View>
          <Text style={styles.drawerText}>{`${name}`}</Text>
          <Text style={styles.drawerText}>{`${phone}`}</Text>
        </View>

        <List 
          dataArray={categories}
          renderRow={data => 
            (!data.route && !data.action)
            ?
            <ListItem itemDivider style={styles.listItemDivider}>
              <Text style={styles.textDivider}>{data.name}</Text>
            </ListItem>
            :
            <ListItem
             button
             noBorder
             onPress={data.route ? () => this.props.navigate({routeName: data.route}) : data.action}
             style={{...styles.listItem, ...(this.getCurrentRoute() === data.route ? {backgroundColor: activeItemBgColor} : {})}}>
              <Left>
                <Icon active name={data.icon} style={styles.icon} />
                <Text style={styles.text}>{data.name}</Text>
              </Left>
              {
                data.badge
                ?
                <Right>
                  <Badge
                    style={{ height: 24, backgroundColor: data.bg }}
                  >
                    <Text style={styles.badgeText}>{`${data.badge}`}</Text>
                  </Badge>
                </Right>
                :
                null
              }
            </ListItem>}
        />
      </Content>
    );
  }
}

function mapStateToProps(state) {
  return {
    nav: state.nav,
    profile: state.user.profile,
  };
}

function bindAction(dispatch) {
  return {
    navigate: route => dispatch(navigate(route)),
  };
}

export default connect(mapStateToProps, bindAction)(SideBar);
