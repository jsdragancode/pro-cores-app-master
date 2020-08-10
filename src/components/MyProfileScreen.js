import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, Text, KeyboardAvoidingView,
    TouchableOpacity, TextInput, Button, Modal, } from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import {SvgFromXml} from 'react-native-svg';

const backxml = `
<svg width="15" height="25" viewBox="0 0 15 25" fill="none">
<path d="M0 12.5142L12.9706 25L15 23.042L4.08824 12.5142L15 1.958L12.9706 0L0 12.4858V12.5142Z" fill="black"/>
</svg>
    `;
const editprofilexml = `
<svg width="32" height="33" viewBox="0 0 32 33" fill="none">
<path d="M25.6919 26.8044C25.6919 28.0856 24.6467 29.0634 23.3992 29.0634H5.25975C3.97853 29.0634 2.96704 28.0519 2.96704 26.8044V8.59759C2.96704 7.35009 4.01225 6.3386 5.25975 6.3386H14.5318L17.4651 3.40527H5.25975C2.36015 3.40527 0 5.7317 0 8.59759V26.8044C0 29.704 2.36015 32.0305 5.25975 32.0305H23.4329C26.3325 32.0305 28.6926 29.704 28.6926 26.8044V14.5654L25.7593 17.4987V26.8044H25.6919Z" fill="black"/>
<path d="M31.3555 4.78772L27.2422 0.708044C26.8038 0.269731 26.1969 0 25.5901 0C24.9494 0 24.3763 0.236015 23.9379 0.674327L8.76559 15.8467C8.36099 16.2513 8.12498 16.7907 8.09126 17.3639L7.82153 21.7133C7.78781 22.3877 8.02383 23.062 8.49586 23.534C8.93417 23.9723 9.54106 24.2083 10.148 24.2083C10.1817 24.2083 10.2491 24.2083 10.2828 24.2083L14.6659 23.9386C15.2391 23.9049 15.7786 23.6689 16.1832 23.2643L31.3218 8.12564C31.7601 7.68733 31.9962 7.08044 31.9962 6.47354C32.0299 5.83293 31.7939 5.22604 31.3555 4.78772ZM21.679 7.11415L24.9494 10.3846L17.3633 17.9371L14.0928 14.6666L21.679 7.11415ZM14.2614 21.039L10.7886 21.2413L10.9909 17.7685L11.9686 16.7907L15.2391 20.0612L14.2614 21.039ZM27.0061 8.26051L23.7694 5.02374L25.5901 3.20305L28.8605 6.47354L27.0061 8.26051Z" fill="black"/>
</svg>
`;

export default class MyProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modalVisible: false,
    };
    this._onPressEdit = this._onPressEdit.bind(this);
    this._onPressChangePassword = this._onPressChangePassword.bind(this);
    this._onPressLogout = this._onPressLogout.bind(this);
    this._onPressBack = this._onPressBack.bind(this);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _onPressBack() {
    Actions.pop();
  }

  _onPressEdit() {
    Actions.push('editprofileScreen');
  }

  _onPressChangePassword() {
    Actions.push('changepasswordScreen');
  }

  _onPressLogout() {
    this.setModalVisible(true);
    //Actions.popTo('loginScreen');
  }

    render() {
      return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    
            }}>
                <View style={styles.viewModal}>
                    <View style={styles.viewModalDialog}>
                        <Text style={styles.textAreYouSure}>Are you sure you{"\n"}want to log out?</Text>

                        <TouchableOpacity style={styles.btnYes} activeOpacity={0.6}
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                                Actions.push('loginScreen');
                            }}>
                            <Text style={styles.textYesLogout}>Yes, log me out</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnNo} activeOpacity={0.6}
                            onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                            }}>
                            <Text style={styles.textYesLogout}>No, stay logged in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

          <Text style={styles.textTitle}>My Profile</Text>
          <TouchableOpacity
              style={styles.btnEdit}
              onPress={this._onPressEdit}
              activeOpacity={0.6}>
              
              <SvgFromXml width="100%" height="100%" xml={editprofilexml} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnBack} onPress={this._onPressBack}
              activeOpacity={0.6}>
              <SvgFromXml width="35" height="35" xml={backxml}></SvgFromXml>
              
            </TouchableOpacity>
            <Text style={styles.textNameTitle}>Name</Text>
            <Text style={styles.textName}>{global.username}</Text>
            <Text style={styles.textEmailTitle}>Email</Text>
            <Text style={styles.textEmail}>{global.email}</Text>
            <TouchableOpacity
                style={styles.btnChangePassword}
                onPress={this._onPressChangePassword}
                activeOpacity={0.6}>
            
                <Text style={styles.textChangePassword}>Change password</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btnLogout}
                onPress={this._onPressLogout}
                activeOpacity={0.6}>
            
                <Text style={styles.textChangePassword}>Log out</Text>
            </TouchableOpacity>
        </View>

      );
    }
  }
  
  const DEVICE_WIDTH = Dimensions.get('window').width;
  const DEVICE_HEIGHT = Dimensions.get('window').height;

  const styles = StyleSheet.create({
    
    container: {
      backgroundColor: 'white',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    viewModal: {
        backgroundColor: 'rgba(52, 52, 52, 0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    viewModalDialog: {
        backgroundColor: 'white',
        borderRadius: 8,
        position : 'absolute',
        width: '80%',
        height: '45%',
        left: '10%',
        top: '25%',
        alignItems: 'center',
        alignContent: 'center',
    },
    textAreYouSure: {
        color: 'black',
        fontSize: 26,
        fontWeight: '500',
        position: 'absolute',
        textAlign: 'center',
        fontWeight: 'bold',
        top: '20%',
    },
    textYesLogout: {
        color: 'black',
        fontSize: 22,
        fontWeight: '500',
        position: 'absolute',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    btnYes: {
        position: 'absolute',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'gold',
        borderRadius: 8,
        width: '80%',
        height: '12%',
        top: '50%'
    },
    btnNo: {
        position: 'absolute',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: 'gold',
        borderWidth: 3,
        borderRadius: 8,
        width: '80%',
        height: '12%',
        top: '70%'
    },
    textTitle: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 30,
      width: '60%',
      position: 'absolute',
      left: '20%',
      top: '9%',
    },
    btnEdit: {
      position: 'absolute',
      right: '9%',
      top: '9%',
      width: 35,
      height: 35,
    },
    btnBack: {
      position: 'absolute',
      width: 31,
      height: 35,
      left: '5%',
      top: '9%',
    },
    textNameTitle: {
      position: 'absolute',
      left: '10%',
      top: '21%',
      color: 'black',
      fontWeight: '500',
      fontSize: 24,
    },
    textName: {
        position: 'absolute',
        left: '10%',
        top: '26%',
        color: 'black',
        fontWeight: 'normal',
        fontSize: 22,
      },
    textEmailTitle: {
        position: 'absolute',
        left: '10%',
        top: '34%',
        fontWeight: '500',
        color: 'black',
        fontSize: 24,
    },
    textEmail: {
        position: 'absolute',
        left: '10%',
        top: '39%',
        color: 'black',
        fontWeight: 'normal',
        fontSize: 22,
    },
    
    btnChangePassword: {
        position: 'absolute',
        top: '51%',
        left: '10%',
    },
    textChangePassword: {
        fontSize: 24,
        textDecorationColor: 'gray',
        color: 'gray',
        fontWeight: '500',
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
    },
    btnLogout: {
        position : 'absolute',
        top: '58%',
        left: '10%',
    },
  });