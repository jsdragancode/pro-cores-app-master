import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {StyleSheet, View, Dimensions, Text,
    TouchableOpacity, TextInput, Button} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast, {DURATION} from 'react-native-easy-toast';
import {SvgFromXml} from 'react-native-svg';

const backxml = `
<svg width="15" height="25" viewBox="0 0 15 25" fill="none">
<path d="M0 12.5142L12.9706 25L15 23.042L4.08824 12.5142L15 1.958L12.9706 0L0 12.4858V12.5142Z" fill="black"/>
</svg>
    `;

export default class EditProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          email: global.email,
          username: global.username,
          spinner: false,
          disabledSave: false,
          validEmail: true,
          validName: true,
        };
        this._onPressBack = this._onPressBack.bind(this);
        this._onPressSave = this._onPressSave.bind(this);
        
    }

    validateEmail = (text) => {
        //console.log(text);
        //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;
        if (!text || text.length == 0) {
            // if (this.state.validName) {
            //     this.setState({email:'', validEmail:false, disabledSave:false})
            // }
            // else {
            //     this.setState({email:'', validEmail:false, disabledSave:true})
            // }
            this.setState({email:'', validEmail:false, disabledSave:true})
        }
        else if(reg.test(text) === false)
        {
            this.setState({email:text, validEmail:false, disabledSave:true})
            
        }
        else {
          this.setState({email:text, validEmail:true, disabledSave:!(this.state.validName)});
          
          //console.log("Email is Correct");
        }
        
    }

    validateName = (text) => {
        
        if (!text || text.length == 0) {
            this.setState({username:'', validName:false, disabledSave:true})
        }
        else if(text.length > 0)
        {
            // if (this.state.email.length > 0) {
            //     this.setState({username:text, validName:true, disabledSave:!(this.state.validEmail)})
            // }
            // else {
            //     this.setState({username:text, validName:true, disabledSave:false})
            // }
            this.setState({username:text, validName:true, disabledSave:!(this.state.validEmail)})
        }
        
    }

    _onPressSave() {
        this.setState({spinner: true});
        console.log('global', global)
        fetch(`${global.serverurl}/auth/profile_update`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                name: this.state.username,
                id: global.user_id,
                token: global.token
            }),
        }).then((response) => response.json())
        .then((responseJson) => {
            this.setState({spinner: false});
            console.log(responseJson);
            if (responseJson.success == 0) {
                this.refs.toast.show(<Text style={styles.toast_error}>{responseJson.message}</Text>, 1500);
            }
            else {
                this.refs.toast.show(<Text style={styles.toast_success}>{responseJson.message}</Text>, 1500);
                //Actions.replace('forgotpasswordemailsentScreen');
                global.email = this.state.email;
                global.username = this.state.username;
            }
        })
        .catch((error) => {
            this.setState({spinner: false});
            console.error(error);
            this.refs.toast.show(<Text style={styles.toast_error}>Server Error!</Text>, 1500);
        });
    }

    _onPressBack() {
        Actions.pop();
    }

  render() {
    return (
      <View style={styles.container}>
          <Spinner
                visible={this.state.spinner}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
        <TouchableOpacity style={styles.btnBack} onPress={this._onPressBack}
              activeOpacity={0.6}>
              <SvgFromXml width="35" height="35" xml={backxml}></SvgFromXml>
        </TouchableOpacity>
        <Text style={styles.textTitle}>Edit Profile</Text>
        <Text style={styles.textContent1}>Name</Text>
        <Text style={styles.textContent2}>Email</Text>
        <TextInput 
            placeholder={global.username}
            placeholderTextColor="gray"
            autoCompleteType="name"
            autoCapitalize="words"
            keyboardType="default"
            style={styles.inputName}
            returnKeyType={'next'}
            onChangeText={(text) => this.validateName(text)}
            value={this.state.username}
          />
        <TextInput 
            placeholder={global.email}
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
            style={styles.btnSave}
            onPress={this._onPressSave}
            activeOpacity={0.6} disabled={this.state.disabledSave}>
            <View style={styles.viewSave} backgroundColor={this.state.disabledSave ? '#e9e9e9': 'gold'}></View>
            <Text style={styles.textSave}>Save Changes</Text>
          </TouchableOpacity>
          <Toast ref="toast" position="top" style={ {padding: 0,borderRadius: 10} }/>
      </View>
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
      position: 'absolute',
      top: '18%',
      width: '80%',
      fontSize: 30,
      fontWeight: 'bold',
      textAlign: 'left',
  },
  btnBack: {
    position: 'absolute',
    width: '10%',
    height: DEVICE_WIDTH / 10,
    left: '5%',
    top: '9%',
  },
  textContent1: {
      position: 'absolute',
      fontWeight: 'bold',
      top: '28%',
      fontSize: 24,
      fontWeight: '500',
      textAlign: 'left',
      width: '80%',
  },
  textContent2: {
      position: 'absolute',
      top: '41%',
      fontSize: 24,
      fontWeight: '500',
      textAlign: 'left',
      fontWeight: 'bold',
      width: '80%',
  },
  inputName: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: '33%',
    width: '80%',
    height: DEVICE_WIDTH / 15,
    paddingHorizontal: 1,
    fontSize: 20,
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  inputEmail: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: '46%',
    width: '80%',
    height: DEVICE_WIDTH / 15,
    paddingHorizontal: 1,
    fontSize: 20,
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  
btnSave: {
    position: 'absolute',
    top: '75%',
    width: '60%',
    height: DEVICE_WIDTH / 10,
    alignItems: "center",
    justifyContent: 'center',
    borderRadius: 10,
},
viewSave: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 5,
},
textSave: {
    fontSize: DEVICE_WIDTH / 20,
    fontWeight: 'bold',
    textAlign: 'center'
},
});