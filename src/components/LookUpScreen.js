import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, Text, KeyboardAvoidingView,
  TouchableOpacity, TextInput, Button, Image} from 'react-native';
import Loader from './Loader'
import {Actions, ActionConst} from 'react-native-router-flux';
import {SvgFromXml} from 'react-native-svg';
import axios from 'axios';
import async from 'async';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const profilexml = `
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
  <path d="M21.8947 11.7895C21.8947 15.0737 19.2842 17.6842 16 17.6842C12.7158 17.6842 10.1053 15.0737 10.1053 11.7895C10.1053 8.50526 12.7158 5.89474 16 5.89474C19.2842 5.89474 21.8947 8.50526 21.8947 11.7895ZM9.17895 32H22.8211C25.1789 32 27.2842 30.9895 28.7158 29.3895C26.7789 24.2526 21.8105 20.6316 16 20.6316C10.1895 20.6316 5.22105 24.2526 3.28421 29.3895C4.71579 30.9895 6.82105 32 9.17895 32ZM2.94737 25.0105C2.69474 24.2526 2.52632 23.4947 2.52632 22.7368V9.26316C2.52632 5.55789 5.55789 2.52632 9.26316 2.52632H22.7368C26.4421 2.52632 29.4737 5.55789 29.4737 9.26316V22.7368C29.4737 23.4947 29.3053 24.2526 29.0526 25.0105C29.6421 25.7684 30.2316 26.5263 30.7368 27.2842C31.5789 25.9368 32 24.4211 32 22.7368V9.26316C32 4.21053 27.7895 0 22.7368 0H9.26316C4.21053 0 0 4.21053 0 9.26316V22.7368C0 24.4211 0.421053 25.9368 1.26316 27.2842C1.76842 26.5263 2.27368 25.6842 2.94737 25.0105Z" fill="black"/>
    </svg>
    `;
const searchxml = `
<svg width="17" height="17" viewBox="0 0 17 17" fill="none">
<path d="M16.7175 15.3909L12.5483 11.2167C14.6446 8.48834 14.4349 4.54733 11.9195 2.05213C10.5453 0.676269 8.7751 0 6.98165 0C5.1882 0 3.41804 0.676269 2.04383 2.05213C-0.681278 4.78052 -0.681278 9.21125 2.04383 11.9396C3.41804 13.3155 5.1882 13.9918 6.98165 13.9918C8.47231 13.9918 9.96297 13.5254 11.1974 12.5693L15.3899 16.7202C15.5762 16.9067 15.8091 17 16.0654 17C16.2983 17 16.5545 16.9067 16.7408 16.7202C17.0902 16.3704 17.0902 15.7641 16.7175 15.3909ZM7.00494 12.1029C5.63074 12.1029 4.37299 11.5665 3.39475 10.6104C1.41496 8.62826 1.41496 5.38683 3.39475 3.38134C4.3497 2.42524 5.63074 1.88889 7.00494 1.88889C8.37914 1.88889 9.63688 2.42524 10.6151 3.38134C11.5934 4.33745 12.1058 5.62003 12.1058 6.99589C12.1058 8.37174 11.5701 9.631 10.6151 10.6104C9.66018 11.5899 8.35585 12.1029 7.00494 12.1029Z" fill="#727272"/>
</svg>
`;

export default class LookUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchId: '',
      validSearch: false,
      searchResults: [],
      pricing: [],
      pricing_est: [],
      spinner: false,
      disabled: false,
      convertRate: 100,
    };
    this._onPressProfile = this._onPressProfile.bind(this);
    this._onPressCarMake = this._onPressCarMake.bind(this);
    this._onPressSearch = this._onPressSearch.bind(this);
    this._onPressCarModel = this._onPressCarModel.bind(this);
    global.carmake = 'Make';
    global.carmodel = 'Model';
  }

  _onPressSearch() {

    this.setState({
      spinner: true,
      validSearch: false
    }, () => {
      async.parallel([
        (cb) => {
          axios.get(`${global.serverurl}/converter/get_rate`, {headers: {Authorization: global.token, email: global.email}})
          .then(response => {
            if (response.data.status === 'success'){
              cb(null, response.data.data)
            } else {
              cb(response.data.status, response.data.data)
            }
          })
          .catch(error => {
            cb(error)
          })
        }       
      ], (error, results) => {
        if (error){
          console.log(error)         
        } else {
          if (results[0] > -1) {
            this.setState({            
              convertRate: results[0]
            });
          }          
        }        
        
        this.setState({
          spinner: true,
          validSearch: false
        }, () => {
          async.parallel([
            (cb) => {
              axios.get(`${global.serverurl}/api/converters?search=${this.state.searchId}`, {headers: {Authorization: global.token, email: this.state.email}})
              .then(response => {
                if (response.data.status === 'success'){
                  cb(null, response.data.data)
                }
              })
              .catch(error => {
                cb(error)
              })
            },
            (cb) => {
              axios.get(`${global.serverurl}/converter/get_prices`, {headers: {Authorization: global.token, email: global.email}})
              .then(response => {
                if (response.data.success === 1){
                  cb(null, response.data.data)
                }
              })
              .catch(error => {
                cb(error)
              })
            },        
          ], (error, results) => {
            if (error){
              console.log(error)
              this.setState({
                spinner: false,
                validSearch: true
                //disabled: false
              })
            } else {
              this.setState({
                searchResults: results[0],
                pricing: results[1].pricings,
                pricing_est: results[1].pricings_est
              }, () => {
                setTimeout(() => {
    
                  Actions.searchResults({
                    searchResults: this.state.searchResults,
                    pricing: this.state.pricing,
                    pricing_est: this.state.pricing_est,
                    convertRate: this.state.convertRate
                  })
                  this.setState({
                    spinner: false,
                    validSearch: true
                  })
                }, 1500)
              })
            }
          })
        });        
      })
    });   

    // Query Database
    // Store results in State
    // Push "Results" screen and pass data OR "no results" text
    // Actions.searchResults(searchResults)
  }

  _onPressCarModel() {
    Actions.push('selectcarmakeScreen');
  }

  _onPressCarMake() {
    Actions.push('selectcarmakeScreen');
  }

  _onPressProfile() {
    Actions.push('myprofileScreen');
  }

  _onPressMenu(value) {
    if (value == 0) {
      Actions.push('myprofileScreen');
    } else if (value == 1) {
      var type = global.user_type;
      if (type === 'admin'){
        Actions.push('searchsettingScreen');
      } else {
        //"Debug Mode"
        alert(`User should be admin.`)
        // Actions.push('searchsettingScreen');        
      }      
    }
  }

  validateSearch = (text) => {

    if (!text) {
        this.setState({searchId:'', validSearch:false});
    }
    else if (text.length > 0) {
        this.setState({searchId:text, validSearch:true});
    }
    else {
      this.setState({searchId:text, validSearch:false});
    }
  }
    render() {
      return (
        <View style={styles.container}>
          {this.state.spinner ?
            <Loader /> :
            <>
              <Text style={styles.textTitle}>Converter{"\n"}Look-Up</Text>

              {/* <TouchableOpacity
                  style={styles.btnProfile}
                  onPress={this._onPressProfile}
                  activeOpacity={0.6}>

                  <SvgFromXml width="34" height="34" xml={profilexml} />
              </TouchableOpacity> */}

              <Menu style={styles.menuWrapper} onSelect={value => this._onPressMenu(value)}>
                <MenuTrigger style={styles.rightMenu}>
                  <Image style={{width: 34, height: 34}} source={require('../images/icon_gear_setting.png')} />
                </MenuTrigger>
                <MenuOptions style={styles.menuOptionsWrapper}>
                  <MenuOption style={{height: 30, marginTop: 10}} text='Profile Settings' value={0} />
                  <MenuOption style={{height: 30, marginTop: 10}} text='Search Settings' value={1} />
                </MenuOptions>   
              </Menu>

              <View style={styles.containerSearch}>
                  <SvgFromXml style={styles.searchImage} width="19" height="19" xml={searchxml}></SvgFromXml>
                  <TextInput
                    placeholder="Search by identifier"
                    placeholderTextColor="#c4c4c4"
                    keyboardType="default"
                    style={styles.inputSearch}
                    returnKeyType={'done'}
                    onChangeText={(text) => this.validateSearch(text)}
                    value={this.state.searchId}
                    />
              </View>{/*
                <Text style={styles.textCarMakeTitle}>Select a car make</Text>
                <TouchableOpacity
                  style={styles.btnCarMake}
                  onPress={this._onPressCarMake}
                  activeOpacity={0.6}>

                  <Text style={styles.textCarMake}>{global.carmake}</Text>
                </TouchableOpacity>
                <Text style={styles.textCarModelTitle}>Select a car model</Text>
                <TouchableOpacity
                  style={styles.btnCarModel}
                  onPress={this._onPressCarModel}
                  activeOpacity={0.6}>
                  <Text style={styles.textCarModel}>{global.carmodel}</Text>
                </TouchableOpacity>*/}
                <TouchableOpacity style={styles.btnSearch}
                  onPress={this._onPressSearch}
                  activeOpacity={0.6}
                  disabled={!this.state.validSearch}>
                    <View style={{position: 'absolute',top: 0,bottom: 0,left: 0,right: 0,
                                  borderRadius: 8,}}
                          backgroundColor={this.state.validSearch ? 'gold':'#e9e9e9'}></View>
                    <Text style={styles.textSearch}>Search</Text>
                </TouchableOpacity>
            </>
          }
        </View>
      );
    }
  }

  const DEVICE_WIDTH = Dimensions.get('window').width;
  const DEVICE_HEIGHT = Dimensions.get('window').height;

  const styles = StyleSheet.create({
    searchImage: {
      marginTop: 10,
      marginLeft: 9,
      color: '#000000'
    },
    seachImageCon: {
      display: 'flex',
      alignItems: 'center'
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
      fontSize: DEVICE_WIDTH / 10,
      width: '80%',
      position: 'absolute',
      left: '10%',
      top: '10%',
    },
    btnProfile: {
      position: 'absolute',
      right: '7%',
      top: '9%',
      width: DEVICE_WIDTH / 10,
      height: DEVICE_WIDTH / 10,
    },
    containerSearch: {
      position: 'absolute',
      width: '80%',
      height: DEVICE_WIDTH / 10,
      borderBottomWidth: 2,
      borderBottomColor: '#c4c4c4',
      left: '10%',
      top: '45%',
    },
    inputSearch: {
      position: 'absolute',
      width: DEVICE_WIDTH * 7 / 10 - 4,
      height: DEVICE_WIDTH / 10 - 4,
      left: DEVICE_WIDTH / 10,
      paddingHorizontal: 2,
      backgroundColor: 'white',
      color: 'black',
      fontSize: 26,
      fontWeight: 'bold',
    },
    textCarMakeTitle: {
      color: '#727272',
      fontSize: 20,
      fontWeight: '500',
      width: '80%',
      position: 'absolute',
      left: '10%',
      top: '40%',
    },
    btnCarMake: {
      position: 'absolute',
      left: '10%',
      top: '44%',
    },
    textCarMake: {
      fontWeight: 'bold',
      textDecorationStyle: 'solid',
      textDecorationColor: 'black',
      textDecorationLine: 'underline',
      fontSize: 30,
    },
    textCarModelTitle: {
      color: '#727272',
      fontSize: 20,
      fontWeight: '500',
      width: '80%',
      position: 'absolute',
      left: '10%',
      top: '52%',
    },
    btnCarModel: {
      position: 'absolute',
      left: '10%',
      top: '56%',
    },
    textCarModel: {
      fontWeight: 'bold',
      textDecorationStyle: 'solid',
      textDecorationColor: 'black',
      textDecorationLine: 'underline',
      fontSize: 30,
    },
    btnSearch: {
      position: 'absolute',
      top: '70%',
      left: DEVICE_WIDTH / 2 - 70,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: 'center',
    },
    textSearch: {
      fontSize: 22,
      fontWeight: '500',
      paddingLeft: 36,
      paddingRight: 36,
      paddingTop: 12,
      paddingBottom: 12,
      textAlign: 'center'
    },
    menuWrapper: {
      alignSelf: 'flex-end',  
      marginTop: 110,
    },
    rightMenu: {
      alignSelf: 'flex-end',
      marginRight: 30,
      marginTop: -40,
    },
    menuOptionsWrapper: {
      alignSelf: 'flex-end', 
      marginRight: 60,  
    },
    btnProfile: {
      position: 'absolute',
      right: '7%',
      top: '9%',
      width: DEVICE_WIDTH / 10,
      height: DEVICE_WIDTH / 10,
    },
  });
