import React, {Component} from 'react';
import {StyleSheet, View, Dimensions, Text, KeyboardAvoidingView,
    TouchableOpacity, TextInput, Button} from 'react-native';
import {Actions, ActionConst} from 'react-native-router-flux';
import {SvgFromXml} from 'react-native-svg';
var AlphabetListView = require('react-native-alphabetlistview').default;

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

class SectionHeader extends Component {
  render() {
    // inline styles used for brevity, use a stylesheet when possible
    var textStyle = {
      textAlign:'center',
      color:'#fff',
      fontWeight:'700',
      fontSize:16
    };

    var viewStyle = {
      backgroundColor: '#ccc'
    };
    return (
      <View style={viewStyle}>
        <Text style={textStyle}>{this.props.title}</Text>
      </View>
    );
  }
}

class SectionItem extends Component {
  render() {
    return (
      <Text style={{color:'#f00'}}>{this.props.title}</Text>
    );
  }
}

class Cell extends Component {
  render() {
    return (
      <View style={{height:30}}>
        <Text>{this.props.item}</Text>
      </View>
    );
  }
}

export default class SelectCarMakeScreen extends Component {
  constructor(props) {
    super(props);
    
    this._onPressEdit = this._onPressEdit.bind(this);
    this._onPressChangePassword = this._onPressChangePassword.bind(this);
    this._onPressLogout = this._onPressLogout.bind(this);
    this._onPressBack = this._onPressBack.bind(this);
  }

  state = {
    data: {
      A: ['some','entries','are here'],
      B: ['some','entries','are here'],
      C: ['some','entries','are here'],
      D: ['some','entries','are here'],
      E: ['some','entries','are here'],
      F: ['some','entries','are here'],
      G: ['some','entries','are here'],
      H: ['some','entries','are here'],
      I: ['some','entries','are here'],
      J: ['some','entries','are here'],
      K: ['some','entries','are here'],
      L: ['some','entries','are here'],
      M: ['some','entries','are here'],
      N: ['some','entries','are here'],
      O: ['some','entries','are here'],
      P: ['some','entries','are here'],
      Q: ['some','entries','are here'],
      R: ['some','entries','are here'],
      S: ['some','entries','are here'],
      T: ['some','entries','are here'],
      U: ['some','entries','are here'],
      V: ['some','entries','are here'],
      W: ['some','entries','are here'],
      X: ['some','entries','are here'],
      Y: ['some','entries','are here'],
      Z: ['some','entries','are here'],
    }
  };

  Cell = (props) => {
    return (
      <View style={{height:30}}>
        <Text>{props.item}</Text>
      </View>
    );
  }
  _onPressBack() {
    Actions.pop();
  }

  _onPressEdit() {

  }

  _onPressChangePassword() {

  }

  _onPressLogout() {
    
    Actions.popTo('loginScreen');
    
  }

    render() {
      console.log('data', this.state.data)
      return (
        <View style={styles.container}>
          {/* <AlphabetListView
            data={this.state.data}
            cell={Cell}
            cellHeight={100}
            sectionHeaderHeight={22.5}
          /> */}
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
      fontSize: DEVICE_WIDTH / 12,
      width: '60%',
      position: 'absolute',
      left: '20%',
      top: '6%',
    },
    btnEdit: {
      position: 'absolute',
      right: '5%',
      top: '6%',
      width: DEVICE_WIDTH / 10,
      height: DEVICE_WIDTH / 10,
    },
    btnBack: {
      position: 'absolute',
      width: '10%',
      height: DEVICE_WIDTH / 10,
      left: '5%',
      top: '6%',
    },
    textNameTitle: {
      position: 'absolute',
      left: '10%',
      top: '18%',
      color: 'black',
      fontSize: DEVICE_WIDTH / 15,
    },
    textName: {
        position: 'absolute',
        left: '10%',
        top: '23%',
        color: 'black',
        fontSize: DEVICE_WIDTH / 16,
      },
    textEmailTitle: {
        position: 'absolute',
        left: '10%',
        top: '31%',
        color: 'black',
        fontSize: DEVICE_WIDTH / 15,
    },
    textEmail: {
        position: 'absolute',
        left: '10%',
        top: '36%',
        color: 'black',
        fontSize: DEVICE_WIDTH / 16,
    },
    
    btnChangePassword: {
        position: 'absolute',
        top: '48%',
        left: '10%',
    },
    textChangePassword: {
        fontSize: DEVICE_WIDTH / 16,
        textDecorationColor: 'gray',
        color: 'gray',
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
    },
    btnLogout: {
        position : 'absolute',
        top: '55%',
        left: '10%',
    },
  });