import React, { Component } from 'react';
import { Router, Scene, Actions, ActionConst, Stack } from 'react-native-router-flux';

import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import LookUpScreen from './LookUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import ForgotPasswordEmailSentScreen from './ForgotPasswordEmailSentScreen';
import MyProfileScreen from './MyProfileScreen';
import SelectCarMakeScreen from './SelectCarMakeScreen';
import EditProfileScreen from './EditProfileScreen';
import ChangePasswordScreen from './ChangePasswordScreen';
import SearchResultsScreen from './SearchResultsScreen';
import ConverterDetails from './ConverterDetails';
import SearchSettingScreen from './SearchSettingScreen';

export default class Main extends Component {
	constructor(props) {
		super(props);
		//global.serverurl = 'https://pro-cores-api.herokuapp.com'//'http://3.93.238.220:5000';
		global.serverurl = 'http://ec2-54-84-155-142.compute-1.amazonaws.com:5000';
	}

  render() {
	  return (
		    <Router>
		      <Stack key="root">
		        <Scene key="loginScreen"
		          component={LoginScreen}
		        	animation='fade'
		          hideNavBar={true}
				  initial={true}
				  drawerLockMode='locked-closed' gesturesEnabled={false}
		        />
		        <Scene key="registerScreen"
		          component={RegisterScreen}
		          animation='fade'
				  hideNavBar={true}
				  drawerLockMode='locked-closed' gesturesEnabled={false}
		        />
				<Scene key="lookupScreen"
		          component={LookUpScreen}
		          animation='fade'
				  hideNavBar={true}
				  drawerLockMode='locked-closed' gesturesEnabled={false}
		        />
				<Scene key="searchResults"
		          component={SearchResultsScreen}
		          animation='fade'
				  hideNavBar={true}
				  drawerLockMode='locked-closed' gesturesEnabled={false}
		        />
				<Scene key="converterPage"
		          component={ConverterDetails}
		          animation='fade'
				  hideNavBar={true}
				  drawerLockMode='locked-closed' gesturesEnabled={false}
		        />
				<Scene key="forgotpasswordScreen"
		          component={ForgotPasswordScreen}
		          animation='fade'
				  hideNavBar={true}
				  drawerLockMode='locked-closed' gesturesEnabled={false}
		        />
				<Scene key="forgotpasswordemailsentScreen"
		          component={ForgotPasswordEmailSentScreen}
		          animation='fade'
				  hideNavBar={true}
				  drawerLockMode='locked-closed' gesturesEnabled={false}
		        />
				<Scene key="myprofileScreen"
		          component={MyProfileScreen}
		          animation='fade'
				  hideNavBar={true}
				  drawerLockMode='locked-closed' gesturesEnabled={false}
				  onEnter={()=>{Actions.refresh();}}
		        />
				<Scene key="selectcarmakeScreen"
		          component={SelectCarMakeScreen}
		          animation='fade'
				  hideNavBar={true}
				  drawerLockMode='locked-closed' gesturesEnabled={false}
		        />
				<Scene key="editprofileScreen"
		          component={EditProfileScreen}
		          animation='fade'
				  hideNavBar={true}
				  drawerLockMode='locked-closed' gesturesEnabled={false}
		        />
				<Scene key="changepasswordScreen"
		          component={ChangePasswordScreen}
		          animation='fade'
				  hideNavBar={true}
				  drawerLockMode='locked-closed' gesturesEnabled={false}
		        />
				<Scene key="searchsettingScreen"
		          component={SearchSettingScreen}
		          animation='fade'
				  hideNavBar={true}
				  drawerLockMode='locked-closed' gesturesEnabled={false}
		        />
		      </Stack>
		    </Router>
	  );
	}
}
