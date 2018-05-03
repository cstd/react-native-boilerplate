
import React, { Component } from 'react';
import { 
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  label: {
    color: "#999",
    fontSize: 15,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    color: "#555",
    height: 50,
    borderColor: '#e2e2e2',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export default class Input extends Component {
  render() {
    const { label, value, onChange, secureTextEntry } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput 
          {...this.props}
          ref={c => this._input = c }
          value={value}
          onChangeText={text => onChange(text)} 
          style={styles.input} 
          underlineColorAndroid="transparent"
          secureTextEntry={secureTextEntry}/>
      </View>
    );
  }
}
