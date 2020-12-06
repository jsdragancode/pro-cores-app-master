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

export default class ChangePasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          oldpassword: '',
          newpassword: '',
          confirmpassword: '',
          spinner: false,
          disabledSave: true,
          validOld: false,
          validNew: false,
          validConfirm: false,
        };
        this._onPressBack = this._onPressBack.bind(this);
        this._onPressSave = this._onPressSave.bind(this);
        this.validateOld = this.validateOld.bind(this);
        this.validateNew = this.validateNew.bind(this);
        this.validateConfirm = this.validateConfirm.bind(this);
        this.checkdisable = this.checkdisable.bind(this)
    }

    checkdisable = () => {
      if (this.state.validOld && this.state.validNew && this.state.validConfirm && this.state.newpassword === this.state.confirmpassword) {
        return false
      } else {
        return true
      }
    }

    validateConfirm = (text) => {
      this.setState({
        confirmpassword: text
      })
      if (!text || text.length == 0) {
        this.setState({
          validConfirm: false,
        })
      } else {
        this.setState({
          validConfirm: true
        })
      }
    }

    validateNew = (text) => {
      this.setState({
        newpassword: text
      })
      if (!text || text.length == 0) {
        this.setState({
          validNew: false,
        })
      } else {
        this.setState({
          validNew: true
        })
      }
    }

    validateOld = (text) => {
      this.setState({
        oldpassword: text
      })
      if (!text || text.length == 0) {
        this.setState({
          validOld: false,
        })
      } else {
        this.setState({
          validOld: true
        })
      }
    }

  
    _onPressSave() {
        this.setState({spinner: true});
        
        fetch(`${global.serverurl}/auth/password_profile_update`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: global.user_id,
                email: this.state.email,
                token: global.token,
                o_password: this.state.oldpassword,
                n_password: this.state.newpassword
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
            }
            
        })
        .catch((error) => {
          this.setState({spinner: false});
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
        <Text style={styles.textTitle}>Change Password</Text>
        <Text style={styles.textContent1}>Old Password</Text>
        <Text style={styles.textContent2}>New Password</Text>
        <Text style={styles.textContent3}>Confirm New Password</Text>
        <TextInput 
            style={styles.inputOldPassword}
            placeholder="Enter your old password"
            placeholderTextColor="gray"
            autoCompleteType="password"
            autoCapitalize="none"
            secureTextEntry={true}
            returnKeyType={'next'}
            onChangeText={(text) => this.validateOld(text)}
            value={this.state.oldpassword}
          />
        <TextInput 
            style={styles.inputNewPassword}
            placeholder="Create a new password"
            placeholderTextColor="gray"
            autoCompleteType="password"
            autoCapitalize="none"
            secureTextEntry={true}
            returnKeyType={'next'}
            onChangeText={(text) => this.validateNew(text)}
            value={this.state.newpassword}
          />
        <TextInput 
            style={styles.inputConfirmPassword}
            placeholder="Re-enter your new password"
            placeholderTextColor="gray"
            autoCompleteType="password"
            autoCapitalize="none"
            secureTextEntry={true}
            returnKeyType={'done'}
            onChangeText={(text) => this.validateConfirm(text)}
            value={this.state.confirmpassword}
          />
          <TouchableOpacity
            style={styles.btnSave}
            onPress={this._onPressSave}
            activeOpacity={0.6} disabled={this.checkdisable()}>
            <View style={styles.viewSave} backgroundColor={this.checkdisable() ? '#e9e9e9': 'gold'}></View>
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
      fontWeight: '500',
      top: '28%',
      fontSize: 22,
      textAlign: 'left',
      width: '80%',
  },
  textContent2: {
      position: 'absolute',
      top: '41%',
      fontSize: 22,
      textAlign: 'left',
      fontWeight: '500',
      width: '80%',
  },
  textContent3: {
    position: 'absolute',
    top: '54%',
    fontSize: 22,
    textAlign: 'left',
    fontWeight: '500',
    width: '80%',
},
  inputOldPassword: {
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
  inputNewPassword: {
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
  inputConfirmPassword: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: '59%',
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
    top: '80%',
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
    paddingLeft: 45,
    paddingRight: 45,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
},
});