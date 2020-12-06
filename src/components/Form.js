import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'

import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Image,
  Dimensions,
  TextInput,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';

import { Actions, ActionConst } from 'react-native-router-flux';
// import Spinner from 'react-native-loading-spinner-overlay';
import Loader from './Loader'
import Toast, {DURATION} from 'react-native-easy-toast'

import bgSrc from '../images/header.png';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this._onPressLogin = this._onPressLogin.bind(this);
    this._onPressRegister = this._onPressRegister.bind(this);
    this._onPressForgot = this._onPressForgot.bind(this);
  }

  state = {
    email: '',
    password: '',
    spinner: false,
    disabledLogin: true,
    validEmail: false,
    validPassword: false,
  };

  validatePassword = (text) => {
    if (!text) {
        this.setState({password:'', validPassword:false, disabledLogin:true});
    }
    else if (text.length > 5) {
        this.setState({password:text, validPassword:true, disabledLogin:!(this.state.validEmail)});
    }
    else {
        this.setState({password:text, validPassword:false, disabledLogin:true});
    }
  }

validateEmail = (text) => {
    //console.log(text);
    //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
    if (!text) {
        this.setState({email:'', validEmail:false, disabledLogin:true})
    }
    else if(reg.test(text) === false)
    {
        this.setState({email:text, validEmail:false, disabledLogin:true})
    }
    else {
      this.setState({email:text, validEmail:true, disabledLogin:!(this.state.validPassword)});
      //console.log("Email is Correct");
    }
}

  _onPressRegister() {
    Actions.registerScreen();
  }

  _onPressForgot() {
    Actions.forgotpasswordScreen()
  }

  _onPressLogin() {
    this.setState({spinner: true});
        fetch(`${global.serverurl}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                id: global.user_id 
            }),
        }).then((response) => response.json())
        .then((responseJson) => {

            if (responseJson.success == 0) {
                this.setState({spinner: false});
                this.refs.toast.show(<Text style={styles.toast_error}>{responseJson.message}</Text>, 1500);
            }
            else {
                global.email = responseJson.user.email;
                global.username = responseJson.user.full_name;
                global.user_id = responseJson.user._id;
                global.user_type = responseJson.user.user_type;
                global.token = responseJson.token;
                setTimeout(() => {
                  Actions.push('lookupScreen');
                  this.setState({spinner: false});
                }, 1500)
            }
        })
        .catch((error) => {
            console.log(error)
            this.setState({spinner: false});
            this.refs.toast.show(<Text style={styles.toast_error}>Server error occured. Try again later</Text>, 1500);
        });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        {this.state.spinner ? <Loader /> :
          <>
            <Image style={styles.picture} source={bgSrc} />
            <Text style={styles.textTitle}>Employee{"\n"}Login</Text>

            <View style={styles.containerForm}>
              <Text style={styles.textEmail}>Email</Text>
              <TextInput
                placeholder="Enter your email address"
                placeholderTextColor="gray"
                autoCompleteType="email"
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.inputEmail}
                returnKeyType={'next'}
                onChangeText={(text) => this.validateEmail(text)}
                value={this.state.email}
              />
              <Text style={styles.textEmail}>Password</Text>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="gray"
                autoCompleteType="password"
                autoCapitalize="none"
                style={styles.inputPassword}
                secureTextEntry={true}
                returnKeyType={'done'}
                onChangeText={(text) => this.validatePassword(text)}
                value={this.state.password}
              />
              <TouchableOpacity
                style={styles.btnLogin}
                activeOpacity={0.6}
                onPress={this._onPressLogin}
                disabled={this.state.disabledLogin}>
                  <View style={styles.viewLogin} backgroundColor={this.state.disabledLogin ? '#e9e9e9': 'gold'}></View>
                  <Text style={styles.textLogin}>Log In</Text>
              </TouchableOpacity>

              <View style={styles.viewRegisterForgot}>
                <TouchableOpacity
                  style={styles.btnRegister}
                  onPress={this._onPressRegister}
                  activeOpacity={0.8}>

                  <Text style={styles.text3}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btnForgotPassword}
                  onPress={this._onPressForgot}
                  activeOpacity={0.8}>

                  <Text style={styles.text3}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Toast ref="toast" position="top" style={ {padding: 0,borderRadius: 10} }/>
          </>
        }
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
  toast_success: {
    fontWeight: '600',
    fontSize: 20,
    backgroundColor: 'green',
    color: '#ffffff',
    padding: 15,
    borderRadius: 15
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
  picture: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT / 3,
    resizeMode: 'stretch',
  },
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  textTitle: {
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    position: 'absolute',
    fontSize: DEVICE_HEIGHT / 18,
    marginTop: DEVICE_HEIGHT / 9,
    marginLeft: DEVICE_WIDTH / 10,
  },
  containerForm: {
    top: DEVICE_HEIGHT / 3 + 30,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT * 2 / 3 - 30,
    position: 'absolute',
    alignItems: 'center'
  },
  inputEmail: {
    position: 'relative',
    backgroundColor: '#F0F0F0',
    marginTop: 20,
    width: DEVICE_WIDTH - 40,
    height: 40,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    fontSize: 20,
    color: '#000000',
  },
  inputPassword: {
    position: 'relative',
    backgroundColor: '#F0F0F0',
    marginTop: 20,
    width: DEVICE_WIDTH - 40,
    height: 40,
    paddingHorizontal: 10,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    fontSize: 20,
    color: '#000000',
  },
  btnLogin: {
    position:'relative',
    marginTop: 50,
    backgroundColor: '#E9E9E9',
    borderRadius: 10,
    fontWeight:'bold',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewLogin: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 5,
  },
  textLogin: {
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center'
  },
  viewRegisterForgot:{
    // position: 'relative',
    marginTop: 48,
    width: DEVICE_WIDTH - 40,
    height: 40,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  btnRegister: {
    height: 40,
    marginLeft: 0,
    borderRadius: 5,
    backgroundColor:'transparent',
    fontWeight:'bold',
    textAlign: 'left',
  },
  btnForgotPassword: {
    height: 40,
    borderRadius: 5,
    backgroundColor:'transparent',
    fontWeight:'bold',
    textAlign: 'right',

  },
  textEmail: {
    position: 'relative',
    marginTop: 20,
    width: DEVICE_WIDTH - 40,
    height: 20,
    fontSize: 20,
    fontWeight: "500",
    color: 'black',
    backgroundColor: 'transparent',
  },
  text3: {
    fontSize: 18,
    fontWeight: '500',
    textDecorationStyle: 'solid',
    textDecorationColor: 'black',
    textDecorationLine: 'underline',
  }
});
