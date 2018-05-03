
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import { navigate } from '../../actions/nav';
import { BRAND_COLOR } from '../../constants';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
}

class InfoPage extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    const { getProducts, getProductsStatus } = this.props;
    const products = [];
    
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 17, lineHeight: 30, alignSelf: 'center', marginTop: 20, flex: 1}}>
          {"You're fucking awesome!"}
        </Text>
      </View>
    );
  }
}

function bindAction(dispatch) {
  return {
    navigate: (route) => dispatch(navigate(route)),
  };
}

function mapStateToProps(state) {
  return {
    // products: state.app.products,
  };
}

export default connect(mapStateToProps, bindAction)(InfoPage);
