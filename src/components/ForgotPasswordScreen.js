import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, View, Dimensions, Text, KeyboardAvoidingView,
    TouchableOpacity, TextInput, Button} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast, {DURATION} from 'react-native-easy-toast';

export default class ForgotPasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: '',
          spinner: false,
          disabledSend: true,
          validEmail: false,
          
        };
        this._onPressLogin = this._onPressLogin.bind(this);
        this._onPressSend = this._onPressSend.bind(this);
        
    }

    validateEmail = (text) => {
        //console.log(text);
        //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
        if (!text) {
            this.setState({email:'', validEmail:false, disabledSend:true})
        }
        else if(reg.test(text) === false)
        {
            this.setState({email:text, validEmail:false, disabledSend:true})
            
        }
        else {
          this.setState({email:text, validEmail:true, disabledSend:false});
          
          //console.log("Email is Correct");
        }
        
    }

    _onPressSend() {
        this.setState({spinner: true});
        
        fetch(`${global.serverurl}/auth/password_reset_request`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                token: global.token
            }),
        }).then((response) => response.json())
        .then((responseJson) => {
            this.setState({spinner: false});
            if (responseJson.success == 0) {
                this.refs.toast.show(<Text style={styles.toast_error}>{responseJson.message}</Text>, 1500);
            }
            else {
                Actions.replace('forgotpasswordemailsentScreen');
            }
            
        })
        .catch((error) => {
            this.setState({spinner: false});
            this.refs.toast.show(<Text style={styles.toast_error}>Server Error!</Text>, 1500);
        });
    }
    _onPressLogin() {
        Actions.pop();
    }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <Spinner
                visible={this.state.spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
        <Text style={styles.textTitle}>Forgot your password?</Text>
        <Text style={styles.textContent1}>Enter the email address{'\n'}associated with your account</Text>
        <Text style={styles.textContent2}>We'll email you a link to reset{'\n'}your password</Text>
        <TextInput 
            placeholder="Enter your email address"
            placeholderTextColor="gray"
            autoCompleteType="email"
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.inputEmail}
            returnKeyType={'done'}
            onChangeText={(text) => this.validateEmail(text)}
            value={this.state.email}
          />
          <TouchableOpacity
            style={styles.btnSend}
            activeOpacity={0.6}
            onPress={this._onPressSend}
            disabled={this.state.disabledSend}>
            <View style={styles.viewSend} backgroundColor={this.state.disabledSend ? '#e9e9e9': 'gold'}></View>
            <Text style={styles.textSend}>Send Link</Text>
          </TouchableOpacity>
          <TouchableOpacity
                style={styles.btnLogin}
                onPress={this._onPressLogin}
                activeOpacity={0.8}>
            
                <Text style={styles.textLogin}>Back to Login</Text>
            </TouchableOpacity>
            <Toast ref="toast" position="top" style={ {padding: 0,borderRadius: 10} }/>
      </KeyboardAvoidingView>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    toast_error: {
        fontWeight: '600',
        fontSize: 20,
        backgroundColor: 'red',
        color: '#ffffff',
        padding: 15,
        borderRadius: 15
    },
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
      marginTop: DEVICE_HEIGHT / 8,
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'center',
  },
  textContent1: {
      position: 'relative',
      fontWeight: '500',
      marginTop: DEVICE_HEIGHT / 15,
      fontSize: 22,
      textAlign: 'center',
  },
  textContent2: {
      position: 'relative',
      marginTop: 20,
      fontSize: DEVICE_WIDTH / 23,
      textAlign: 'center',
      color: 'gray',
  },
  inputEmail: {
    position: 'relative',
    backgroundColor: '#F0F0F0',
    marginTop: DEVICE_HEIGHT / 15,
    width: DEVICE_WIDTH - 40,
    height: 40,
    paddingHorizontal: 10,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    fontSize: 20,
    color: 'black',
  },
  btnSend: {
    position: 'relative',
    marginTop: DEVICE_HEIGHT / 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
},
btnLogin: {
    position: 'relative',
    marginTop: 40,
},
textLogin: {
    fontSize: 18,
    fontWeight: '500',
    textDecorationStyle: 'solid',
    textDecorationColor: 'black',
    textDecorationLine: 'underline',
},
viewSend: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 5,
},
textSend: {
    paddingLeft: 34,
    paddingRight: 34,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center'
},
});