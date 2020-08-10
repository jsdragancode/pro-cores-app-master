import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, View, Dimensions, Text, TouchableOpacity} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';

export default class ForgotPasswordEmailSentScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
        this._onPressLogin = this._onPressLogin.bind(this);
    }

    _onPressLogin() {
        Actions.pop();
    }

  render() {
    return (
      <View behavior="padding" style={styles.container}>
          
        <Text style={styles.textTitle}>Check your email</Text>
        <Text style={styles.textContent2}>We've sent you a{'\n'}password reset link</Text>
        <TouchableOpacity
                style={styles.btnLogin}
                onPress={this._onPressLogin}
                activeOpacity={0.8}>
            
                <Text style={styles.textLogin}>Back to Login</Text>
            </TouchableOpacity>
      </View>
      
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF'
    },
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  textTitle: {
      position: 'relative',
      marginTop: DEVICE_HEIGHT / 4,
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
  },
  
  textContent2: {
      position: 'relative',
      marginTop: 20,
      fontWeight: '500',
      fontSize: 22,
      textAlign: 'center',
      color: 'gray',
  },

  btnLogin: {
    position: 'absolute',
    bottom: DEVICE_HEIGHT / 4,
},
textLogin: {
    fontSize: 18,
    fontWeight: '500',
    textDecorationStyle: 'solid',
    textDecorationColor: 'black',
    textDecorationLine: 'underline',
},
  
});