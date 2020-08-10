import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, Text, KeyboardAvoidingView,
    TouchableOpacity, TextInput, Button} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast, {DURATION} from 'react-native-easy-toast'

export default class RegisterScreen extends Component {
    
    constructor(props) {
        super(props);
        
        this._onPressRegister = this._onPressRegister.bind(this);
        this._onPressLogin = this._onPressLogin.bind(this);
    }

    state = {
        spinner: false,
        disabledRegister: true,
        username: '',
        email: '',
        password: '',
        validName: false,
        validEmail: false,
        validPassword: false,
    };

    validatePassword = (text) => {
        
        if (!text) {
            this.setState({password:'', validPassword:false, disabledRegister:true});
            
        }
        else if (text.length > 5) {
            this.setState({password:text, validPassword:true, disabledRegister:!(this.state.validName && this.state.validEmail)});
        }
        else {
            this.setState({password:text, validPassword:false, disabledRegister:true});            
        }        
    }

    validateName = (text) => {
        if (!text) {
            this.setState({username:'', validName:false, disabledRegister:true});
            
        }
        else if (text.length > 0) {
            this.setState({username:text, validName:true, disabledRegister:!(this.state.validPassword && this.state.validEmail)});
        }
        else {
            this.setState({username:text, validName:false, disabledRegister:true});
            
        }
    }

    validateEmail = (text) => {
        //console.log(text);
        //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
        if (!text) {
            this.setState({email:'', validEmail:false, disabledRegister:true})
        }
        else if(reg.test(text) === false)
        {
            this.setState({email:text, validEmail:false, disabledRegister:true})
            
        }
        else {
          this.setState({email:text, validEmail:true, disabledRegister:!(this.state.validPassword && this.state.validName)});
        }
        
    }

    _onPressLogin() {
        Actions.pop();
    }

    _onPressRegister() {
        this.setState({spinner: true});
        
        fetch(`${global.serverurl}/auth/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            }),
        }).then((response) => response.json())
        .then((responseJson) => {
            this.setState({spinner: false});
            if (responseJson.success == 0) {
                this.refs.toast.show(<Text style={styles.toast_error}>{responseJson.message}</Text>, 1500);
            }
            else {
                this.refs.toast.show(<Text style={styles.toast_success}>{'Successfully registered!'}</Text>, 1500);
                global.email = responseJson.user.email;
                global.username = responseJson.user.full_name;
                global.user_id = responseJson.user._id;
                global.user_type = responseJson.user.user_type;
                global.token = responseJson.token;
                setTimeout(() => {
                    Actions.replace('lookupScreen');
                }, 1500)
            }
            
        })
        .catch((error) => {
            this.refs.toast.show(<Text style={styles.toast_error}>Server Error!</Text>, 1500);
        });
    }

    render() {
      return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            
            <Spinner
                visible={this.state.spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
          <Text style={styles.text1}>Employee{"\n"}Registration</Text>
          <View style={styles.container1}>
            <Text style={styles.textName}>Name</Text>
            <TextInput 
                placeholder="Enter your full name"
                placeholderTextColor="gray"
                autoCompleteType="name"
                autoCapitalize="words"
                keyboardType="default"
                style={styles.inputEmail}
                returnKeyType={'next'}
                onChangeText={(text) => this.validateName(text)}
                value={this.state.username}
                />
            
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
                style={styles.inputEmail}
                secureTextEntry={true}
                returnKeyType={'done'}
                onChangeText={(text) => this.validatePassword(text)}
                value={this.state.password}
                />
            <TouchableOpacity
                style={styles.btnRegister}
                activeOpacity={0.6}
                onPress={this._onPressRegister}
                disabled={this.state.disabledRegister}>
                    <View style={styles.viewRegister} backgroundColor={this.state.disabledRegister ? '#e9e9e9': 'gold'}></View>
                    <Text style={styles.textRegister}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btnLogin}
                onPress={this._onPressLogin}
                activeOpacity={0.8}>
            
                <Text style={styles.textLogin}>Log In</Text>
            </TouchableOpacity>
          </View>
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
    toast_success: {
        fontWeight: '600',
        fontSize: 20,
        backgroundColor: 'green',
        color: '#ffffff',
        padding: 15,
        borderRadius: 15
    },
    container: {
      backgroundColor: 'white',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: 'center'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    text1: {
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        position: 'absolute',
        fontSize: DEVICE_HEIGHT / 18,
        marginTop: DEVICE_HEIGHT / 9,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    container1 : {
        backgroundColor: 'white',
        position: 'absolute',
        top: DEVICE_HEIGHT / 3,
        left: 0,
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT * 2 / 3,
        alignItems: 'center'
    },
    textName: {
        position: 'relative',
        marginTop: 0,
        width: DEVICE_WIDTH - 40,
        height: 30,
        fontSize: 20,
        fontWeight: "500",
        color: 'black',
        backgroundColor: 'transparent',
    },
    textEmail: {
        position: 'relative',
        marginTop: 15,
        width: DEVICE_WIDTH - 40,
        height: 30,
        fontSize: 20,
        fontWeight: "500",
        color: 'black',
        backgroundColor: 'transparent',
    },
    inputEmail: {
        position: 'relative',
        backgroundColor: '#F0F0F0',
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
    btnRegister: {
        position: 'relative',
        marginTop: 40,
        backgroundColor: '#E9E9E9',
        borderRadius: 10,
        fontWeight:'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewRegister: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 5,
    },
    textRegister: {
        paddingLeft: 34,
        paddingRight: 34,
        paddingTop: 12,
        paddingBottom: 12,
        fontSize: 22,
        fontWeight: '500',
        textAlign: 'center'
    },
    btnLogin: {
        position: 'relative',
        marginTop: 40,
    },
    textLogin: {
        fontSize: 20,
        fontWeight: '500',
        textDecorationStyle: 'solid',
        textDecorationColor: 'black',
        textDecorationLine: 'underline',
    },
  });