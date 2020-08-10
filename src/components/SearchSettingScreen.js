import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, Text, KeyboardAvoidingView,
    TouchableOpacity, TextInput, Button, Modal, Slider} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import {SvgFromXml} from 'react-native-svg';
import Loader from './Loader'
import Spinner from 'react-native-loading-spinner-overlay';
import Toast, {DURATION} from 'react-native-easy-toast'
import axios from 'axios';
import async from 'async';

const backxml = `
<svg width="15" height="25" viewBox="0 0 15 25" fill="none">
<path d="M0 12.5142L12.9706 25L15 23.042L4.08824 12.5142L15 1.958L12.9706 0L0 12.4858V12.5142Z" fill="black"/>
</svg>
    `;


export default class SearchSettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        modalVisible: false,
        spinner: false,
        convertRate: 100,
    };
    this._onPressBack = this._onPressBack.bind(this);
    this._onPressSave = this._onPressSave.bind(this);
    this._onPressCancel = this._onPressCancel.bind(this);    
    this._onChangeValue = this._onChangeValue.bind(this);
    this._getRate = this._getRate.bind(this);
  }

  componentDidMount() {
    this._getRate()
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  _getRate() {

    this.setState({
      spinner: true,
    }, () => {
      async.parallel([
        (cb) => {
          axios.get(`${global.serverurl}/converter/get_rate`, {headers: {Authorization: global.token, email: global.email}})
          .then(response => {
            if (response.data.status === 'success'){
              cb(null, response.data.data)
            }
          })
          .catch(error => {
            cb(error)
          })
        }       
      ], (error, results) => {
        if (error){
          console.log(error)
          this.setState({
            spinner: false,
          });
          this.refs.toast.show(<Text style={styles.toast_error}>Server Error!</Text>, 1500);
        } else {
          this.setState({
            spinner: false,
            convertRate: results[0]
          });
        }
      })
    });    
  }

  _onPressBack() {
    Actions.pop();
  }

  _onChangeValue(value) {
    this.setState({convertRate: Math.trunc(value)});
  }

  _onPressSave() {
    this.setState({spinner: true});

    fetch(`${global.serverurl}/converter/set_rate`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          rate: this.state.convertRate,
          id: global.user_id,
          email: global.email,
          token: global.token
      }),
    }).then((response) => response.json())
    .then((responseJson) => {
      this.setState({spinner: false});
      if (responseJson.success == 0) {
          this.refs.toast.show(<Text style={styles.toast_error}>{responseJson.message}</Text>, 1500);
      } else {
          this.refs.toast.show(<Text style={styles.toast_success}>{'Successfully saved!'}</Text>, 1500);
      }      
    })
    .catch((error) => {
      this.setState({spinner: false});
      this.refs.toast.show(<Text style={styles.toast_error}>Server Error!</Text>, 1500);
     });
  }

  _onPressCancel() {
    Actions.pop();
  }

    render() {
      return (
        <View style={styles.container}>
          {this.state.spinner ?
            <Loader /> :
            <>
              <Text style={styles.textTitle}>Converter Pricing Adjustment</Text>

              <TouchableOpacity style={styles.btnBack} onPress={this._onPressBack}
                activeOpacity={0.6}>
                <SvgFromXml width="35" height="35" xml={backxml}></SvgFromXml>              
              </TouchableOpacity>
              
              <Slider
                onValueChange={value => this._onChangeValue(value)}
                style={styles.sliderBack}               
                minimumValue={0}
                maximumValue={150}
                value={this.state.convertRate}
                minimumTrackTintColor="#000000"
                maximumTrackTintColor="#0000FF">
              </Slider>
                  
              <Text style={styles.textValue}>Currrent Value : {this.state.convertRate}% </Text>

              <TouchableOpacity
                  style={styles.btnYes}
                  onPress={this._onPressSave}
                  activeOpacity={0.6}>            
                  <Text style={styles.textChangePassword}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  style={styles.btnNo}
                  onPress={this._onPressCancel}
                  activeOpacity={0.6}>            
                  <Text style={styles.textChangePassword}>Cancel</Text>
              </TouchableOpacity>
            </>
          }

          <Toast ref="toast" position="bottom" style={ {padding: 0,borderRadius: 10} }/>

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
    textTitle: {
      color: 'black',
      fontWeight: 'bold',
      fontSize: 30,
      width: '60%',
      position: 'absolute',
      left: '20%',
      top: '10%',
    },
    btnBack: {
      position: 'absolute',
      width: 31,
      height: 35,
      left: '5%',
      top: '9%',
    },
    sliderBack: {
        position: 'absolute',
        left: '10%',
        top: '35%',
        width: '80%', 
        height: 40
    },    
    textValue: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        width: '50%',
        position: 'absolute',
        left: '25%',
        top: '50%',
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
        height: '8%',
        top: '60%'
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
        height: '8%',
        top: '70%'
    },
    textChangePassword: {
        fontSize: 24,
        textDecorationColor: 'gray',
        color: 'gray',
        fontWeight: '500',
        textDecorationStyle: 'solid',
    },
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
  });