import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TestComponent } from './client/components/AppComponents';
import ApiKeys from './constants/ApiKeys';
import * as  firebase from 'firebase';
require('firebase/firestore');
import { Provider } from 'react-redux';
import store from './client/store';
import HomeScreen from './client/components/AppComponents/HomeScreen';
import LoginScreen from './client/components/AppComponents/Login/LoginScreen';
import { StackNavigator } from 'react-navigation';
//Firebase middleware
// const admin = require('firebase-admin');
// const functions = require('firebase-functions');

// admin.initializeApp(functions.config(ApiKeys.FirebaseConfig).firebase);

// var db = admin.firestore();

export default class App extends React.Component {
  static navigationOptions = {
    title: 'HIITme'
};
  render() {
    return (
      <Provider store={store}>
          <AppNavigator />
      </Provider>
    );
  }
}

const AppNavigator = StackNavigator(
  {
      Home: {
          screen: HomeScreen
      },
      Login: {
          screen: LoginScreen
      },
  },
  {
      initialRouteName: 'Home'
  }
);
