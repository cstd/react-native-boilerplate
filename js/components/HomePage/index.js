
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, TouchableOpacity, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { navigate } from '../../actions/nav';
import { logout } from '../../actions/user';
import { getProducts } from '../../actions/app';
import { BRAND_COLOR } from '../../constants';
import { alertMe } from '../../utils';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  footerTab: {
    backgroundColor: BRAND_COLOR,
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    height: 60
  }
}

class HomePage extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
    }
  }
  
  componentWillMount() {
    this.props.getProducts()
  }
  
  onProductPress(product) {
    this.props.navigate({
      routeName: "info_page", 
      params: { product }
    });
  }
  
  onCreate() {
    alertMe("Thêm mới");
  }
  
  onSettings() {
    alertMe("Cài đặt");
  }
  
  onExit() {
    Alert.alert(
      'Đăng xuất tài khoản',
      '',
      [
        {text: 'Huỷ', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Đồng ý', onPress: () => this.props.logout()},
      ]
    );
  }

  render() {
    const { products, getProducts, getProductsStatus } = this.props;
    
    return (
      <View style={styles.container}>
        {products.length > 0 ? (
          <FlatList 
            style={{flex: 1}}
            refreshing={getProductsStatus.status === 'loading'}
            onRefresh={() => getProducts()}
            data={products}
            keyExtractor={item => item.id+""}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity 
                  onPress={() => this.onProductPress(item)}
                  style={{
                    backgroundColor: 'white',
                    padding: 20,
                    marginBottom: 1,
                  }}
                  activeOpacity={0.7}>
                  <Text style={{ fontSize: 18 }}>{item.name}</Text>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <FlatList 
            style={{margin: 10, flex: 1}}
            refreshing={getProductsStatus.status === 'loading'}
            onRefresh={() => getProducts()}
            data={Array(1).fill()}
            keyExtractor={(item, index) => index+""}
            renderItem={({item, index}) => {
              return (
                <Text style={{fontSize: 17, lineHeight: 30, alignSelf: 'center', marginTop: 20, flex: 1}}>
                  Không có dữ liệu
                </Text>
              );
            }}
          />
        )}
        
        <View style={styles.footerTab}>
          <TouchableOpacity
            style={{flex: 1, alignItems: 'center'}}
            onPress={() => this.onCreate()}
          >
            <Icon name="md-add-circle" size={25} style={{color: 'white'}}/>
            <Text style={{color: 'white'}}>
              Thêm
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, alignItems: 'center'}}
            onPress={() => this.onSettings()}
          >
            <Icon name="md-settings" size={25} style={{color: 'white'}}/>
            <Text style={{color: 'white'}}>
              Cài đặt
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, alignItems: 'center'}}
            onPress={() => this.onExit()}
          >
            <Icon name="md-log-out" size={25} style={{color: 'white'}}/>
            <Text style={{color: 'white'}}>
              Thoát
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    navigate: (route) => dispatch(navigate(route)),
    getProducts: () => dispatch(getProducts()),
    logout: () => dispatch(logout()),
  };
}

function mapStateToProps(state) {
  return {
    getProductsStatus: state.status.getProductsStatus,
    products: state.app.products,
  };
}

export default connect(mapStateToProps, bindAction)(HomePage);
