import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Form from './Form';
import {StyleSheet, View} from 'react-native';

export default class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Form />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});